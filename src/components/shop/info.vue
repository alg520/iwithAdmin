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
                                <el-table-column label="操作" width="100">
                                    <template scope="scope">                                                                       
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
import * as userApi from '../../api/user'
import { getRobotByShop } from '../../api/shop'
import { mapGetters,mapMutations,mapActions} from 'vuex'
import Lockr from 'lockr'
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
                    { min: 6, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
                    { validator: validateNumLetter , trigger:'blur'}
                ],
                upassword:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: validateNumLetter , trigger:'blur'}
                ]
            },
            accountLists:[]
        }
    },
    created(){
        this.getLoginInfo();        
        this.getRobot();
        this.getShopUser();               
    },
    computed:{
        ...mapGetters([
            'user'
        ])
    },
    methods:{
        getLoginInfo(){
            userApi.getLoginUser().then(res => {                
                this.shop = res.entry.shop;                
                this.shopname = res.entry.shop.name.zh;
            });
        },

        getUserList(){            
            userApi.getUserList({}).then(res => {
                console.log("用户列表",res);                
            })
        },

        getRobot(){
            getRobotByShop().then(res => {
                console.log("店铺里的机器人",res);
                this.equipmentInfos = res.entry;
            })
        },

        getShopUser(){
            userApi.getShopUser().then(res => {
                console.log("当前店铺的用户",res);
                this.accountLists = res.entry;
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

            userApi.addUser(userData).then(res => {

                if(res.status){
                    this.$message({
                        type:'success',
                        message:'添加成功！'
                    });
                    this.getShopUser();
                    this.addUserDialogVisible = false;
                } else {
                    this.$message({
                        type:'error',
                        message:res.cnMessage
                    })    
                }
                
            })
        },

        delUser(item){
            const delData = {
                userId:item.userId
            };
            userApi.delUser(delData).then(res => {
                if(res.status){
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    });
                    this.getShopUser();
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

        submitForm(formName){
            this.addUserPost();
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        cancelDialog(){
            this.addUserDialogVisible = false;
        },

        ...mapMutations({
            getUser:'GET_USER',
            setUserList:'SET_USERLIST'
        }),

        ...mapActions({
            vxGetLoginInfo:'GetLoginInfo'
        })
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
