<template>
    <div class="ad-info">
        <el-form :inline="true">            
            <el-form-item label="广告类型">
                <el-select v-model="adType" placeholder="请选择广告类型"  @change="getadvertList()">
                    <el-option label="视频广告" value="1"></el-option>
                    <el-option label="图片广告" value="2"></el-option>                    
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="openAddDialog()">添加广告</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="adLists" border style="width: 100%; text-align:center;">      
            <el-table-column prop="advertId" label="广告ID" width="180">
            </el-table-column>
            <el-table-column prop="advertName" label="广告名称" width="180">
            </el-table-column> 
            <el-table-column prop="advertName" label="广告图片展示">
                <template scope="scope">
                    <img :src="baseUrl + scope.row.advertUrlPojo.zh.imgUrl" alt="广告图片" width="50" height="50" style="margin-top:5px;">
                </template>
            </el-table-column> 
            <el-table-column prop="advertType" label="广告类型">
            </el-table-column>
            <el-table-column prop="advertType" label="广告文案">
                <template scope="scope">
                    <span>中文：{{scope.row.advertTextPojo.zh}}</span>
                    <br>
                    <span>英文：{{scope.row.advertTextPojo.en}}</span>
                    <br>
                    <span>日文：{{scope.row.advertTextPojo.jp}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('_global.action')">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="updateAdvert(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="confirmDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block turn-page" style="margin-top:10px;">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
            </el-pagination>
        </div>

        <el-dialog :title=" btnTag == 'add' ? '添加广告':'修改广告'" :visible.sync="addAdvertDialogVisible" class="addDialog">
            <el-form :model="addAdvertForm" :rules="addAdvertFormRules" ref="addAdvertForm" label-width="150px">
                <el-form-item label="展示类型" prop="adType">
                    <el-select v-model="addAdvertForm.adType" placeholder="请选择广告类型"  @change="getadvertList()">
                        <el-option label="视频广告" value="1"></el-option>
                        <el-option label="图片广告" value="2"></el-option>                    
                    </el-select>
                </el-form-item>

                <el-form-item label="广告名称" prop="adName">
                    <el-input type="text" v-model="addAdvertForm.adName" placeholder="请输入广告名称"></el-input>
                </el-form-item>

                <el-form-item label="广告图片" prop="imgUrl">
                    <el-upload class="avatar-uploader" action="/coron-web/upload/advertImgUpload" 
                    :show-file-list="false" 
                    :before-upload="beforeAdvertPicUpload"
                    :on-success="handleAdvertPicSuccess">
                        <img v-if="advertImgUrl" :src="imgUploadSuccessTag ? advertImgUrl : baseUrl + addAdvertForm.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button v-if="advertImgUrl" size="small" type="text" @click="cancelUpload()"> {{$t('_global.delete')}}</el-button>
                </el-form-item>

                <el-form-item label="中文广告词" prop="advertTextZH">
                    <el-input v-model="addAdvertForm.advertTextZH" placeholder="请输入中文广告词"></el-input>
                </el-form-item>

                <el-form-item label="中文广告音频" prop="advertTextZH">
                    <el-upload action="/coron-web/upload/advertMusicUpload" 
                    :before-upload="beforeAdvertAudioUpload"
                    :on-success="handleAdvertAudioSuccessZH"
                    :on-error="handleAdvertAudioErrorZH"                    
                    :on-remove="handleRemove"
                    :file-list="fileListZH">
                        <el-button size="small" type="primary">{{$t('robot.clickUploadMusic')}}</el-button>
                        <div slot="tip" class="el-upload__tip">{{$t('robot.uploadLimit')}}</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="日文广告词" prop="advertTextJP">
                    <el-input v-model="addAdvertForm.advertTextJP" placeholder="请输入日文广告词"></el-input>
                </el-form-item>

                <el-form-item label="日文广告音频">
                    <el-upload action="/coron-web/upload/advertMusicUpload" 
                    :before-upload="beforeAdvertAudioUpload"
                    :on-success="handleAdvertAudioSuccessJP"                    
                    :on-remove="handleRemove"
                    :file-list="fileListJP">
                        <el-button size="small" type="primary">{{$t('robot.clickUploadMusic')}}</el-button>
                        <div slot="tip" class="el-upload__tip">{{$t('robot.uploadLimit')}}</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="英文广告词" prop="advertTextEN">
                    <el-input v-model="addAdvertForm.advertTextEN" placeholder="请输入英文广告词"></el-input>
                </el-form-item>

                <el-form-item label="英文广告音频">
                    <el-upload action="/coron-web/upload/advertMusicUpload" 
                    :before-upload="beforeAdvertAudioUpload"
                    :on-success="handleAdvertAudioSuccessEN"                    
                    :on-remove="handleRemove"
                    :file-list="fileListEN">
                        <el-button size="small" type="primary">{{$t('robot.clickUploadMusic')}}</el-button>
                        <div slot="tip" class="el-upload__tip">{{$t('robot.uploadLimit')}}</div>
                    </el-upload>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="addValidate()">{{$t('_global.confirm')}}</el-button>
                    <el-button type="primary" @click="updateValidate()">修改</el-button>
                    <el-button @click="addAdvertDialogVisible = false">{{$t('_global.cancel')}}</el-button>
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
      adType: "2",
      adLists: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      addAdvertDialogVisible: false,
      btnTag:'add',
      addAdvertForm: {
        adType: "2",
        adName: "",
        imgUrl: "",
        audioUrlZH: "/jp/pic.mp3",
        advertTextZH: "",
        audioUrlEN: "/jp/pic.mp3",
        advertTextEN: "",
        audioUrlJP: "/jp/pic.mp3",
        advertTextJP: ""
      },
      addAdvertFormRules: {
        adName:[
            { required:true , message:'请输入广告名称', trigger:'blur'}
        ],
        imgUrl:[
            { required:true, message:'请选择图片',trigger:'change'}
        ],
        advertTextZH:[
            { required:true , message:'请输入中文广告词', trigger:'blur'},
            { min: 1, max: 200, message: '最多200个字符', trigger: 'blur' }
        ],
        advertTextEN:[
            { required:true , message:'请输入英文广告词', trigger:'blur'},
            { min: 1, max: 200, message: '最多200个字符', trigger: 'blur' }
        ],
        advertTextJP:[
            { required:true , message:'请输入日文广告词', trigger:'blur'},
            { min: 1, max: 200, message: '最多200个字符', trigger: 'blur' }
        ]
      },
      advertImgUrl:'',
      advertAudioUrlZH:'',
      advertAudioUrlEN:'',
      advertAudioUrlJP:'',
      imgUploadSuccessTag:false,
      fileListZH: [],
      fileListEN: [],
      fileListJP: [],
      midddleObj:{}
    };
  },
  created() {
    this.getadvertList();
  },
  computed: {
    baseUrl(){
        return `${window.location.origin}/coron-web/`;
    }
  },
  methods: {
    getadvertList() {
      $http
        .get("/coron-web/advert/list", {
          advertType: this.adType,
          rp: this.pageSize,
          page: this.currentPage
        })
        .then(res => {
          console.log("广告列表", res);
          if(res.status){
              this.adLists = res.rows;
              this.totalItems = res.total;
          } else {
              this.$message({
                  type:'error',
                  message:res.message
              });
          }
          
        });
    },

    handleCurrentChange(page) {            
        this.getadvertList();
    },

    openAddDialog(){
        this.addAdvertDialogVisible = true;
        this.btnTag = 'add';
        this.addAdvertFormReset();
    },
    beforeAdvertPicUpload(file) {

      const isJPGORPNG = file.name.slice(-4) === '.jpg' || file.name.slice(-4) === '.png' || file.name.slice(-5) === '.jpeg';
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPGORPNG) {
        this.$message.error("图片格式不支持请重新上传");
      }
      if (!isLt1M) {
        this.$message.error("图片大小不能超过1M");
      }
      return isJPGORPNG && isLt1M;

    },
    handleAdvertPicSuccess(res, file, fileList) {
        console.log("文件参数",file);
        console.log("上传成功",res);

        if(res.status){
            this.$message({
                type:"success",
                message:"图片上传成功"
            });
            this.imgUploadSuccessTag = true;
            this.advertImgUrl = URL.createObjectURL(file.raw);            
            this.addAdvertForm.imgUrl = res.entry;

        } else {
            this.$message.error('图片上传失败');
        }        
        
    },

    cancelUpload(){
        this.advertImgUrl = '';
        this.addAdvertForm.imgUrl = "";
    },

    beforeAdvertAudioUpload(file){
        
        const isMP3 = file.name.slice(-4) === '.mp3';
        const isLt1M = file.size / 1024 / 1024 < 10;

        if (!isMP3) {
            this.$message.error("音频格式不支持请重新上传");
        }
        if (!isLt1M) {
            this.$message.error("音频大小不能超过1M");
        }
        return isMP3 && isLt1M;
    },

    handleAdvertAudioSuccessZH(res, file, fileList) {

        console.log("音频上传",res);
        this.fileListZH = [];
        this.fileListZH.push(file);
        
        if(res.status){
            this.$message({
                type:"success",
                message:"中文音频上传成功"
            });           

            this.advertAudioUrlZH = res.entry;
        } else {
            this.$message({
                type:'error',
                message:"中文音频上传失败"
            });
        }

    },

    handleAdvertAudioErrorZH(err, file, fileList){
        console.log("中文音频上传失败",err);        
    },

    handleAdvertAudioSuccessEN(res, file, fileList) {

        this.fileListEN = [];
        this.fileListEN.push(file);
        
        if(res.status){
            this.$message({
                type:"success",
                message:"英文音频上传成功"
            });           

            this.advertAudioUrlZH = res.entry;
        } else {
            this.$message({
                type:'error',
                message:"英文音频上传失败"
            });
        }

    },

    handleAdvertAudioSuccessJP(res, file, fileList) {

        this.fileListJP = [];
        this.fileListJP.push(file);
        
        if(res.status){
            this.$message({
                type:"success",
                message:"日文音频上传成功"
            });           

            this.advertAudioUrlZH = res.entry;
        } else {
            this.$message({
                type:'error',
                message:"日文音频上传失败"
            });
        }

    },




    handleRemove(file, fileList) {      
      
    },

    handlePreview(file) {
      console.log(file);
    },

    advertPicUpload() {},

    advertAudioUpload() {},    

    addAdvert() {
      const advertData = {
        advertName: this.addAdvertForm.adName,
        //advertName: "我们要打广告啦",
        advertType: this.addAdvertForm.adType,
        advertTextPojo: {
            zh:this.addAdvertForm.advertTextZH,
            en:this.addAdvertForm.advertTextEN,
            jp:this.addAdvertForm.advertTextJP
        },
        advertUrlPojo: {
            zh:{
                imgUrl:this.addAdvertForm.imgUrl,                
                fileUrl:this.addAdvertForm.audioUrlZH
            },
            en:{
                imgUrl:this.addAdvertForm.imgUrl,                
                fileUrl:this.addAdvertForm.audioUrlEN
            },
            jp:{
                imgUrl:this.addAdvertForm.imgUrl,                
                fileUrl:this.addAdvertForm.audioUrlJP
            }
        }
      };
      

      $http.post('/coron-web/advert/add',advertData).then(res => {          
          if(res.status){
              this.getadvertList();
              this.addAdvertFormReset();
          } else {
              this.$message({
                  type:'error',
                  message:'添加失败'
              })
          }

          this.addAdvertDialogVisible = false;
      })


    },

    addValidate(){

        this.$refs['addAdvertForm'].validate((valid) => {

            if (valid) {
            
            this.addAdvert();

            } else {
            
            this.$message({
                type:'error',
                message: this.$t('tips.rules.error')
            });

            return false;
            }

        });
          
    },

    updateAdvert(item){
        this.btnTag = 'update';
        this.addAdvertDialogVisible = true;
        this.imgUploadSuccessTag = false;
        console.log("更新的参数",item);
        this.midddleObj = item;
        this.addAdvertForm.adName = item.advertName;
        this.addAdvertForm.adType = item.advertType + "";
        this.addAdvertForm.imgUrl = this.advertImgUrl = item.advertUrlPojo.zh.imgUrl;
        this.addAdvertForm.advertTextZH = item.advertTextPojo.zh;
        this.addAdvertForm.advertTextEN = item.advertTextPojo.en;
        this.addAdvertForm.advertTextJP = item.advertTextPojo.jp;
        this.addAdvertForm.advertAudioUrlZH = item.advertUrlPojo.zh.fileUrl;
        this.addAdvertForm.advertAudioUrlEN = item.advertUrlPojo.en.fileUrl;
        this.addAdvertForm.advertAudioUrlJP = item.advertUrlPojo.jp.fileUrl;

    },


    updateAdvertPost(){

        const updateData = {
            advertId:this.midddleObj.advertId,
            advertName: this.addAdvertForm.adName,            
            advertType: this.addAdvertForm.adType,
            advertTextPojo: {
                zh:this.addAdvertForm.advertTextZH,
                en:this.addAdvertForm.advertTextEN,
                jp:this.addAdvertForm.advertTextJP
            },
            advertUrlPojo: {
                zh:{
                    imgUrl:this.addAdvertForm.imgUrl,
                    fileUrl:"/zh/pic.mp3"
                },
                en:{
                    imgUrl:this.addAdvertForm.imgUrl,
                    fileUrl:"/en/pic.mp3"
                },
                jp:{
                    imgUrl:this.addAdvertForm.imgUrl,
                    fileUrl:"/jp/pic.mp3"
                }
            }
        };

        $http.post('/coron-web/advert/update',updateData).then(res => {            

            if(res.status){
                this.$message({
                    type:'success',
                    message:'修改成功'
                });
                this.getadvertList();
            } else {
                this.$message({
                    type:'error',
                    message:res.message
                });
            }

            this.addAdvertDialogVisible = false;
        })
    },

    updateValidate(){
        this.$refs['addAdvertForm'].validate((valid) => {

            if (valid) {
            
                this.updateAdvertPost();

            } else {
            
                this.$message({
                    type:'error',
                    message: this.$t('tips.rules.error')
                });

                return false;
            }

        });

    },

    delAdvert(item){

        $http.post('/coron-web/advert/delete',{
            advertId:item.advertId
        }).then(res => {

            if(res.status){
            
                this.$message({
                    type:'success',
                    message:this.$t('tips.message.delSuccess')
                });
                this.getadvertList();

            } else {
                this.$message({
                    type:'error',
                    message:res.message
                })
            }
        
      })



    },

    confirmDel(item){
        this.$confirm("确定要删除这个广告么？",this.$t('tips.message.hint'),{
            confirmButtonText:this.$t('tips.message.ok'),
            cancelButtonText:this.$t('tips.message.cancel'),
            type:'warning',
        }).then( () => {
            
            this.delAdvert(item);

        }).catch(() => {
            this.$message({
            type:'info',
            message:this.$t('tips.message.canceled')
            });
        })
    },

    addAdvertFormReset(){

        this.addAdvertForm.adName = "";
        this.addAdvertForm.imgUrl = "";
        this.addAdvertForm.advertTextZH = "";
        this.addAdvertForm.advertTextEN = "";
        this.addAdvertForm.advertTextJP = "";
        this.addAdvertForm.advertAudioUrlZH = "";
        this.addAdvertForm.advertAudioUrlEN = "";
        this.addAdvertForm.advertAudioUrlJP = "";
    }
  }
};
</script>

<style scoped>
.ad-info {
  padding: 10px 15px;
  background: #fff;
}

.ad-info p {
  margin: 5px 0;
  line-height: 30px;
}
</style>
