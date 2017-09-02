<template>
  <div class="orderPage">
    <span style="color:#FF4949;">此页面应该是交易记录查询！</span>
    <el-form :inline="true" class="demo-form-inline" :model="orderFrom">
    <el-form-item label="下单时间">
      <el-input v-model="orderFrom.time" placeholder="下单时间"></el-input>
    </el-form-item>
    <el-form-item label="订单状态">
      <el-select v-model="orderFrom.status" placeholder="订单状态">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item><el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tradeLists"
    border
    style="width: 100%; text-align:center;">
    <el-table-column
      prop="tradeId"
      label="订单编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="originalAmount"
      label="原价"
      width="180">
    </el-table-column>
    <el-table-column
      prop="paidAmount"
      label="实际支付金额"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tradeStatus"
      label="订单状态"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createdTime"
      label="下单时间">
    </el-table-column>
    <el-table-column
      label="操作">
      <template scope="scope">
        <el-button type="primary" size="small" @click="getDetailTrade(scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
        orderFrom:{
          time:'',
          status:'shanghai'
        },
        tradeLists:[]       
      }
  },
  created(){
    this.getTrade();
  },
  methods :{
    getTrade(){

      const getData = {
        startTime:'',
        endTime:'',
        tradeStatus:'',
        page:1,
        rp:10,
      };

      axios.post('/coron-web/trade/getByShop',getData).then(res => {
        console.log("获取交易记录",res.data);
        this.tradeLists = res.data.rows;

      })
    },

    // 接口需要复制到  /coron-web
    getDetailTrade(item){
      axios.post('/coron-api/order/getTradeInfo',{
        tradeId:item.tradeId
      }).then(res => {
        console.log("交易详情",res.data);
      })
    }
  }
}
</script>

<style>
.orderPage {
  padding: 10px 15px;
}

</style>
