<template>
  <div class="orderPage">
    <el-form :inline="true" :model="orderFrom">
      <el-form-item :label="$t('shop.list')">
        <el-select v-model="selectedShopID" filterable :placeholder="$t('placeholder.select')" @change="changeShop()">
          <el-option :label="$t('_global.all')" value=""></el-option>
          <el-option
            v-for="item in allShopLists"
            :key="item.id"
            :label="item.name.zh"
            :value="item.id">
          </el-option>
        </el-select>        
      </el-form-item>
      <el-form-item :label="$t('shop.order.time')">
        <el-date-picker v-model="startTrade" type="datetime" :placeholder="$t('placeholder.startTime')" align="right" format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerTradetime">
        </el-date-picker>
        -
        <el-date-picker v-model="endTrade" type="datetime" :placeholder="$t('placeholder.endTime')" align="right" :picker-options="pickerTradetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('shop.order.status')">
        <el-select v-model="tradeStatus" :placeholder="$t('placeholder.orderStatus')" @change="changeShop()">
          <el-option :label="$t('shop.order.all')" value=""></el-option>
          <el-option :label="$t('shop.order.pendingAudit')" value="1"></el-option>
          <el-option :label="$t('shop.order.auditPassed')" value="2"></el-option>
          <el-option :label="$t('shop.order.manualWithdrawal')" value="3"></el-option>
          <el-option :label="$t('shop.order.auditNotApproved')" value="4"></el-option>
          <el-option :label="$t('shop.order.cancel')" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSomeThing()">{{$t('_global.search')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tradeLists" border style="width: 100%; text-align:center;">
      <el-table-column prop="tradeId" :label="$t('shop.order.orderId')" width="180">
      </el-table-column>
      <el-table-column prop="originalAmount" :label="$t('shop.order.oldPrice')" width="180">
      </el-table-column>
      <el-table-column prop="paidAmount" :label="$t('shop.order.price')" width="180">
      </el-table-column>
      <el-table-column prop="tradeStatus" :label="$t('shop.order.status')" width="180">
        <template scope="scope">
          <span>{{ scope.row.tradeStatus| tradeStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" :label="$t('shop.order.orderTime')">
      </el-table-column>
      <el-table-column :label="$t('_global.action')">
        <template scope="scope">
          <el-button type="primary" size="small" @click="getDetailTrade(scope.row)">{{$t('shop.order.info')}}</el-button>
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
import $http from "../../utils/http";
import Lockr from "lockr";
import formatDate from "../../utils/formatDate";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      orderFrom: {
        time: "",
        status: "0"
      },
      tradeStatus: "",
      tradeLists: [],
      allShopLists: [],
      selectedShopID: "",
      tradeDetailInfo: "",
      pickerTradetime: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      startTrade: "",
      endTrade: ""
    };
  },
  created() {
    this.getTrade();
    this.getAllShopList();
  },
  methods: {
    getAllShopList() {
      //获取所有店铺列表，绑定到可搜索的下拉列表
      $http.get("/coron-web/shop/getAll", {}).then(res => {
        console.log("所有店铺列表", res);
        this.allShopLists = res.entry;
        //this.selectedShopID = res.entry[0].id;
      });
    },

    getTrade() {
      const getData = {
        shopId: this.selectedShopID == "" ? null : this.selectedShopID,
        startTime:
          this.startTrade == ""
            ? null
            : formatDate(this.startTrade, "yyyy-MM-dd h:m:s"),
        stopTime:
          this.endTrade == ""
            ? null
            : formatDate(this.endTrade, "yyyy-MM-dd h:m:s"),
        tradeStatus: this.tradeStatus,
        page: this.currentPage,
        rp: 10
      };

      $http.post("/coron-web/trade/getByShop", getData).then(res => {
        console.log("获取交易记录", res.data);
        this.tradeLists = res.rows;
        this.totalItems = res.total;
      });
    },

    getDetailTrade(item) {
      var self = this;

      $http
        .post("/coron-web/trade/getTradeInfo", {
          tradeId: item.tradeId
        })
        .then(res => {
          console.log("交易详情", res.entry);
          self.tradeDetailInfo = res.entry;

          Lockr.set("tradeDetailInfo", self.tradeDetailInfo);

          this.$router.push({
            path: "/operation/orderdetail"
          });
        });
    },

    handleSizeChange(size) {
      console.log(size);
    },
    // 翻页
    handleCurrentChange(page) {
      console.log(page);
      console.log(this.currentPage);
      this.getTrade();
    },

    getSomeThing() {
      this.getTrade();
    },

    changeShop() {
      console.log(this.selectedShopID);
      this.getTrade();
    }
  }
};
</script>

<style>
.orderPage {
  padding: 10px 15px;
}
</style>
