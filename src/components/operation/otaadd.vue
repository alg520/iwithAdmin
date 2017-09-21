<template>
    <div class="ota-add-page">
        <el-form :model="otaUpdateForm" :rules="otaUpdateFormRules" ref="otaUpdateForm" label-width="100px" class="otaForm">            
            <el-form-item label="ROM名称" prop="romName">
                <el-input v-model="otaUpdateForm.romName"></el-input>
            </el-form-item>
            <el-form-item label="ROM CODE" prop="romCode">
                <el-input v-model="otaUpdateForm.romCode"></el-input>
            </el-form-item>
            <el-form-item label="打包类型" prop="romType">
                <el-select v-model="otaUpdateForm.romType" placeholder="请选择活动区域">
                    <el-option label="full" value="1"></el-option>
                    <el-option label="delta" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布地区" prop="region">
                <el-select v-model="otaUpdateForm.region" placeholder="请选择发布地区">
                    <el-option label="中国" value="CN"></el-option>
                    <el-option label="日本" value="JP"></el-option>
                    <el-option label="英国" value="GB"></el-option>
                    <el-option label="美国" value="US"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布类型" prop="publishType">
                <el-select v-model="otaUpdateForm.publishType" placeholder="请选择发布类型">
                    <el-option label="debug" value="0"></el-option>
                    <el-option label="test" value="1"></el-option>
                    <el-option label="release" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布状态" prop="publishState">
                <el-select v-model="otaUpdateForm.publishState" placeholder="请选择发布状态">
                    <el-option label="testing" value="0"></el-option>
                    <el-option label="release" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布状态" prop="publishState">
                <el-upload drag 
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                :before-upload="beforeRomUpload"
                multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传.zip/.tar文件</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">立即升级</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import $http from '../../utils/http'
export default {
    data() {
        return {                                   
            otaUpdateForm: {
                romName: '',
                romCode: '',
                romType: '1',
                region: 'JP',
                publishType: '0',
                publishState: '0'
            },
            otaUpdateFormRules: {
                romName: [
                    { required: true, message: '请输入舞蹈名称', trigger: 'blur' }
                ],
                romCode: [
                    { required: true, message: '请输入舞蹈动作代码', trigger: 'blur' }
                ],
                danceImg: [
                    { required: true, message: '请上传舞蹈动作图片', trigger: 'blur' }
                ],
                danceMusic: [
                    { required: true, message: '请上传舞蹈动作音乐', trigger: 'blur' }
                ]
            },            
            fileList: [],            
            middleObj: {}            
        }
    },
    created() {
        
    },
    computed: {

    },
    methods: {

        addRobotDance() {
            this.robotDanceDialogVisible = true;
            this.btnTag = 'add';
            this.clearRobotForm();
        },

        beforeRomUpload(file) {

            console.log(file);

            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        handleAvatarSuccess(res, file, fileList) {

            console.log(fileList);

            if (!res.status) {
                this.$message.error("上传失败：" + res.message);
            }
            this.imageUrl = URL.createObjectURL(file.raw);
            this.robotDanceForm.danceImg = res.entry;
            console.log(this.imageUrl);
            console.log(this.robotDanceForm.danceImg);
        },

        cancelUpload() {
            this.imageUrl = '';
            this.robotDanceForm.danceImg = '';
        }

    }
}
</script>


<style>
.ota-add-page {
    padding: 10px 15px;
}
.otaForm {
    width: 60%;
    margin: 0 auto;
}
</style>
