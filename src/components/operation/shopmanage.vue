<template>
  <div class="shopmanage-page">
    <el-form :inline="true" :model="shopFrom">
      <el-form-item label="店铺名称">
        <el-input v-model="shopFrom.name" placeholder="请输入店铺名称" @keyup.enter="getShopList()"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getShopList()">查询</el-button>
        <el-button type="primary" @click="goAddShop()">添加店铺</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="shopLists" border style="width: 100%; text-align:center;">
      <el-table-column prop="name.zh" label="店铺名称">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column> 
      <el-table-column prop="shopTel" label="电话">
      </el-table-column>     
      <el-table-column label="操作" width="130">
        <template scope="scope">
          <el-button type="text" size="small" @click="getShopDetail(scope.row)">店铺详情</el-button>
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
import { mapGetters,mapMutations} from 'vuex';
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      shopFrom: {
        name: ''
      },
      shopLists: [],
    }

  },
  computed:{
    ...mapGetters([
        'shop'
    ])
  },
  created(){
    this.getShopList();
  },
  methods:{

    getShopList(){
      const data ={
        shopName:this.shopFrom.name,
        page:this.currentPage,
        rp:this.pageSize
      };
      axios.post('/coron-web/shop/list',data).then(res => {
        console.log("店铺列表",res.data);
        this.shopLists = res.data.rows;
        this.totalItems = res.data.total;
      })
    },

    getShopDetail(item){     

      Lockr.set('shopDetailData',item);
      
      this.$router.push({
        name:'shopdetail',
        params:{
          item:item.id
        }
      })
    },

    handleSizeChange(size) {
      console.log(size);
    },
    // 翻页
    handleCurrentChange(page) {
      console.log(page);
      console.log(this.currentPage);
      this.getShopList();
    },

    goAddShop(){
      this.$router.push({
        path:'/operation/addshop'
      });      
    },

    ...mapMutations({        
        setShopInfo:'SET_SHOPINFO'
    })
  }
}
</script>

<style>
.shopmanage-page {
  padding: 15px 10px;
}
</style>
