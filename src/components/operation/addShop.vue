<template>
  <div class="add-shop">
    <el-form :model="addShopFrom" :rules="addShopFromRules" ref="addShopFrom" label-width="120px" class="addshopForm">
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="addShopFrom.name" placeholder="请输入店铺名称"></el-input>
      </el-form-item>      
      <el-form-item label="店铺联系人" prop="contactPerson">
        <el-input v-model="addShopFrom.contactPerson" placeholder="请输入店铺联系人"></el-input>
      </el-form-item>
      <el-form-item label="店铺联系方式" prop="shopTel">
        <el-input v-model="addShopFrom.shopTel" placeholder="请输入店铺联系方式"></el-input>
      </el-form-item>
      <el-form-item label="语言" prop="language">
        <el-radio-group v-model="addShopFrom.language">
          <el-radio label="0">中文</el-radio>
          <el-radio label="1">英文</el-radio>
          <el-radio label="2">日文</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮编" prop="postcode" v-if="addShopFrom.language == '2'">
        <el-input v-model="addShopFrom.postcode" placeholder="请输入邮编" class="percentage-width"></el-input>        
        <el-button type="primary" icon="search" @click="getjpAddress()">搜索</el-button>
      </el-form-item>
      <el-form-item label="省" prop="province" v-if="addShopFrom.language == '2'">
        <el-input v-model="addShopFrom.province" placeholder="请输入省" class="percentage-width"></el-input>        
      </el-form-item>
      <el-form-item label="市" prop="city" v-if="addShopFrom.language == '2'">
        <el-input v-model="addShopFrom.city" placeholder="请输入市" class="percentage-width"></el-input>        
      </el-form-item>
      <el-form-item label="街道" prop="street" v-if="addShopFrom.language == '2'">
        <el-input v-model="addShopFrom.street" placeholder="请输入街道" class="percentage-width"></el-input>        
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="addShopFrom.address" placeholder="请输入店铺地址" class="percentage-width"></el-input>        
      </el-form-item>
      <el-form-item label="商品价格" prop="haveRadioFee" v-if="addShopFrom.language == '2'">
        <el-radio-group v-model="addShopFrom.haveRadioFee">          
          <el-radio label='0'>不含税</el-radio>          
          <el-radio label='1'>含税</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="税率" prop="taxRadio" v-if="addShopFrom.haveRadioFee == 0">
        <el-input v-model="addShopFrom.taxRadio" placeholder="请输入税率"></el-input>
      </el-form-item>
      <el-form-item label="是否测试店铺" prop="isTest">
          <el-select v-model="addShopFrom.isTest" placeholder="请选择">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="微信商铺收款ID" prop="wxMerchantId">
        <el-input v-model="addShopFrom.wxMerchantId" placeholder="请输入微信商铺收款ID"></el-input>
      </el-form-item>
      <el-form-item label="微信商铺密钥" prop="wxPrivateKey">
        <el-input v-model="addShopFrom.wxPrivateKey" placeholder="请输入微信商铺密钥"></el-input>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="submitForm('addShopFrom')">立即添加</el-button>
        <!-- <el-button @click="resetForm('addShopFrom')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import $http from '../../utils/http';
export default {
  data() {
    return {
      addShopFrom: {
        name: '',
        address: '',
        contactPerson: '',
        shopTel: '',
        haveRadioFee: '0',
        taxRadio: '8',
        wxMerchantId: '',
        wxPrivateKey: '',
        language: "0",
        isTest: "true",
        postcode:'',
        province:'',
        city:'',
        street:''
      },
      addShopFromRules: {
        name: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        shopTel: [
          { required: true, message: '请输入店铺联系电话', trigger: 'blur' }
        ],
        haveRadioFee: [
          { required: true, message: '请选择是否有税率', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入店铺地址', trigger: 'blur' }
        ],
        postcode: [
          { required: true, message: '请输入店铺地址', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请输入店铺地址', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入店铺地址', trigger: 'blur' }
        ],
        street: [
          { required: true, message: '请输入店铺地址', trigger: 'blur' }
        ],
        isTest: [
          { required: true, message: '请选择是否测试店铺', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          this.addShop();

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    addShop() {      

      if(this.addShopFrom.language == '2'){
        this.addShopFrom.address = this.addShopFrom.province + '  ' + this.addShopFrom.city + '  ' + this.addShopFrom.street + '  ' + this.addShopFrom.address;
      }

      const data = {
        name: { zh: this.addShopFrom.name, jp: '', en: '' },
        shopTel: this.addShopFrom.shopTel,
        haveRadioFee: parseInt(this.addShopFrom.haveRadioFee),
        taxRadio: this.addShopFrom.taxRadio ? this.addShopFrom.taxRadio : 1,
        address: this.addShopFrom.address,
        contactPerson: this.addShopFrom.contactPerson,
        wxMerchantId: this.addShopFrom.wxMerchantId,
        wxPrivateKey: this.addShopFrom.wxPrivateKey,
        language: this.addShopFrom.language,
        isTest: true
      };

      $http.post('/coron-web/shop/add', data).then(res => {

        if(res.status){
          this.$message({
            type:'success',
            message:'店铺添加成功！'
          });
          this.$router.push({
            path:'/operation/shopmanage'
          });
        } else {
          this.$message({
            type:'success',
            message:res.cnMessage
          });
        }

      })
    },


    getjpAddress(){

      if(this.addShopFrom.postcode != ''){
        $http.post('/coron-web/jpaddress/getByPostcode',{
          postcode:this.addShopFrom.postcode
        }).then(res => {

          console.log("获取的地址信息",res);
          if(res.status){
            this.addShopFrom.province = res.entry[0].province;
            this.addShopFrom.city = res.entry[0].city;
            this.addShopFrom.street = res.entry[0].street;
          } else {
            console.log("返回错误！");
          }

          
        }).catch(res => {
          this.$message({
            type:'error',
            message:'请求错误！'
          });
        })
      } else {
        this.$message({
          type:'warning',
          message:'请输入邮编！'
        });
      }


      
    }
  }

}
</script>

<style>
.add-shop {
  padding: 15px 10px;
}

.addshopForm {
  width: 50%;
  margin: 0 auto;
}
.addshopForm .percentage-width {
  width: 50%;
}
</style>
