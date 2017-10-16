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
      <el-table-column label="名称">
        <template scope="scope">
          <span v-if="_SHOPLANGUAGE == 0">{{scope.row.attrNameObject.zh}}</span>
          <span v-if="_SHOPLANGUAGE == 1">{{scope.row.attrNameObject.en}}</span>
          <span v-if="_SHOPLANGUAGE == 2">{{scope.row.attrNameObject.jp}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template scope="scope" width="240">
          <el-button size="mini" @click="editAttr(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="confirmDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="attrDialogVisible" class="addDialog tasteDialog" v-bind:title="titleTag" size="tiny">
      <el-form :model="attrForm" :rules="rules" ref="attrForm">
        <el-form-item label="属性名称：" :label-width="formLabelWidth" prop="attrName">
          <el-input v-model="attrForm.attrName" placeholder="请输入属性名称" @blur="translateContent(attrForm.attrName,'attr')"></el-input>
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
import Cookies from 'js-cookie';
import getLanguage from '../../../utils/sysLanguage.js';
import { getTranslateResult, baiduTranslate, returnTransArray } from '../../../utils/translate.js';
export default {
  data() {
    return {
      titleTag: '',
      itemAttrDatas: [],
      attrDialogVisible: false,
      shopId: '',
      itemAttrId: '',
      attrForm: {
        attrName: '',
      },
      rules: {
        attrName: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      attrTransArray: []
    }
  },
  created() {
    //默认获取属性列表
    this.getItemAttrList();
  },
  computed: {
    _SHOPLANGUAGE() {
      return Cookies.get('SHOPLANGUAGE');
    }
  },
  mounted: function() {

  },
  methods: {
    getItemAttrList() {
      $http.get('/coron-web/itemAttr/list')
        .then(response => {

          !!response.rows && (this.itemAttrDatas = response.rows) && response.rows.length > 0 && (this.shopId = response.rows[0].shopId);

        })
        .catch(error => {

          console.log(error);
          alert('网络错误，不能访问');

        })
    },

    addAttr() {
      this.attrDialogVisible = true;
      this.attrForm.attrName = '';
      this.titleTag = '添加属性';
    },

    translateContent(itemName, type) {
      var self = this;
      let _language = self._SHOPLANGUAGE;
      itemName !== ''
        &&
        baiduTranslate(itemName, _language).then(res => {
          if (type == 'attr') {
            self.attrTransArray = returnTransArray(res);
            console.log(" 添加属性 ", self.attrTransArray);
          }
        })

    },

    addAttrPost(formName) {

      let attrNameObj = { zh: this.attrForm.attrName, jp: this.attrForm.attrName, en: this.attrForm.attrName };
      if (this._SHOPLANGUAGE == 0) {
        attrNameObj.zh = this.attrForm.attrName;
      } else if (this._SHOPLANGUAGE == 1) {
        attrNameObj.en = this.attrForm.attrName;
      } else if (this._SHOPLANGUAGE == 2) {
        attrNameObj.jp = this.attrForm.attrName;
      }

      if (this.attrTransArray.length > 0) {
        attrNameObj = Object.assign(attrNameObj, this.attrTransArray[0]);
        console.log("合并后的属性对象", attrNameObj);
      }

      let addParams = {
        shopId: this.shopId,
        isDelete: false,
        attrNameObject: attrNameObj
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {

          $http.post("/coron-web/itemAttr/add", addParams).then(response => {

            if (response.status) {
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

    editAttr(item) {
      this.attrDialogVisible = true;
      this.attrForm.attrName = item.attrNameObject.zh;
      if (this._SHOPLANGUAGE == 0) {
        this.attrForm.attrName = item.attrNameObject.zh;
      } else if (this._SHOPLANGUAGE == 1) {
        this.attrForm.attrName = item.attrNameObject.en;
      } else if (this._SHOPLANGUAGE == 2) {
        this.attrForm.attrName = item.attrNameObject.jp;
      }

      this.itemAttrId = item.itemAttrId;
      this.titleTag = '修改属性';
    },

    editAttrPost(formName) {

      let itemAttrObj = { zh: this.attrForm.attrName, jp: this.attrForm.attrName, en: this.attrForm.attrName };
      if (this._SHOPLANGUAGE == 0) {
        itemAttrObj.zh = this.attrForm.attrName;
      } else if (this._SHOPLANGUAGE == 1) {
        itemAttrObj.en = this.attrForm.attrName;
      } else if (this._SHOPLANGUAGE == 2) {
        itemAttrObj.jp = this.attrForm.attrName;
      }
      if (this.attrTransArray.length > 0) {
        itemAttrObj = Object.assign(itemAttrObj, this.attrTransArray[0]);
        console.log("合并后的属性对象", itemAttrObj);
      }

      let updateParams = {
        itemAttrId: this.itemAttrId,
        attrNameObject: itemAttrObj
      };

      this.$refs[formName].validate((valid) => {

        if (valid) {

          $http.post("/coron-web/itemAttr/update", updateParams).then(response => {

            if (response.status) {
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
      $http.post('/coron-web/itemAttr/del', { itemAttrId: item.itemAttrId }).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getItemAttrList();
        console.log("删除成功", response);

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
