<template>
    <div class="add-shop">
        <el-form :model="updateShopForm" :rules="updateShopFormRules" ref="updateShopForm" label-width="120px" class="addshopForm">
            <el-form-item label="店铺名称" prop="name">
                <el-input v-model="updateShopForm.name"></el-input>
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
            <el-form-item label="邮编" prop="postcode" v-if="updateShopForm.language == '2'">
                <el-input v-model="updateShopForm.postcode" placeholder="请输入邮编" class="percentage-width"></el-input>
                <el-button type="primary" icon="search" @click="getjpAddress()">搜索</el-button>
            </el-form-item>
            <el-form-item label="省" prop="province" v-if="updateShopForm.language == '2'">
                <el-input v-model="updateShopForm.province" placeholder="请输入省" class="percentage-width"></el-input>
            </el-form-item>
            <el-form-item label="市" prop="city" v-if="updateShopForm.language == '2'">
                <el-input v-model="updateShopForm.city" placeholder="请输入市" class="percentage-width"></el-input>
            </el-form-item>
            <el-form-item label="街道" prop="street" v-if="updateShopForm.language == '2'">
                <el-input v-model="updateShopForm.street" placeholder="请输入街道" class="percentage-width"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input v-model="updateShopForm.address"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="haveRadioFee" v-if="updateShopForm.language == '2'">
                <el-radio-group v-model="updateShopForm.haveRadioFee">
                    <el-radio label="0">不含税</el-radio>
                    <el-radio label="1">含税</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="税率" prop="taxRadio" v-if="updateShopForm.language == '2' && updateShopForm.haveRadioFee == 0">
                <el-input v-model="updateShopForm.taxRadio"></el-input>
            </el-form-item>
            <el-form-item label="控制板密码" prop="custPanelAuthCode">
                <el-input v-model="updateShopForm.custPanelAuthCode" :disabled="true" placeholder="请输入控制板密码"></el-input>
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
                <!-- <el-button @click="resetForm('updateShopForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import $http from '../../utils/http'
import Lockr from 'lockr'
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
                isTest: 'true',
                postcode: '',
                province: '',
                city: '',
                street: '',
                custPanelAuthCode:''
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

    created() {
        this.getUpdateData();
    },

    methods: {

        getUpdateData() {
            var data = this.rShopDetailData;            
            this.updateShopForm.language = data.language + "";
            this.updateShopForm.address = data.address;
            if(data.language == 0){
                this.updateShopForm.name = data.name.zh;
            }
            if(data.language == 1){
                this.updateShopForm.name = data.name.en;
            }
            if(data.language == 2){
                this.updateShopForm.name = data.name.jp;
                if(data.address.startsWith("{",0) && data.address.includes('}')){
                    let shopAddressParse = JSON.parse(data.address);
                    this.updateShopForm.province = shopAddressParse.province;
                    this.updateShopForm.city = shopAddressParse.city;
                    this.updateShopForm.street = shopAddressParse.street;
                    this.updateShopForm.address = shopAddressParse.address;
                } else {
                    this.updateShopForm.address = data.address;
                }
                
            }            

            this.updateShopForm.contactPerson = data.contactPerson;
            this.updateShopForm.shopTel = data.shopTel;            
            this.updateShopForm.haveRadioFee = (data.haveRadioFee + 0) + "";
            this.updateShopForm.taxRadio = data.taxRadio;
            this.updateShopForm.wxMerchantId = data.wxMerchantId;
            this.updateShopForm.wxPrivateKey = data.wxPrivateKey;
            this.updateShopForm.isTest = data.isTest + "";
            if(!!data.custPanelAuthCode){
                this.updateShopForm.custPanelAuthCode = data.custPanelAuthCode;
            } else {                
                this.updateShopForm.custPanelAuthCode = Math.random().toString(36).substr(2).slice(1,7);
            }
            
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
            let nameObj = {zh:'',jp:'',en:''};
            let shopAddress = this.updateShopForm.address;

            if(this.updateShopForm.language == 0){
                nameObj.zh = this.updateShopForm.name;
                shopAddress = this.updateShopForm.address;
            }
            if(this.updateShopForm.language == 1){
                nameObj.en = this.updateShopForm.name;
                shopAddress = this.updateShopForm.address;
            }
            if(this.updateShopForm.language == 2){
                nameObj.jp = this.updateShopForm.name;

                let addressObj = {};
                addressObj.province = this.updateShopForm.province;
                addressObj.city = this.updateShopForm.city;
                addressObj.street = this.updateShopForm.street;
                addressObj.address = this.updateShopForm.address;

                shopAddress = JSON.stringify(addressObj);                
            }

            const data = {
                id: this.rShopDetailData.id,
                name: { zh: this.updateShopForm.name, jp: this.updateShopForm.name, en: this.updateShopForm.name },
                shopTel: this.updateShopForm.shopTel,
                haveRadioFee: parseInt(this.updateShopForm.haveRadioFee),
                custPanelAuthCode: this.updateShopForm.custPanelAuthCode,
                taxRadio: this.updateShopForm.taxRadio ? this.updateShopForm.taxRadio : 1,
                address: shopAddress,
                contactPerson: this.updateShopForm.contactPerson,
                wxMerchantId: this.updateShopForm.wxMerchantId,
                wxPrivateKey: this.updateShopForm.wxPrivateKey,
                language: this.updateShopForm.language,
                isTest: true
            };

            $http.post('/coron-web/shop/update', data).then(res => {

                if (res.status) {
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
        },

        getjpAddress() {

            if (this.updateShopForm.postcode != '') {
                $http.post('/coron-web/jpaddress/getByPostcode', {
                    postcode: this.updateShopForm.postcode
                }).then(res => {

                    console.log("获取的地址信息", res);
                    if (res.status) {
                        this.updateShopForm.province = res.entry[0].province;
                        this.updateShopForm.city = res.entry[0].city;
                        this.updateShopForm.street = res.entry[0].street;
                    } else {
                        console.log("返回错误！");
                    }


                }).catch(res => {
                    this.$message({
                        type: 'error',
                        message: '请求错误！'
                    });
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: '请输入邮编！'
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
</style>
