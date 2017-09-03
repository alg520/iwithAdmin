<template>
  <div class="add-shop">
    <el-form :model="addShopFrom" :rules="rules" ref="addShopFrom" label-width="120px" class="addshopForm">
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="addShopFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址" prop="address">
        <el-input v-model="addShopFrom.address"></el-input>
      </el-form-item>
      <el-form-item label="店铺联系人" prop="contactPerson">
        <el-input v-model="addShopFrom.contactPerson"></el-input>
      </el-form-item>
      <el-form-item label="店铺联系方式" prop="shopTel">
        <el-input v-model="addShopFrom.shopTel"></el-input>
      </el-form-item>
      <el-form-item label="语言" prop="language">
        <el-radio-group v-model="addShopFrom.language">
          <el-radio label="0">中文</el-radio>
          <el-radio label="1">英文</el-radio>
          <el-radio label="2">日文</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否收税" prop="haveRadioFee">
        <el-radio-group v-model="addShopFrom.haveRadioFee">
          <el-radio label="0">不收税</el-radio>
          <el-radio label="1">收税</el-radio>          
        </el-radio-group>
      </el-form-item>
      <el-form-item label="税率" prop="taxRadio">
        <el-input v-model="addShopFrom.taxRadio"></el-input>
      </el-form-item>
      <el-form-item label="微信商铺收款ID" prop="wxMerchantId">
        <el-input v-model="addShopFrom.wxMerchantId"></el-input>
      </el-form-item>     
      <el-form-item label="微信商铺密钥" prop="wxPrivateKey">
        <el-input v-model="addShopFrom.wxPrivateKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addShopFrom')">立即添加</el-button>
        <el-button @click="resetForm('addShopFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {     
      addShopFrom:{
        name:'',
        address:'',
        contactPerson:'',
        shopTel:'',
        haveRadioFee:"0",
        taxRadio:'',
        wxMerchantId:'',
        wxPrivateKey:'',
        language:"0"
      }
    }
  },
  methods:{
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      addShop(){
        
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
</style>
