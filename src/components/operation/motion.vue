<template>
    <div class="monrion-info">
        <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="openAddDialog()">添加动作</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="motionLists" border style="width: 100%; text-align:center;">      
            <el-table-column prop="motionId" label="动作ID" width="180">
            </el-table-column>            
            <el-table-column prop="motionCode" label="动作编号">                
            </el-table-column>            
            <el-table-column prop="advertType" label="动作名称">
                <template scope="scope">
                    <span>中文：{{scope.row.motionNamePojo.zh}}</span>
                    <br>
                    <span>英文：{{scope.row.motionNamePojo.en}}</span>
                    <br>
                    <span>日文：{{scope.row.motionNamePojo.jp}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('_global.action')">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="updateMotion(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="confirmDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title=" btnTag == 'add' ? '添加动作':'修改动作'" :visible.sync="addMotionDialogVisible" class="addDialog">
            <el-form :model="addMotionForm" :rules="addMotionFormRules" ref="addMotionForm" label-width="150px">                

                <el-form-item label="动作编号" prop="motionCode">
                    <el-input type="text" v-model="addMotionForm.motionCode" placeholder="请输入动作编号"></el-input>
                </el-form-item>

                <el-form-item label="中文动作名称" prop="motionNameZH">
                    <el-input v-model="addMotionForm.motionNameZH" placeholder="请输入中文动作名称"></el-input>
                </el-form-item>

                <el-form-item label="日文动作名称" prop="motionNameJP">
                    <el-input v-model="addMotionForm.motionNameJP" placeholder="请输入日文动作名称"></el-input>
                </el-form-item>                

                <el-form-item label="英文动作名称" prop="motionNameEN">
                    <el-input v-model="addMotionForm.motionNameEN" placeholder="请输入英文动作名称"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="addValidate()">{{$t('_global.confirm')}}</el-button>
                    <el-button type="primary" @click="updateValidate()">修改</el-button>
                    <el-button @click="addMotionDialogVisible = false">{{$t('_global.cancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import $http from "../../utils/http";
import Lockr from "lockr";
import MD5 from "js-md5";
export default {
  data() {
    return {      
      motionLists: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      addMotionDialogVisible: false,
      btnTag:'add',
      addMotionForm: {
        motionCode:"",
        motionNameZH:"",
        motionNameJP:"",
        motionNameEN:""        
      },
      addMotionFormRules: {
        motionCode:[
            { required:true , message:'请输入动作编号', trigger:'blur'}
        ],        
        motionNameZH:[
            { required:true , message:'请输入中文动作名称', trigger:'blur'},
            { min: 1, max: 200, message: '最多200个字符', trigger: 'blur' }
        ],
        motionNameEN:[
            { required:true , message:'请输入英文动作名称', trigger:'blur'},
            { min: 1, max: 200, message: '最多200个字符', trigger: 'blur' }
        ],
        motionNameJP:[
            { required:true , message:'请输入日文动作名称', trigger:'blur'},
            { min: 1, max: 200, message: '最多200个字符', trigger: 'blur' }
        ]
      },
      midddleObj:{}
    };
  },
  created() {
    this.getRobotMotionList();
  },
  computed: {
    baseUrl(){
        return `${window.location.origin}/coron-web/`;
    }
  },
  methods: {
    getRobotMotionList() {
      $http
        .get("/coron-web/robotMotion/list", {          
          rp: this.pageSize,
          page: this.currentPage
        })
        .then(res => {
          
          if(res.status){
              this.motionLists = res.rows;
              this.totalItems = res.total;
          } else {
              this.$message({
                  type:'error',
                  message:res.message
              });
          }
          
        });
    },

    openAddDialog(){
        this.addMotionDialogVisible = true;
        this.btnTag = 'add';
        this.addMotionFormReset();
    },
    addMotion() {
      const motionData = {
        motionCode: this.addMotionForm.motionCode,
        motionNamePojo: {
            zh:this.addMotionForm.motionNameZH,
            en:this.addMotionForm.motionNameEN,
            jp:this.addMotionForm.motionNameJP
        }
      };      

      $http.post('/coron-web/robotMotion/add',motionData).then(res => {          
          if(res.status){
              this.$message({
                  type:'success',
                  message:'添加成功'
              })
              this.getRobotMotionList();
              this.addMotionFormReset();
          } else {
              this.$message({
                  type:'error',
                  message:'添加失败'
              })
          }

          this.addMotionDialogVisible = false;
      })


    },

    addValidate(){

        this.$refs['addMotionForm'].validate((valid) => {

            if (valid) {
            
            this.addMotion();

            } else {
            
            this.$message({
                type:'error',
                message: this.$t('tips.rules.error')
            });

            return false;
            }

        });
          
    },

    updateMotion(item){
        this.btnTag = 'update';
        this.addMotionDialogVisible = true;
        console.log("更新的参数",item);
        this.midddleObj = item;
        this.addMotionForm.motionCode = item.motionCode;
        this.addMotionForm.motionNameZH = item.motionNamePojo.zh;
        this.addMotionForm.motionNameEN = item.motionNamePojo.en;
        this.addMotionForm.motionNameJP = item.motionNamePojo.jp;
    },


    updateMotiontPost(){

        const updateData = {
            motionId:this.midddleObj.motionId,
            motionCode: this.addMotionForm.motionCode,
            motionNamePojo: {
                zh:this.addMotionForm.motionNameZH,
                en:this.addMotionForm.motionNameEN,
                jp:this.addMotionForm.motionNameJP
            }            
        };

        $http.post('/coron-web/robotMotion/update',updateData).then(res => {            
            
            if(res.status){
                this.$message({
                    type:'success',
                    message:'修改成功'
                });

                this.addMotionDialogVisible = false;
                this.getRobotMotionList();
            } else {
                this.$message({
                    type:'error',
                    message:res.message
                });
            }


            this.addMotionDialogVisible = false;


        })
    },

    updateValidate(){
        this.$refs['addMotionForm'].validate((valid) => {

            if (valid) {
            
                this.updateMotiontPost();

            } else {
            
                this.$message({
                    type:'error',
                    message: this.$t('tips.rules.error')
                });

                return false;
            }

        });

    },

    delMotion(item){

        $http.post('/coron-web/robotMotion/delete',{
            motionId:item.motionId
        }).then(res => {

            if(res.status){
            
                this.$message({
                    type:'success',
                    message:this.$t('tips.message.delSuccess')
                });
                this.getRobotMotionList();

            } else {
                this.$message({
                    type:'error',
                    message:res.message
                })
            }
        
      })



    },

    confirmDel(item){
        this.$confirm("确定要删除这个动作么？",this.$t('tips.message.hint'),{
            confirmButtonText:this.$t('tips.message.ok'),
            cancelButtonText:this.$t('tips.message.cancel'),
            type:'warning',
        }).then( () => {
            
            this.delMotion(item);

        }).catch(() => {
            this.$message({
            type:'info',
            message:this.$t('tips.message.canceled')
            });
        })
    },

    addMotionFormReset(){

        this.addMotionForm.motionCode = "";        
        this.addMotionForm.motionNameZH = "";
        this.addMotionForm.motionNameJP = "";
        this.addMotionForm.motionNameEN = "";
        
    }
  }
};
</script>

<style scoped>
.monrion-info {
  padding: 10px 15px;
  background: #fff;
  text-align: center;
}

.monrion-info p {
  margin: 5px 0;
  line-height: 30px;
}
</style>
