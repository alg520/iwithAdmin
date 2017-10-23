<template>
  <div class="trans-page" id="trans-page">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 菜品翻译</span>
        <div class="tab-content" id="tab-content">
          <item-translate></item-translate>
        </div>        
      </el-tab-pane>
      <el-tab-pane label="类目翻译">
        <div class="tab-content">
            <catalogTranslate></catalogTranslate>
        </div>        
      </el-tab-pane>
      <el-tab-pane label="属性翻译">
        <div class="tab-content">
            <attrTranslate></attrTranslate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配菜翻译">
        <div class="tab-content">
            <sideDishTranslate></sideDishTranslate>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>  
</template>

<script>
import axios from "axios";
import $http from "../../utils/http";
import Lockr from "lockr";
import itemTranslate from './translate/itemTranslate'
import catalogTranslate from './translate/catalogTranslate'
import attrTranslate from './translate/attrTranslate'
import sideDishTranslate from './translate/sideDishTranslate'
export default {
  components:{
    itemTranslate,catalogTranslate,attrTranslate,sideDishTranslate
  },
  data() {
    return {
      baseUrl: "http://www.52iwith.com/coron-web/",
      catalogDatas: [],
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
    }
  },  

  mounted: function() {
    
    //动态计算属性导航的高度
    var catalogNavHeight = document.body.clientHeight - 211;
    document.getElementById("tab-content").style.height = catalogNavHeight + 'px';
    document.getElementsByClassName("tab-content")[0].style.height = catalogNavHeight + 'px';
    document.getElementsByClassName("tab-content")[1].style.height = catalogNavHeight + 'px';
    document.getElementsByClassName("tab-content")[2].style.height = catalogNavHeight + 'px';
    document.getElementsByClassName("tab-content")[3].style.height = catalogNavHeight + 'px';

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
    console.log("店铺信息", this.rShopDetailData);
    console.log("店铺语言", this._SHOPLANGUAGE);
  },

  methods: {
    getItemList() {
      let getParams = {
        shopId: this.rShopDetailData.id,
        rp: 10,
        page: this.currentPage
      };

      $http
        .post("/coron-web/item/list", getParams)
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
  .td-padding {
    padding: 8px 0;
  }
</style>
