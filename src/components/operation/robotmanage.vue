<template>
  <div class="robotDancePage">
    <el-form :inline="true" style="text-align:center;">
      <!-- <el-form-item label="店铺列表">
        <el-select v-model="selectedShopID" filterable placeholder="请选择" @change="changeShop()">
          <el-option v-for="item in allShopLists" :key="item.id" :label="item.name.zh" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="addRobotDance()">添加舞蹈</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="robotDanceLists" border style="width: 100%; text-align:center;">
      <el-table-column prop="robotDanceId" label="舞蹈编号" width="150">
      </el-table-column>
      <el-table-column label="类型"  width="150">
        <template scope="prop">
          <span v-if="prop.row.type == 1">开机动作</span>
          <span v-if="prop.row.type == 2">控制板列表动作</span>
        </template>
      </el-table-column>
      <el-table-column prop="version" label="版本号">
      </el-table-column>
      <el-table-column prop="motionCodesPojo.zh.danceName" label="舞蹈名称">
      </el-table-column>
      <el-table-column prop="motionCodesPojo.zh.danceCode" label="舞蹈代码">
      </el-table-column>
      <el-table-column label="舞蹈图片">
        <template scope="prop">
          <!-- <img :src="baseUrl + prop.row.motionCodesPojo.zh.danceImg" alt="" width="100" height="100"> -->
          <span>{{prop.row.motionCodesPojo.zh.danceImg}}</span>
        </template>
      </el-table-column>
      <el-table-column label="舞蹈音乐">
        <template scope="prop">
          <!-- <audio :src="baseUrl + prop.row.motionCodesPojo.zh.danceMusic" controls="controls">
            Your browser does not support the audio element.
          </audio> -->
          <span>{{prop.row.motionCodesPojo.zh.danceMusic}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button type="primary" size="small" @click="updaterobotDance(scope.row)">修改</el-button>
          <el-button type="primary" size="small" @click="confirmDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title=" btnTag == 'add' ? '添加舞蹈':'修改舞蹈'" :visible.sync="robotDanceDialogVisible" size="tiny">
      <el-form :model="robotDanceForm" :rules="robotDanceFormRules" ref="robotDanceForm" :label-width="formLabelWidth">
        <el-form-item label="舞蹈名称" prop="danceName">
          <el-input v-model="robotDanceForm.danceName" placeholder="请输入舞蹈中文名称"></el-input>          
        </el-form-item>
        <el-form-item label="舞蹈代码" prop="danceCode">
          <el-input v-model="robotDanceForm.danceCode" placeholder="请输入舞蹈代码"></el-input>
        </el-form-item>
        <el-form-item label="舞蹈类型" prop="type">
          <el-select v-model="robotDanceForm.type">
            <el-option label="开机动作" value="1"></el-option>
            <el-option label="控制板列表动作" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="舞蹈图片" prop="danceImg">
          <el-upload class="avatar-uploader" action="/coron-web/upload/robotDanceImgUpload" 
          :show-file-list="false" 
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">            
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>            
          </el-upload>
          <el-button v-if="imageUrl" size="small" type="text" @click="cancelUpload()"> 删除 </el-button>
        </el-form-item>
        <el-form-item label="舞蹈音乐" prop="danceMusic">
          <el-upload action="/coron-web/upload/robotDanceMusicUpload" 
          :before-upload="beforeMusicUpload"
          :on-success="handleMusicSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList">
            <el-button size="small" type="primary">点击上传音乐</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp3文件，且不超过15MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="robotDanceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRobotDancePost()" v-if="btnTag == 'add'">确定添加</el-button>
        <el-button type="primary" @click="updaterobotDancePost()" v-else>确定修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import $http from '../../utils/http'
export default {
  data() {
    return {
      baseUrl:'http://www.52iwith.com/coron-web/',
      robotDanceLists: [],
      robotDanceDialogVisible: false,
      formLabelWidth: '120px',
      robotDanceForm: {
        danceName: '',
        danceCode: '',
        danceImg: '',
        danceMusic: '',
        type: '1'
      },
      robotDanceFormRules:{
        danceName:[
          { required:true , message:'请输入舞蹈名称', trigger:'blur'}
        ],
        danceCode:[
          { required:true , message:'请输入舞蹈动作代码', trigger:'blur'}
        ],
        danceImg:[
          { required:true , message:'请上传舞蹈动作图片', trigger:'blur'}
        ],
        danceMusic:[
          { required:true , message:'请上传舞蹈动作音乐', trigger:'blur'}
        ]
      },
      imgFilelists:[],
      musicFilelists: [],
      fileList: [],
      imageUrl: '',
      middleObj:{},
      btnTag:'add'
    }
  },
  created() {
    this.getRobotDanceLists();
  },
  computed: {

  },
  methods: {

    getRobotDanceLists() {
      $http.get('/coron-web/robotDance/getByShop').then(res => {
        console.log("舞蹈列表", res);

        if (res.status) {
          this.robotDanceLists = res.entry;
        }

      })
    },

    addRobotDance() {
      this.robotDanceDialogVisible = true;
      this.btnTag = 'add';
      this.clearRobotForm();
    },
    
    beforeAvatarUpload(file) {      

      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' ;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    handleAvatarSuccess(res, file ,fileList) {

      console.log(fileList);

      if(!res.status){
        this.$message.error("上传失败：" + res.message);
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      this.robotDanceForm.danceImg = res.entry;
      console.log(this.imageUrl);
      console.log(this.robotDanceForm.danceImg);
    },

    cancelUpload(){
      this.imageUrl = '';
      this.robotDanceForm.danceImg = '';
    },

    beforeMusicUpload(file){
      
      const isMP3 = file.type === 'audio/mp3';
      const isLt15M = file.size / 1024 /1024 < 15;

      if (!isMP3) {
        this.$message.error('上传舞蹈音乐只能是 MP3 格式!');
      }
      if (!isLt15M) {
        this.$message.error('上传舞蹈音乐大小不能超过 15MB!');
      }
      
      return isMP3 && isLt15M;

    },

    handleMusicSuccess(res, file ,fileList){

      this.fileList = [];
      this.fileList.push(file);

      if(!res.status){
        this.$message.error("上传失败：" + res.message);
      }

      console.log(fileList);
      console.log(file);

      //this.robotDanceForm.danceMusic = URL.createObjectURL(file.raw);
      this.robotDanceForm.danceMusic = file.response.entry;      
      console.log(this.robotDanceForm.danceMusic);

    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
      console.log(file);
    },

    addRobotDancePost(){
      
      this.$refs['robotDanceForm'].validate((valid) => {

        if (valid) {
          
          this.robotDanceAdd();

        } else {
          console.log('error submit!!');
          return false;
        }

      });
    },

    robotDanceAdd(){




      const data = {
        type: this.robotDanceForm.type,
        motionCodesPojo: {
          zh: {
            danceName: this.robotDanceForm.danceName,
            danceCode: this.robotDanceForm.danceCode,
            danceImg: this.robotDanceForm.danceImg,
            danceMusic: this.robotDanceForm.danceMusic
          },
          en: {
            danceName: this.robotDanceForm.danceName,
            danceCode: this.robotDanceForm.danceCode,
            danceImg: this.robotDanceForm.danceImg,
            danceMusic: this.robotDanceForm.danceMusic
          },
          jp: {
            danceName: this.robotDanceForm.danceName,
            danceCode: this.robotDanceForm.danceCode,
            danceImg: this.robotDanceForm.danceImg,
            danceMusic: this.robotDanceForm.danceMusic
          }
        }
      };

      $http.post('/coron-web/robotDance/add', data).then(res => {
        console.log("舞蹈添加", res);
        this.getRobotDanceLists();
        this.robotDanceDialogVisible = false;
      })
    },

    updaterobotDance(item){
      this.robotDanceDialogVisible = true;
      this.btnTag = 'update';
      this.middleObj = item;
      console.log(item);
      this.fileList = [];
      let fileObj = {name:item.motionCodesPojo.zh.danceMusic, url:item.motionCodesPojo.zh.danceMusic};
      this.robotDanceForm.danceName = item.motionCodesPojo.zh.danceName;
      this.robotDanceForm.danceCode = item.motionCodesPojo.zh.danceCode;
      this.robotDanceForm.danceImg = this.imageUrl = item.motionCodesPojo.zh.danceImg;
      this.robotDanceForm.danceMusic = item.motionCodesPojo.zh.danceMusic;
      this.fileList.push(fileObj);

    },

    updaterobotDancePost(){

      const data = {
        robotDanceId:this.middleObj.robotDanceId,
        type: this.robotDanceForm.type,
        motionCodesPojo: {
          zh: {
            danceName: this.robotDanceForm.danceName,
            danceCode: this.robotDanceForm.danceCode,
            danceImg: this.robotDanceForm.danceImg,
            danceMusic: this.robotDanceForm.danceMusic
          }
        }
      };

      $http.post('/coron-web/robotDance/update',data).then(res => {
        console.log(res);

        this.getRobotDanceLists();
        this.robotDanceDialogVisible = false;
      })
    },

    delrobotDance(item){
      $http.post('/coron-web/robotDance/delete',{
        robotDanceId:item.robotDanceId
      }).then(res => {

        console.log("删除成功",res);
        this.getRobotDanceLists();
        this.$message({
          type:'success',
          message:'删除成功'
        })        
        
      })
    },

    confirmDel(item){
      this.$confirm('确定删除当前舞蹈动作么？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
      }).then( () => {
        
        this.delrobotDance(item);

      }).catch(() => {
        this.$message({
          type:'info',
          message:'已取消删除'
        });
      })
    },

    clearRobotForm(){
      this.robotDanceForm.danceName ='';
      this.robotDanceForm.danceCode = '';
      this.robotDanceForm.danceImg = '';
      this.imageUrl = '';
      this.robotDanceForm.danceMusic ='';
      this.musicFilelists = [];
    }

  }
}
</script>


<style>
.robotDancePage {
  padding: 10px 15px;
  background-color: #fff;
}
</style>
