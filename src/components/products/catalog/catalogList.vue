<template>
  <div class="catalogForm">
    <div v-if="!sortTag">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addCatalog()">添加类目</el-button>
          <el-button type="primary" @click="catalogSort()">类目排序</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="catalogDatas" style="width: 100%">
        <el-table-column type="index" width="80px">
        </el-table-column>
        <el-table-column prop="nameObject.zh" label="类目名称"></el-table-column>
        <el-table-column label="操作" width="240">
          <template scope="scope" width="240">
            <el-button size="mini" @click="updateCatalog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="confirmDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="catalogSort" v-else>
      <div>
        <el-button @click="cancelSort()">返回</el-button>
      </div>
      <div class="drapSortList">
        <div class="drapSortList-list">
          <draggable :list="catalogDatas" class="dragArea" @change="moved" :options="{group:'introGroup'}">
            <div class="list-complete-item" v-for="element in catalogDatas" :key='element'>
              <div class="list-complete-item-handle">{{element.nameObject.zh}}
                <span class="pull-right">
                  <i class="el-icon-d-caret"></i>
                </span>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="catalogDialogVisible" class="addDialog" v-bind:title="titleTag" size="tiny">
      <el-form :model="catalogForm" :rules="rules" ref="catalogForm">
        <el-form-item label="分类名称:" :label-width="formLabelWidth" prop="catalogName">
          <el-input v-model="catalogForm.catalogName" auto-complete="off" @blur="translateContent(catalogForm.catalogName,'name')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="catalogDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCatalogPost()" v-if="btnTag == 'add'">确定添加</el-button>
        <el-button type="primary" @click="updateCatalogPost()" v-else>确定修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios';
