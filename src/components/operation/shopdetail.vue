<template>
    <div class="shop-info">
        <div style="text-align:right;">
            <el-button type="primary" @click="goUpdate()">编辑</el-button>
            <el-button type="primary" @click="goItemList()">查看商品</el-button>
        </div>
        <el-row>
            <el-col :sm="24" :md="24" :lg="24">
                <div class="base-info">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <h3>基本信息</h3>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺名称：<span v-text="shop.name.zh"></span></p>
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
                            <el-table :data="equipmentInfos" style="width: 100%; text-align:center;" max-height=200>
                                <el-table-column label="设备类型">
                                   <template scope="scope">
                                       <span>机器人</span>
                                   </template>
                                </el-table-column>
                                <el-table-column prop="sn" label="SN号">
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
                            <el-table :data="accountLists" style="width: 100%; text-align:center;" max-height=200>
                                <el-table-column prop="uname" label="账号">
                                </el-table-column>
                                <el-table-column prop="uname" label="账号类型">
                                    <template scope="scope">
                                        <el-tag type="danger" v-if="scope.row.userType == 3">管理员</el-tag>
                                        <el-tag type="danger" v-if="scope.row.userType == 4">店员</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template scope="scope">
                                        <el-button type="text" size="small" @click="updatePassword(scope.row)">
                                            <i class="el-icon-edit" title="修改"></i>
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
                    <el-input type="password" v-model="addUserForm.upassword" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addUserForm')">确认添加</el-button>                    
                    <el-button @click="cancelDialog()">取消</el-button>
                </el-form-item>
            </el-form>            
        </el-dialog>

        <el-dialog title="密码修改" :visible.sync="updatePWDDialogVisible" class="addDialog" size="tiny">
            <el-form :model="updatepwdForm" :rules="updatepwdRules" ref="updatepwdForm" label-width="100px">
                <el-form-item label="账号">
                    <el-input type="text" v-model="updatepwdForm.uname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="oldupassword">
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
import axios from 'axios'
import $http from '../../utils/http'
import Lockr from 'lockr'
import MD5 from 'js-md5'
import * as user from '../../api/user'
import { getRobotByShop } from '../../api/shop'
import { mapGetters,mapMutations} from 'vuex'
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
            updatePWDDialogVisible:false,
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
            updatepwdForm:{
                uname:'',
                oldupassword:'',
                newupassword:'' 
            },
            updatepwdRules:{                
                oldupassword:[
                    { required: true, message: '请输入原密码', trigger: 'blur' }                    
                ],
                newupassword:[
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: validateNumLetter , trigger:'blur'}
                ]
            },
            accountLists:[],
            middleItem:''
        }
    },
    created(){
        this.getShopInfo();        
        //this.getRobot();
        //this.getShopUser();
    },
    computed:{
        ...mapGetters([
            'shopInfo'
        ]),
        rShopDetailData(){
            return Lockr.get('shopDetailData');
        },
        MD5password(){
            return MD5(this.addUserForm.upassword)
        }
    },
    methods:{
        getShopInfo(){
            
            //this.shop = this.shopInfo;
            console.log(this.rShopDetailData);
            this.shop = this.rShopDetailData;

            this.getShopUser(this.shop.id);
            this.getRobot(this.shop.id);

            // axios.get('/coron-web/shop/getById',{
            //     id:this.$route.params.item
            // }).then(res => {
            //     console.log("hahah",res);
            //     this.shop = res.data.entry;
            // })
        },
        
        getRobot(id){

            getRobotByShop(id).then(res => {
                console.log("店铺里的机器人",res);
                if(res.status){
                    this.equipmentInfos = res.entry;
                }
                
            })

        },

        getShopUser(id){

            user.getShopUser(id).then(res => {
                console.log("当前店铺的用户",res);
                if(res.status){
                    this.accountLists = res.entry;
                }
                
            })
        },

        addUser(){
            this.addUserDialogVisible = true;
        },

        addUserPost(){
            const userData = {
                uname:this.addUserForm.uname,
                upassword: this.MD5password,
                userType:3,
                shopId:this.shop.id
            }

            user.addUser(userData).then(res => {

                if(res.status){
                    this.$message({
                        type:'success',
                        message:'添加成功！'
                    });
                    this.getShopUser(this.shop.id);
                    this.addUserDialogVisible = false;
                } else {
                    this.$message({
                        type:'error',
                        message:res.message
                    })    
                }
                
            })
        },

        delUser(item){
            const delData = {
                userId:item.userId
            };
            user.delUser(delData).then(res => {
                if(res.status){
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    });
                    this.getShopUser(this.shop.id);
                } else {
                    this.$message({
                        type:'error',
                        message:'删除失败'
                    });
                    return false;
                }
            })
        },

        confirmDel(item){
            this.$confirm('确认删除？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'warning'})
            .then(_ => {
                this.delUser(item);
            })
            .catch(_ => {
                this.$message({
                    type:'warning',
                    message:'已取消删除'
                });
            });
        },

        goUpdate(){
            this.$router.push({
                path:'/operation/updateshop'
            })
        },

        goItemList(){
            this.$router.push({
                path:'/operation/itemlist'
            })
        },

        submitForm(formName){
            this.addUserPost();
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        cancelDialog(){
            this.addUserDialogVisible = false;
        },

        updatePassword(item){

            this.updatePWDDialogVisible = true;            
            this.middleItem = item;
            this.updatepwdForm.uname = item.uname;
            
        },

        updatePasswordPost(formName){

            const data = {
                targetUserId:this.middleItem.id,
                oldPassword:this.updatepwdForm.oldupassword,
                newPassword:this.updatepwdForm.newupassword
            };
            
            this.$refs[formName].validate((valid) => {
                
                if (valid) {
                    
                    $http.post('/coron-web/user/updatePassword',data).then(res => {
                
                        if(res.status){
                            console.log("密码修改成功",res);
                        }

                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

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
