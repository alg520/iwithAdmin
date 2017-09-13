<template>
  <div class="add-shop">
    <el-form :model="addShopFrom" :rules="addShopFromRules" ref="addShopFrom" label-width="120px" class="addshopForm">
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="addShopFrom.name" placeholder="请输入店铺名称"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址" prop="address">
        <el-input v-model="addShopFrom.address" placeholder="请输入店铺地址"></el-input>
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
      <el-form-item label="是否收税" prop="haveRadioFee">
        <el-radio-group v-model="addShopFrom.haveRadioFee">
          <el-radio label='0'>不收税</el-radio>
          <el-radio label='1'>收税</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="税率" prop="taxRadio" v-if="addShopFrom.haveRadioFee == 1">
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
export default {
  data() {
    return {
      addShopFrom: {
        name: '',
        address: '',
        contactPerson: '',
        shopTel: '',
        haveRadioFee: '0',
        taxRadio: '',
        wxMerchantId: '',
        wxPrivateKey: '',
        language: "0",
        isTest: "true"
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

      axios.post('/coron-web/shop/add', data).then(res => {        

        if(res.data.status){
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
            message:res.data.cnMessage
          });
        }

      })
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
