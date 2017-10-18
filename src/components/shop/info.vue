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
                            <p>
                                店铺名称：
                                <span v-if="shop.language == 0" v-text="shop.name.zh"></span>
                                <span v-if="shop.language == 1" v-text="shop.name.en"></span>
                                <span v-if="shop.language == 2" v-text="shop.name.jp"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺联系电话：
                                <span v-text="shop.shopTel"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>                                
                                店铺地址：                                
                                <span v-if="shop.language == 0" v-text="shop.address"></span>
                                <span v-if="shop.language == 1" v-text="shop.address"></span>
                                <span v-if="shop.language == 2" >{{shop.address | addressParse}}</span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>语言设置：
                                <span> {{shop.language | languageType}}</span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>微信支付账号：
                                <span v-text="shop.wxMerchantId"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>微信支付KEY：
                                <span v-text="shop.wxPrivateKey"></span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺授权码：
                                <span v-text="shop.custPanelAuthCode"></span>
                            </p>
                        </el-col>
                        <el-col :span="24">
                            <h3>
                                <span>店员列表</span>
                                <el-button type="primary" size="small" icon="plus" title="添加账号" @click="addUser()"></el-button>
                            </h3>
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="accountLists" style="width: 100%; text-align:center;" max-height=200>
                                <el-table-column prop="uname" label="账号" width="200px">
                                </el-table-column>
                                <el-table-column prop="userType" label="账号类型">
                                    <template scope="scope">
                                        <el-tag type="danger" v-if="scope.row.userType == 3">管理员</el-tag>
                                        <el-tag type="primary" v-if="scope.row.userType == 4">店员</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="userType" label="店员信息">
                                    <template scope="scope">                                        
                                        <el-tag type="primary">用户ID：{{scope.row.userId}}</el-tag>
                                        <el-tag type="primary">用户联系方式：{{scope.row.telephone}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template scope="scope">
                                        <el-button type="text" size="small" @click="updatePassword(scope.row)">
                                            <i class="el-icon-edit" title="编辑"></i>
                                        </el-button>
                                        <el-button type="text" size="small" @click="confirmDel(scope.row)" v-if="scope.row.userType !== 3">
                                            <i class="el-icon-delete" title="删除"></i>
                                        </el-button>                                        
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :span="24">
                            <h3>机器人列表</h3>
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="equipmentInfos" style="width: 100%; text-align:center;" max-height=200>
                                <el-table-column label="机器人ID" width="100px;">
                                    <template scope="scope">
                                        <span>{{scope.row.robotId}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sn" label="SN号">
                                </el-table-column>
                                <el-table-column prop="tableNo" label="桌号">
                                </el-table-column>
                                <el-table-column prop="managerId" label="所属店员ID">
                                </el-table-column>
                                <el-table-column prop="sn" label="绑定顾客设备">
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
                    <el-input type="text" v-model="addUserForm.uname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="upassword">
                    <el-input type="password" v-model="addUserForm.upassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addUserPost()">确认添加</el-button>
                    <el-button @click="cancelDialog()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="密码修改" :visible.sync="updatePWDDialogVisible" class="addDialog" size="tiny">
            <el-form :model="updatepwdForm" :rules="updatepwdRules" ref="updatepwdForm" label-width="100px">
                <el-form-item label="账号">
                    <el-input type="text" v-model="updatepwdForm.uname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="oldupassword" v-if="middleItem.userType == 3">
                    <el-input type="password" v-model="updatepwdForm.oldupassword" ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newupassword">
                    <el-input type="password" v-model="updatepwdForm.newupassword" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updatePasswordPost('updatepwdForm')">确认修改</el-button>                    
                    <el-button @click="updatePWDDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>            
        </el-dialog>
    </div>
</template>

<script>
import $http from '../../utils/http';
import * as userApi from '../../api/user';
import { getRobotByShop } from '../../api/shop';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Lockr from 'lockr';
import MD5 from 'js-md5';
export default {
    data() {
        var validateNumLetter = (rule, value, callback) => {            

            if (!/^[A-Za-z0-9]+$/i.test(value)) {
                callback(new Error('请输入数字加字母！'));
            } else {
                callback();
            }

        };
        return {
            shop: {},
            equipmentInfos: [],
            addUserDialogVisible: false,
            updatePWDDialogVisible:false,
            addUserForm: {
                uname: '',
                upassword: ''
            },
            adduserRules: {
                uname: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { validator: validateNumLetter, trigger: 'onchange' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }                    
                ],
                upassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }                    
                ]
            },
            updatepwdForm:{
                uname:'',
                oldupassword:'',
                newupassword:'' 
            },
            updatepwdRules:{
                oldupassword:[
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
                newupassword:[
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }                    
                ]
            },
            middleItem:'',
            accountLists: []
        }
    },
    created() {
        this.getLoginInfo();
        this.getRobot();
        this.getShopUser();
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    methods: {
        getLoginInfo() {
            userApi.getLoginUser().then(res => {
                this.shop = res.entry.shop;
                console.log(this.shop);
            });
        },

        getUserList() {
            userApi.getUserList({}).then(res => {
                console.log("用户列表", res);
            })
        },

        getRobot() {
            getRobotByShop().then(res => {
                console.log("店铺里的机器人", res);
                if(res.status){
                    this.equipmentInfos = res.entry;
                } else {
                    this.$message({
                        type:'error',
                        message:'机器人列表获取错误'
                    })
                }
                
            })
        },

        getShopUser() {
            userApi.getShopUser().then(res => {
                console.log("店员列表", res);
                if(res.status){
                    this.accountLists = res.entry;
                } else {
                    this.$message({
                        type:'error',
                        message:'店员列表获取失败'
                    })
                }
                
            })
        },

        addUser() {
            this.addUserForm.uname ='';
            this.addUserForm.upassword ='';
            this.addUserDialogVisible = true;
        },

        addUserPost() {
            const userData = {
                uname: this.addUserForm.uname,
                upassword: this.addUserForm.upassword,
                userType: 4
            }
            
            this.$refs['addUserForm'].validate((valid) => {
                
                if(valid){
                    userApi.addUser(userData).then(res => {

                        if (res.status) {
                            this.$message({
                                type: 'success',
                                message: '添加成功！'
                            });
                            this.getShopUser();
                            this.addUserDialogVisible = false;
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.cnMessage
                            })
                        }

                    })
                } else {
                    this.$message({
                        type:'error',
                        message:'校验失败，请检查'
                    })                    
                }
            })

            
        },
        updatePassword(item){

            this.updatePWDDialogVisible = true;            
            this.middleItem = item;
            console.log(this.middleItem);
            this.updatepwdForm.uname = item.uname;
            this.updatepwdForm.newPassword ='';
            
        },

        updatePasswordPost(formName){

            if(this.middleItem.userType == 4){
                var data = {
                    targetUserId:this.middleItem.userId,
                    newPassword:MD5(this.updatepwdForm.newupassword)
                };
            } else {
                var data = {
                    targetUserId:this.middleItem.userId,
                    oldPassword:MD5(this.updatepwdForm.oldupassword),
                    newPassword:MD5(this.updatepwdForm.newupassword)
                };
            }            
            
            this.$refs[formName].validate((valid) => {
                
                if (valid) {
                    
                    $http.post('/coron-web/user/updatePassword',data).then(res => {
                
                        if(res.status){                            
                            this.$message({
                                type:'success',
                                message:'修改成功'
                            });
                            this.updatePWDDialogVisible = false;
                        } else {
                            this.$message({
                                type:'error',
                                message:res.message
                            });
                        }

                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },

        delUser(item) {
            const delData = {
                userId: item.userId
            };
            userApi.delUser(delData).then(res => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.getShopUser();
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败'
                    });
                    return false;
                }
            })
        },

        confirmDel(item) {
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'warning'
            }).then(_ => {
                this.delUser(item);
            }).catch(_ => {
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });
            });
        },        

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        cancelDialog() {
            this.addUserDialogVisible = false;
        },

        ...mapMutations({
            getUser: 'GET_USER',
            setUserList: 'SET_USERLIST'
        }),

        ...mapActions({
            vxGetLoginInfo: 'GetLoginInfo'
        })
    }
}
</script>

<style scoped>
.shop-info {
    padding: 10px 15px;
    background: #fff;
}

.shop-info p {
    margin: 5px 0;
    line-height: 30px;
}
</style>
