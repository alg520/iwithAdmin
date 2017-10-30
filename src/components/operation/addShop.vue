<template>
  <div class="add-shop">
    <el-form :model="addShopFrom" :rules="addShopFromRules" ref="addShopFrom" label-width="120px" class="addshopForm">
      <el-form-item :label="$t('shop.shopName')" prop="name">
        <el-input v-model="addShopFrom.name" :placeholder="$t('placeholder.shopName')"></el-input>
      </el-form-item>      
      <el-form-item :label="$t('shop.contacts')" prop="contactPerson">
        <el-input v-model="addShopFrom.contactPerson" :placeholder="$t('placeholder.shopContact')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('shop.shopContact')" prop="shopTel">
        <el-input v-model="addShopFrom.shopTel" :placeholder="$t('placeholder.shopTel')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('shop.langSetting')" prop="language">
        <el-radio-group v-model="addShopFrom.language">
          <el-radio label="0">中文</el-radio>
          <el-radio label="1">English</el-radio>
          <el-radio label="2">日本語</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('shop.postCode')" prop="postcode" v-if="addShopFrom.language == '2'">
        <el-input v-model="addShopFrom.postcode" :placeholder="$t('placeholder.postCode')" class="percentage-width"></el-input>        
        <el-button type="primary" icon="search" @click="getjpAddress()">{{$t('_global.search')}}</el-button>
      </el-form-item>
      <el-form-item :label="$t('shop.province')" prop="province" v-if="addShopFrom.language == '2'">
        <el-input v-model="addShopFrom.province" :placeholder="$t('placeholder.province')" class="percentage-width"></el-input>        
      </el-form-item>
      <el-form-item :label="$t('shop.city')" prop="city" v-if="addShopFrom.language == '2'">
        <el-input v-model="addShopFrom.city" :placeholder="$t('placeholder.city')" class="percentage-width"></el-input>        
      </el-form-item>
      <el-form-item :label="$t('shop.street')" prop="street" v-if="addShopFrom.language == '2'">
        <el-input v-model="addShopFrom.street" :placeholder="$t('placeholder.street')" class="percentage-width"></el-input>        
      </el-form-item>
      <el-form-item :label="$t('shop.shopAddress')" prop="address">
        <el-input v-model="addShopFrom.address" :placeholder="$t('placeholder.address')"></el-input>        
      </el-form-item>
      <el-form-item :label="$t('shop.itemPrice')" prop="haveRadioFee" v-if="addShopFrom.language == '2'">
        <el-radio-group v-model="addShopFrom.haveRadioFee">          
          <el-radio label='0'>{{$t('shop.noTax')}}</el-radio>          
          <el-radio label='1'>{{$t('shop.haveTax')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('shop.taxRate')" prop="taxRadio" v-if="addShopFrom.language == '2' && addShopFrom.haveRadioFee == 0">
        <el-input v-model="addShopFrom.taxRadio" type="number" :placeholder="$t('placeholder.taxRate')" class="percentage-width"></el-input><span>%</span>
      </el-form-item>
      <el-form-item :label="$t('shop.isTest')" prop="isTest">
          <el-select v-model="addShopFrom.isTest" :placeholder="$t('placeholder.select')">
              <el-option :label="$t('shop.yes')" value="true"></el-option>
              <el-option :label="$t('shop.no')" value="false"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item :label="$t('shop.perssion')" prop="perssion">
        <el-select v-model="addShopFrom.currencyPrecision" :placeholder="$t('placeholder.select')">
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
            <el-option label="9" value="9"></el-option>
            <el-option label="10" value="10"></el-option>            
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('shop.currencyType')" prop="currencyType">
        <el-select v-model="addShopFrom.currencyType" :placeholder="$t('placeholder.select')">
            <el-option label="¥ CHINESE" value="CHINESE"></el-option>
            <el-option label="$ US" value="US"></el-option>
            <el-option label="円 JAPAN" value="JAPAN"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('shop.authCode')" prop="custPanelAuthCode">
        <el-input v-model="addShopFrom.custPanelAuthCode" :placeholder="$t('placeholder.authCode')" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="$t('shop.wechatPayId')" prop="wxMerchantId">
        <el-input v-model="addShopFrom.wxMerchantId" :placeholder="$t('placeholder.wechatPayId')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('shop.wechatPayKey')" prop="wxPrivateKey">
        <el-input v-model="addShopFrom.wxPrivateKey" :placeholder="$t('placeholder.wechatPayKey')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('shop.id')" prop="uname">
        <el-input v-model="addShopFrom.uname" :placeholder="$t('placeholder.userId')"></el-input>
      </el-form-item> 
      <el-form-item :label="$t('shop.password')" prop="upassword">
        <el-input v-model="addShopFrom.upassword" :placeholder="$t('placeholder.password')"></el-input>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="submitForm('addShopFrom')">{{$t('_global.lijiAdd')}}</el-button>        
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import MD5 from 'js-md5';
import $http from '../../utils/http';
import Cookies from 'js-cookie';
export default {
  data() {
    var validateNumLetter = (rule,value,callback) => {

        if(!/^[A-Za-z0-9]+$/i.test(value)){
            callback(new Error('请输入数字加字母！'));
        }else {
            callback();
        }

    };
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
        currencyPrecision:'0',
        currencyType:'',
        custPanelAuthCode:Math.random().toString(36).substr(2).slice(2,8),
        language: "0",
        isTest: "true",
        postcode:'',
        province:'',
        city:'',
        street:'',
        uname:'',
        upassword:''
      },
      addShopFromRules: {
        name: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        custPanelAuthCode:[
          { validator:validateNumLetter, trigger: 'onchange' }
        ],
        shopTel: [
          { required: true, message: '请输入店铺联系电话', trigger: 'blur' }
        ],
        currencyPrecision: [
          { required: true, message: '请选择货币精度', trigger: 'blur' }
        ],
        currencyType: [
          { required: true, message: '请选择货币类型', trigger: 'blur' }
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
  computed:{
    MD5password(){
        return MD5(this.addShopFrom.upassword)
    },    
    _SHOPLANGUAGE(){            
        return Cookies.get('SHOPLANGUAGE');
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
      let nameObj = {zh:'',jp:'',en:''};
      let shopAddress = this.addShopFrom.address;      

      if(this.addShopFrom.language == '0'){
        nameObj.zh = this.addShopFrom.name;
        shopAddress = this.addShopFrom.address;
      }

      if(this.addShopFrom.language == '1'){
        nameObj.en = this.addShopFrom.name;
        shopAddress = this.addShopFrom.address;
      }
      
      if(this.addShopFrom.language == '2'){
        nameObj.jp = this.addShopFrom.name;

        let addressObj = {};
        addressObj.province = this.addShopFrom.province;
        addressObj.city = this.addShopFrom.city;
        addressObj.street = this.addShopFrom.street;
        addressObj.address = this.addShopFrom.address;

        shopAddress = JSON.stringify(addressObj);

        console.log(shopAddress);
        //shopAddress = this.addShopFrom.province + '  ' + this.addShopFrom.city + '  ' + this.addShopFrom.street + '  ' + this.addShopFrom.address;
      }

      const data = {
        name: { zh: this.addShopFrom.name, jp: this.addShopFrom.name, en: this.addShopFrom.name },
        shopTel: this.addShopFrom.shopTel,
        haveRadioFee: parseInt(this.addShopFrom.haveRadioFee),
        custPanelAuthCode: this.addShopFrom.custPanelAuthCode,
        taxRadio: this.addShopFrom.taxRadio ? this.addShopFrom.taxRadio : 1,
        address: shopAddress,
        contactPerson: this.addShopFrom.contactPerson,
        wxMerchantId: this.addShopFrom.wxMerchantId,
        wxPrivateKey: this.addShopFrom.wxPrivateKey,
        language: this.addShopFrom.language,
        isTest: true,
        currencyPrecision: parseInt(this.addShopFrom.currencyPrecision),
        currencyType: this.addShopFrom.currencyType
      };

      const postData = {
        shop: data,
        uname: this.addShopFrom.uname ? this.addShopFrom.uname : null,
        upassword: this.addShopFrom.upassword ? this.MD5password : null
      }

      $http.post('/coron-web/shop/addAndUser', postData).then(res => {

        console.log("修改后的添加店铺和账号",res);

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
  background-color: #fff;
}

.addshopForm {
  width: 50%;
  margin: 0 auto;
}
.addshopForm .percentage-width {
  width: 70%;
}
</style>
