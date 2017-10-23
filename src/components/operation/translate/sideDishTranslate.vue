<template>
  <div class="itemTrans-page">
      <el-table :data="productsList" ref="multipleTable" tooltip-effect="dark" style="width: 100%; text-align:center;" max-height="650">
              <el-table-column prop="itemNo" sortable label="编号" fixed width="90px">
              </el-table-column>
              <el-table-column label="商品名称">
                  <template scope="scope">
                      <span v-if="_SHOPLANGUAGE == 0 && editTag !== scope.row.itemId">{{scope.row.itemNameObject.zh}}</span>
                      <span v-if="_SHOPLANGUAGE == 1 && editTag !== scope.row.itemId">{{scope.row.itemNameObject.en}}</span>
                      <span v-if="_SHOPLANGUAGE == 2 && editTag !== scope.row.itemId">{{scope.row.itemNameObject.jp}}</span>
                      <div v-if="editTag == scope.row.itemId" class="td-padding">
                        <el-input placeholder="请输入中文名称" v-model="editForm.nameZH" :disabled="_SHOPLANGUAGE == 0">
                          <template slot="prepend">中</template>
                        </el-input>
                        <br>
                        <el-input placeholder="请输入日文名称" v-model="editForm.nameJP" :disabled="_SHOPLANGUAGE == 2">
                          <template slot="prepend">日</template>
                        </el-input>
                        <br>
                        <el-input placeholder="请输入英文名称" v-model="editForm.nameEN" :disabled="_SHOPLANGUAGE == 1">
                          <template slot="prepend">英</template>
                        </el-input>
                      </div>                      
                  </template>                  
              </el-table-column>              
              <el-table-column label="商品描述">
                  <template scope="scope">
                      <span v-if="_SHOPLANGUAGE == 0 && editTag !== scope.row.itemId">{{scope.row.itemDescObject.zh}}</span>
                      <span v-if="_SHOPLANGUAGE == 1 && editTag !== scope.row.itemId">{{scope.row.itemDescObject.en}}</span>
                      <span v-if="_SHOPLANGUAGE == 2 && editTag !== scope.row.itemId">{{scope.row.itemDescObject.jp}}</span>                      
                      <div v-if="editTag == scope.row.itemId">
                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入中文描述" v-model="editForm.descZH">                          
                        </el-input>
                        <br>
                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入日文描述" v-model="editForm.descJP">                          
                        </el-input>
                        <br>
                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入英文描述" v-model="editForm.descEN">                          
                        </el-input>
                      </div>
                  </template>
              </el-table-column>              
              <el-table-column label="操作" fixed="right" width="100px">
                  <template scope="scope">
                      <el-button type="text" size="small" @click="editTranslate(scope.row)" v-if="editTag !== scope.row.itemId">
                          <i class="el-icon-edit" title="翻译"></i>
                      </el-button>
                      <el-button type="text" size="small" @click="confirmTranslate()" v-if="editTag == scope.row.itemId">
                          <i class="el-icon-circle-check" title="确认"></i>
                      </el-button>
                      <el-button type="text" size="small" @click="cancelTranslate()" v-if="editTag == scope.row.itemId">
                          <i class="el-icon-circle-cross" title="取消"></i>
                      </el-button>
                      <!-- <el-button type="text" size="small" @click="confirmDel(scope.row)">
                          <i class="el-icon-delete" title="确认"></i>
                      </el-button> -->
                  </template>
              </el-table-column>
          </el-table>
          <div class="block turn-page" style="margin-top:10px;">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
              </el-pagination>
          </div>
  </div>
</template>

<script>
import axios from "axios";
import $http from "../../../utils/http";
import Lockr from "lockr";
export default {
  data() {
    return {
      productsList: [],
      editForm: {
        nameZH: "",
        nameEN: "",
        nameJP: "",
        descZH: "",
        descEN: "",
        descJP: ""
      },
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      formLabelWidth: "120px",
      typeArray: [],
      editTag: 0,
      middleObj: {}
    };
  },

  computed: {
    rShopDetailData() {
      return Lockr.get("shopDetailData");
    },
    _SHOPLANGUAGE() {
      return this.rShopDetailData.language;
    }
  },

  created() {
    //默认获取属性列表
    this.getItemList();
  },

  methods: {
    getItemList() {
      let getParams = {
        shopId: this.rShopDetailData.id,
        itemType:[3],
        catalogId:'-1',
        rp: 10,
        page: this.currentPage
      };

      
      $http.post("/coron-web/item/list", getParams)
        .then(response => {
          !!response.rows && (this.productsList = response.rows);
          this.totalItems = response.total;
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问,请刷新页面重试！");
        });
    },
    handleSizeChange(size) {
      console.log(size);
    },
    // 翻页
    handleCurrentChange(page) {
      console.log(page);
      console.log(this.currentPage);
      this.getItemList();
    },

    editTranslate(item) {
      console.log("编辑翻译", item);
      this.middleObj = item;
      this.editTag = item.itemId;
      this.editForm.nameZH = item.itemNameObject.zh;
      this.editForm.nameJP = item.itemNameObject.jp;
      this.editForm.nameEN = item.itemNameObject.en;
      this.editForm.descZH = item.itemDescObject.zh;
      this.editForm.descJP = item.itemDescObject.jp;
      this.editForm.descEN = item.itemDescObject.en;
    },

    cancelTranslate() {
      this.editTag = 0;
    },

    confirmTranslate() {
      let itemNameObj = {
        zh: this.editForm.nameZH,
        en: this.editForm.nameEN,
        jp: this.editForm.nameJP
      };
      let itemDescObj = {
        zh: this.editForm.descZH,
        en: this.editForm.descEN,
        jp: this.editForm.descJP
      };

      let updateParams = {
        itemId: this.middleObj.itemId,
        itemNameObject: itemNameObj,
        itemDescObject: itemDescObj
      };

      axios({
        url: "/coron-web/item/update",
        method: "post",
        data: updateParams,
        headers: {
          Language: this._SHOPLANGUAGE
        }
      })
        .then(response => {
          if (response.data.status == true) {
            this.$message({
              type: "info",
              message: "菜品翻译成功"
            });
            this.editTag = 0;
            this.getItemList();
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            type: "error",
            message: "请求失败！"
          });
        });
    }
  }
};
</script>

<style>

</style>
