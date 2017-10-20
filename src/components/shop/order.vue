<template>
  <div class="orderPage">
    <el-form :inline="true" :model="orderFrom">
      <el-form-item label="下单时段">
        <el-date-picker v-model="startTrade" type="datetime" placeholder="选择开始日期时间" align="right" format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerTradetime">
        </el-date-picker>
        -至-
        <el-date-picker v-model="endTrade" type="datetime" placeholder="选择结束日期时间" align="right" :picker-options="pickerTradetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="tradeStatus" placeholder="订单状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待审核" value="1"></el-option>
          <el-option label="审核通过" value="2"></el-option>
          <el-option label="人工退单" value="3"></el-option>
          <el-option label="审核未通过" value="4"></el-option>
          <el-option label="取消" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSomeThing()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tradeLists" border style="width: 100%; text-align:center;">
      <el-table-column prop="tradeId" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="originalAmount" label="原价" width="180">
      </el-table-column>
      <el-table-column prop="paidAmount" label="实际支付金额" width="180">
      </el-table-column>
      <el-table-column prop="tradeStatus" label="订单状态" width="180">
        <template scope="scope">
          <span>{{ scope.row.tradeStatus| orderStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="下单时间">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" size="small" @click="getDetailTrade(scope.row)">详情</el-button>
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
import axios from 'axios';
import Lockr from 'lockr';
import formatDate from '../../utils/formatDate'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      orderFrom: {
        time: '',
        status: '0'
      },
      tradeStatus:'',
      tradeLists: [],
      tradeDetailInfo:'',
      pickerTradetime: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      startTrade: '',
      endTrade: ''
    }
  },
  created() {
    this.getTrade();
  },
  methods: {
    getTrade() {
      const getData = {
        startTime: this.startTrade == '' ? '' : formatDate(this.startTrade,'yyyy-MM-dd h:m:s'),
        endTime: this.endTrade == '' ? '' : formatDate(this.endTrade,'yyyy-MM-dd h:m:s'),
        tradeStatus: this.tradeStatus,
        page: this.currentPage,
        rp: 10,
      };

      axios.post('/coron-web/trade/getByShop', getData).then(res => {
        console.log("获取交易记录", res.data);
        this.tradeLists = res.data.rows;
        this.totalItems = res.data.total;

      })
    },
    
    getDetailTrade(item) {

      var self = this;

      axios.post('/coron-web/trade/getTradeInfo', {
        tradeId: item.tradeId
      }).then(res => {
        console.log("交易详情", res.data.entry);
        self.tradeDetailInfo = res.data.entry;

        Lockr.set("tradeDetailInfo",self.tradeDetailInfo);

        this.$router.push({
          path:'/shop/orderdetail'
        });
      })
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

    }

  }
}
</script>

<style>
.orderPage {
  padding: 10px 15px;
}
</style>