import $http from '../../../utils/http';
import draggable from 'vuedraggable';
import getLanguage from '../../../utils/sysLanguage.js';
import {getTranslateResult,returnTransArray} from '../../../utils/translate.js';
export default {
  components: {
    draggable
  },
  data() {
    return {
      catalogDatas: [],
      catalogDialogVisible: false,
      catalogDel: false,
      btnTag: 'add',
      titleTag: '',
      middleObj: {},
      catalogForm: {
        catalogName: ''
      },
      rules: {
        catalogName: [
          { required: true, message: '请输入类目名称', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      sortTag: false,
      catalogNameTransArray:[]
    }
  },
  created() {
    //默认获取属性列表
    this.getCatalogList();
  },
  methods: {
    getCatalogList() {
      $http.get('/coron-web/catalog/getCatalogs')
        .then(response => {

          console.log(response);

          !!response.entry && (this.catalogDatas = response.entry);

        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不能访问');
        })
    },

    addCatalog() {
      this.titleTag = '添加类目';
      this.btnTag = 'add';
      this.catalogDialogVisible = true;
    },

    cancelDialog() {

      this.catalogDialogVisible = false;
      this.catalogForm.catalogName = '';

    },

    translateContent(itemName,type){
        var self = this;
        itemName !== ''
        &&
        getTranslateResult('zh',itemName).then(res => {

            if(type == 'name'){
                self.catalogNameTransArray = returnTransArray(res);
                console.log(" 添加分类 ",self.catalogNameTransArray);
            }
            
        })

    },

    addCatalogPost() {
      var self = this;

      let catalogObj = { zh: self.catalogForm.catalogName, jp: self.catalogForm.catalogName, en: self.catalogForm.catalogName };
      if(this.shopLanguage == 0){
          catalogObj.zh = this.catalogForm.catalogName;
      } else if (this.shopLanguage == 1){
          catalogObj.en = this.catalogForm.catalogName; 
      } else if(this.shopLanguage == 2) {
          catalogObj.jp = this.catalogForm.catalogName;
      }
      if(self.catalogNameTransArray.length > 0){
        catalogObj = Object.assign(catalogObj,this.catalogNameTransArray[0]);
        console.log("合并后的分类对象",catalogObj);
      }
      
      //添加的时候需要 商铺id 和 属性名称
      // 商铺id 需要获取列表的时候 就要保存起来
      let params = {
        isDelete: false,
        type: 2,
        isVisible: true,
        position: 1,
        busiType: 1,
        nameObject: catalogObj,
      };

      self.$refs['catalogForm'].validate((valid) => {
        if (valid) {

          $http.post("/coron-web/catalog/add", params).then(response => {

            if (response.status) {
              self.$message({
                type: 'success',
                message: '类目添加成功！'
              });
              self.getCatalogList();
              self.cancelDialog();
            } else {
              self.$message({
                type: 'error',
                message: '类目添加失败:' + response.responseCode
              });
            }


          }).catch(error => {
            console.log(error);
            self.$message.error('请求错误！');
          })

        } else {
          self.$message({
            type: 'warning',
            message: '请填写必填字段'
          });
        }

      })

    },

    updateCatalog(item) {

      this.btnTag = 'update';
      this.titleTag = '修改类目';
      this.catalogDialogVisible = true;
      this.middleObj = item;
      this.catalogForm.catalogName = item.nameObject.zh;

    },

    updateCatalogPost() {
      var self = this;
      //更新列表请求
      let updateParams = {
        catalogId: self.middleObj.catalogId,
        nameObject: { zh: self.catalogForm.catalogName, jp: '', en: '' },
        isVisible: self.middleObj.isVisible,
        seq: self.middleObj.seq
      };

      self.$refs['catalogForm'].validate((valid) => {
        if (valid) {

          $http.post("/coron-web/catalog/update", updateParams).then(response => {
            if (response.status) {
              self.$message({
                type: 'success',
                message: '更新成功'
              });
            }
            self.cancelDialog();
            self.getCatalogList();

          }).catch(error => {
            console.log(error);
            self.$message({
              type: 'error',
              message: '更新失败'
            });
          })

        } else {
          self.$message({
            type: 'warning',
            message: '请填写必填字段'
          });
        }
      })
    },

    checkChildren(item) {
      return axios.post('/coron-web/item/list', {
        catalogId: item.catalogId
      })
    },

    delCatalog: function(item) {

      $http.post('/coron-web/catalog/del', {
        catalogId: item.catalogId
      }).then(response => {

        if (response.status) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getCatalogList();
        } else {

          this.$message({
            type: 'error',
            message: response.message
          })
        }

      }).catch(error => {
        console.log(error);
      })
    },

    confirmDel(item) {
      let self = this;
      self.checkChildren(item).then(res => {

        if (res.data.rows && res.data.rows.length > 0) {
          self.$alert('该分类下有提案时，不可直接删除分类', '提示', {
            confirmButtonText: '我知道了',
            type: 'warning'
          })
        } else {

          this.$confirm('确认删除该分类吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            type: 'warning'
          }).then(() => {

            self.delCatalog(item);

          }).catch(() => {

            self.$message({
              type: 'info',
              message: '已取消删除'
            });

          });

        }

      })
    },

    catalogSort(){
      this.sortTag = true;
    },

    cancelSort(){
      this.sortTag = false;
    },

    sortCatalog(itemParams) {

            $http.post('/coron-web/catalog/sort', itemParams).then(response => {

                if(response.status){
                  this.$message({
                      type: 'success',
                      message: '更新成功'
                  });
                } else {
                  this.$message({
                      type: 'error',
                      message: `更新失败：${response.message}`
                  });
                }
                
                this.getCatalogList();

            }).catch(error => {
                
                this.$message({
                    type: 'error',
                    message: '更新失败'
                });
                this.getCatalogList();
                
            })
        },

    moved(evt) {

      let newIndex = evt.moved.newIndex;
      let oldIndex = evt.moved.oldIndex;

      console.log(evt);
      console.log(this.catalogDatas[evt.moved.newIndex + 1]);
      console.log(this.catalogDatas[evt.moved.newIndex]);

      if (newIndex > oldIndex) {
        let oldItem = this.catalogDatas[evt.moved.newIndex],
          newItem = this.catalogDatas[evt.moved.newIndex - 1];

        const item = {
          shopId: oldItem.shopId,
          catalogId: newItem.catalogId,
          oldIndex: oldItem.seq,
          newIndex: newItem.seq
        };

        this.sortCatalog(item);

      } else {

        let oldItem = this.catalogDatas[evt.moved.newIndex],
          newItem = this.catalogDatas[evt.moved.newIndex + 1];

        const item = {
          shopId: oldItem.shopId,
          catalogId: newItem.catalogId,
          oldIndex: oldItem.seq,
          newIndex: newItem.seq
        };

        this.sortCatalog(item);
      }

    }


  }
}
</script>
<style scoped>
.catalogForm {
  width: 98%;
  text-align: center;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
