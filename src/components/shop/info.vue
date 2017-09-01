<template>
    <div class="shop-info">
        <el-row>
            <el-col :sm="24" :md="24" :lg="24">
                <div class="base-info">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <h3>基本信息</h3>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺名称：<span v-text="shopname"></span></p>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺联系电话：<span v-text="shop.shopTel"></span></p>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺地址：<span v-text="shop.address"></span></p>
                        </el-col>
                        <el-col :span="12">
                            <p>语言设置：<span> {{shop.language | languageType}}</span></p>
                        </el-col>
                        <el-col :span="12">
                            <p>微信支付账号：<span v-text="shop.wxMerchantId"></span></p>
                        </el-col>
                        <el-col :span="12">
                            <p>微信支付KEY：<span v-text="shop.wxPrivateKey"></span></p>
                        </el-col>
                        <el-col :span="24">
                            <h3>设备信息</h3>
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="tableData" style="width: 100%; text-align:center;">
                                <el-table-column prop="date" label="设备类型" width="180">
                                </el-table-column>
                                <el-table-column prop="name" label="SN号" width="180">
                                </el-table-column>
                                <el-table-column prop="address" label="名称">
                                </el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :span="24">
                            <h3>
                                登陆账号
                                <el-button type="primary" size="small" icon="plus" title="添加账号" @click="addUser()"></el-button>
                            </h3>
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="accountLists" style="width: 100%; text-align:center;">
                                <el-table-column prop="uname" label="账号">
                                </el-table-column>
                                <el-table-column prop="upassword" label="密码">
                                </el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template scope="scope">                                    
                                    <el-button type="text" size="small" @click="updateItem(scope.row)">
                                        <i class="el-icon-edit" title="编辑"></i>
                                    </el-button>
                                    <el-button type="text" size="small" @click="confirmDel(scope.row)">
                                        <i class="el-icon-delete" title="删除"></i>
                                    </el-button>                                    
                                </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <el-dialog title="账号添加" :visible.sync="addUserDialogVisible" class="addDialog" size="tiny">
            <el-form :model="addUserForm" :rules="adduserRules" ref="addUserForm" label-width="100px">
                <el-form-item label="账号" prop="uname">
                    <el-input type="text" v-model="addUserForm.uname" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="upassword">
                    <el-input type="text" v-model="addUserForm.upassword" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addUserForm')">确认添加</el-button>                    
                    <el-button @click="cancelDialog()">取消</el-button>
                </el-form-item>
            </el-form>            
        </el-dialog>
    </div>
</template>

<script>
import * as user from '../../api/user'
export default {
    data() {
        var validateNumLetter = (rule,value,callback) => {

            if(!/^[A-Za-z0-9]+$/i.test(value)){
                callback(new Error('请输入数字加字母！'));
            }

        };
        return {
            shop:{},
            shopname:'',
            equipmentInfos:[],
            addUserDialogVisible:false,
            addUserForm:{
                uname:'',
                upassword:''
            },
            adduserRules:{
                uname: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: validateNumLetter , trigger:'blur'}
                ],
                upassword:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: validateNumLetter , trigger:'blur'}
                ]
            },
            accountLists:[
                {
                    uname:'zpb',
                    upassword:'123456'
                }
            ],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    created(){
        this.getLoginInfo();
        this.getUserList();
    },
    methods:{
        getLoginInfo(){
            user.getLoginUser().then(res => {
                this.shop = res.shop;
                //这里会根据language来判断显示的语言
                this.shopname = res.shop.name.zh;

            });
        },

        getUserList(){            

            user.getUserList({}).then(res => {
                console.log("用户列表",res);
            })
        },

        addUser(){
            this.addUserDialogVisible = true;
        },

        addUserPost(){
            const userData = {
                uname:this.addUserForm.uname,
                upassword:this.addUserForm.upassword,
                userType:4
            }

            user.addUser(userData).then(res => {
                console.log(res);
            })
        },

        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    this.addUserPost();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        cancelDialog(){
            this.addUserDialogVisible = false;
        }
    }
}
</script>

<style>
.shop-info {
    padding: 10px 15px;
}

.shop-info p {
    margin: 5px 0;
    line-height: 30px;
}
</style>
