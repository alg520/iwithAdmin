<template>
    <div class="add-shop">
        <el-form :model="updateShopForm" :rules="updateShopFormRules" ref="updateShopForm" label-width="120px" class="addshopForm">
            <el-form-item label="店铺名称" prop="name">
                <el-input v-model="updateShopForm.name"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址" prop="address">
                <el-input v-model="updateShopForm.address"></el-input>
            </el-form-item>
            <el-form-item label="店铺联系人" prop="contactPerson">
                <el-input v-model="updateShopForm.contactPerson"></el-input>
            </el-form-item>
            <el-form-item label="店铺联系方式" prop="shopTel">
                <el-input v-model="updateShopForm.shopTel"></el-input>
            </el-form-item>
            <el-form-item label="语言" prop="language">
                <el-radio-group v-model="updateShopForm.language">
                    <el-radio label="0">中文</el-radio>
                    <el-radio label="1">英文</el-radio>
                    <el-radio label="2">日文</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否收税" prop="haveRadioFee">
                <el-radio-group v-model="updateShopForm.haveRadioFee">
                    <el-radio label="0">不收税</el-radio>
                    <el-radio label="1">收税</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="税率" prop="taxRadio" v-if="updateShopForm.haveRadioFee == 1">
                <el-input v-model="updateShopForm.taxRadio"></el-input>
            </el-form-item>
            <el-form-item label="微信商铺收款ID" prop="wxMerchantId">
                <el-input v-model="updateShopForm.wxMerchantId"></el-input>
            </el-form-item>
            <el-form-item label="微信商铺密钥" prop="wxPrivateKey">
                <el-input v-model="updateShopForm.wxPrivateKey"></el-input>
            </el-form-item>
            <el-form-item label="是否测试店铺" prop="isTest">
                <el-select v-model="updateShopForm.isTest" placeholder="请选择">
                    <el-option label="是" value="true">是</el-option>
                    <el-option label="否" value="false">否</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('updateShopForm')">立即修改</el-button>
                <el-button @click="resetForm('updateShopForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import Lockr from 'lockr'
export default {
    data() {
        return {
            updateShopForm: {
                name: '',
                address: '',
                contactPerson: '',
                shopTel: '',
                haveRadioFee: '0',
                taxRadio: '',
                wxMerchantId: '',
                wxPrivateKey: '',
                language: "0",
                isTest: 'true'
            },
            updateShopFormRules: {
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
                    { required: true, message: '请选择是否是测试店铺', trigger: 'blur' }
                ]
            }
        }
    },
    
    computed: {
        rShopDetailData() {
            return Lockr.get('shopDetailData');            
        }
    },

    created(){
        this.getUpdateData();
    },

    methods: {

        getUpdateData(){
            var data = this.rShopDetailData;
            this.updateShopForm.name = data.name.zh;
            this.updateShopForm.address = data.address;
            this.updateShopForm.contactPerson = data.contactPerson;
            this.updateShopForm.shopTel = data.shopTel;
            this.updateShopForm.language = data.language+"";
            this.updateShopForm.haveRadioFee = (data.haveRadioFee+ 0) +"";
            this.updateShopForm.taxRadio = data.taxRadio;
            this.updateShopForm.wxMerchantId = data.wxMerchantId;
            this.updateShopForm.wxPrivateKey = data.wxPrivateKey;
            this.updateShopForm.isTest = data.isTest+"";
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    this.updateShop();

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        updateShop() {

            const data = {
                id:this.rShopDetailData.id,
                name: { zh: this.updateShopForm.name, jp: '', en: '' },
                shopTel: this.updateShopForm.shopTel,
                haveRadioFee: parseInt(this.updateShopForm.haveRadioFee),
                taxRadio: this.updateShopForm.taxRadio ? this.updateShopForm.taxRadio : 1,
                address: this.updateShopForm.address,
                contactPerson: this.updateShopForm.contactPerson,
                wxMerchantId: this.updateShopForm.wxMerchantId,
                wxPrivateKey: this.updateShopForm.wxPrivateKey,
                language: this.updateShopForm.language,
                isTest: true
            };

            axios.post('/coron-web/shop/update', data).then(res => {

                if (res.data.status) {
                    this.$message({
                        type: 'success',
                        message: '店铺修改成功！'
                    });
                    this.$router.push({
                        path: '/operation/shopmanage'
                    });
                } else {
                    this.$message({
                        type: 'success',
                        message: res.data.cnMessage
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
