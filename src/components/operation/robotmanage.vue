<template>
  <div class="robotDancePage">
    <el-form :inline="true">
      <!-- <el-form-item label="店铺列表">
        <el-select v-model="selectedShopID" filterable placeholder="请选择" @change="changeShop()">
          <el-option v-for="item in allShopLists" :key="item.id" :label="item.name.zh" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="addRobotDance()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="robotDanceLists" border style="width: 100%; text-align:center;">
      <el-table-column prop="robotDanceId" label="舞蹈编号" width="180">
      </el-table-column>
      <el-table-column prop="type" label="类型">
      </el-table-column>
      <el-table-column prop="version" label="版本号">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button type="primary" size="small" @click="getDetailTrade(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加舞蹈" :visible.sync="robotDanceDialogVisible" size="tiny">
      <el-form :model="robotDanceForm">
        <el-form-item label="舞蹈名称" :label-width="formLabelWidth">
          <el-input v-model="robotDanceForm.danceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="舞蹈代码" :label-width="formLabelWidth">
          <el-input v-model="robotDanceForm.danceCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="舞蹈类型" :label-width="formLabelWidth">
          <el-select v-model="robotDanceForm.type">
            <el-option label="开机动作" value="1"></el-option>
            <el-option label="控制板列表动作" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="舞蹈图片" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action="/coron-web/upload/robotDanceImgUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="舞蹈音乐" :label-width="formLabelWidth">
          <el-upload class="upload-demo" action="/coron-web/upload/robotDanceMusicUpload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="robotDanceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="robotDanceDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import $http from '../../utils/http'
export default {
  data() {
    return {
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
      fileList: [],
      imageUrl: ''
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
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }


  }
}
</script>


<style>
.robotDancePage {
  padding: 10px 15px;
}
</style>
