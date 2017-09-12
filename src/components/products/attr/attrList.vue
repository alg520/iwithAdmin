<template>
  <div class="attrForm">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addAttr()">添加属性</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="itemAttrDatas" style="width: 100%">
      <el-table-column type="index" width="80px">
      </el-table-column>
      <el-table-column prop="attrNameObject.zh" label="名称"></el-table-column>
      <el-table-column label="操作" width="240">
        <template scope="scope" width="240">
          <el-button size="mini" @click="editAttr(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="confirmDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <el-dialog :visible.sync="attrDialogVisible" class="addDialog tasteDialog" v-bind:title="titleTag">
      <el-form :model="attrForm" :rules="rules" ref="attrForm">
        <el-form-item label="属性名称：" :label-width="formLabelWidth" prop="attrName">
          <el-input v-model="attrForm.attrName" auto-complete="off" class="input193"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="attrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAttrPost('attrForm')" v-if="titleTag == '添加属性'">立即添加</el-button>
        <el-button type="primary" @click="editAttrPost('attrForm')" v-else>立即修改</el-button>
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
      titleTag:'',
      itemAttrDatas: [],
      attrDialogVisible: false,
      shopId: '',
      itemAttrId:'',
      attrForm: {
        attrName: '',
      },
      rules: {
        attrName: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    //默认获取属性列表
    this.getItemAttrList();
  },
  computed: {

  },
  mounted: function () {

  },
  methods: {
    getItemAttrList() {
      $http.get('/coron-web/itemAttr/list')
        .then(response => {
          
          !!response.rows && (this.itemAttrDatas = response.rows) && (this.shopId = response.rows[0].shopId);

        })
        .catch(error => {

          console.log(error);
          alert('网络错误，不能访问');

        })
    },

    addAttr(){
      this.attrDialogVisible = true;
      this.attrForm.attrName = '';
      this.titleTag = '添加属性';
    },

    addAttrPost(formName) {

      let addParams = {
        shopId: this.shopId,
        isDelete: false,
        attrNameObject: { "zh": this.attrForm.attrName }
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {

          $http.post("/coron-web/itemAttr/add", addParams).then(response => {

            if(response.status){
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
              this.getItemAttrList();
              this.attrForm.attrName = '';
            }
            this.attrDialogVisible = false;

          }).catch(error => {
            console.log(error);
          })

        } else {
          this.$message({
            type: 'info',
            message: '要添加的属性名不能为空！'
          });
          return false;
        }
      });
    },

    editAttr(item){
      this.attrDialogVisible = true;
      this.attrForm.attrName = item.attrNameObject.zh;
      this.itemAttrId = item.itemAttrId;
      this.titleTag = '修改属性';
    },

    editAttrPost(formName){      
      
      let updateParams = {        
        itemAttrId:this.itemAttrId,
        attrNameObject: { zh: this.attrForm.attrName,jp:'',en:'' }
      };

      
      this.$refs[formName].validate((valid) => {

        if (valid) {

          $http.post("/coron-web/itemAttr/update", updateParams).then(response => {

            if(response.status){
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.getItemAttrList();
              this.attrForm.attrName = '';
            }
            this.attrDialogVisible = false;

          }).catch(error => {
            console.log(error);
          })

        } else {
          this.$message({
            type: 'info',
            message: '要修改的属性名不能为空！'
          });
          return false;
        }
      });

    },

    delAttr(item) {
      $http.post('/coron-web/itemAttr/del',{itemAttrId:item.itemAttrId}).then(response => {                
          this.$message({
              type: 'success',
              message: '删除成功!'
          });
          this.getItemAttrList();
          console.log("删除成功",response);

      }).catch(error => {
          console.log(error);
      })
    },

    confirmDel(item) {
        this.$confirm('确定要删除该属性吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.delAttr(item);
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    }

  }

}
</script>
<style scoped>
.attrForm {
  width: 98%;
  text-align: center;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
