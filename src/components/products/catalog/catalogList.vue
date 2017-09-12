<template>
  <div class="catalogForm">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="addCatalog()" v-if="btnTag == 'add'">添加类目</el-button>
        <el-button type="primary" @click="addCatalog()" v-else>添加类目</el-button>
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

    <el-dialog :visible.sync="catalogDialogVisible" class="addDialog" v-bind:title="titleTag">
      <el-form :model="catalogForm" :rules="rules" ref="catalogForm">
        <el-form-item label="分类名称:" :label-width="formLabelWidth" prop="catalogName">
          <el-input v-model="catalogForm.catalogName" auto-complete="off" class="input193"></el-input>
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
export default {
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
      formLabelWidth: '120px'
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

    addCatalogPost() {
      //添加的时候需要 商铺id 和 属性名称
      // 商铺id 需要获取列表的时候 就要保存起来
      let params = {
        isDelete: false,
        type: 2,
        isVisible: true,
        position: 1,
        busiType: 1,
        nameObject: { zh: this.catalogForm.catalogName, jp: '', en: '' },
      };

      if (this.catalogForm.catalogName == '') {

        this.$message({
          type: 'info',
          message: '要添加的类目名不能为空！'
        });

      } else {

        $http.post("/coron-web/catalog/add", params).then(response => {

          this.cancelDialog();
          this.$message({
            type: 'success',
            message: '类目添加成功！'
          });
          this.getCatalogList();

        }).catch(error => {

          console.log(error);

        })
      }

    },

    updateCatalog(item) {

      this.btnTag = 'update';
      this.titleTag = '修改类目';
      this.catalogDialogVisible = true;
      this.middleObj = item;
      this.catalogForm.catalogName = item.nameObject.zh;

    },

    updateCatalogPost() {
      //更新列表请求
      let updateParams = {
        catalogId: this.middleObj.catalogId,
        nameObject: { zh: this.catalogForm.catalogName, jp: '', en: '' },
        isVisible: this.middleObj.isVisible,
        seq: this.middleObj.seq
      };

      if (this.catalogForm.catalogName == '') {
        this.$message({
          type: 'info',
          message: '类目名不能为空！'
        });
      } else {
        $http.post("/coron-web/catalog/update", updateParams).then(response => {
          

          if (response.status) {
            this.$message({
              type: 'info',
              message: '更新成功'
            });
          }
          this.cancelDialog();
          this.getCatalogList();

        }).catch(error => {
          console.log(error);
          this.$message({
            type: 'info',
            message: error
          });
        })
      }
    },

    delCatalog: function(item) {
      $http.post('/coron-web/catalog/del', { catalogId: item.catalogId }).then(response => {

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
      this.$confirm('当前分类不为空的时候不允许删除,请先删除分类下的商品,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {

        this.delCatalog(item);

      }).catch(() => {

        this.$message({
          type: 'info',
          message: '已取消删除'
        });

      });
    },


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
