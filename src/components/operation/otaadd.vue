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
            <el-form-item label="文件上传">
                <el-upload drag
                action=""
                ref="romUpload"
                :auto-upload="false"
                :file-list="fileList"               
                :on-change="handleChange">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传.zip文件</div>
                </el-upload>
                <el-progress v-for="(item,index) in test" :key="item" :text-inside="true" :stroke-width="18" :percentage="item" status="success" v-if=" index+1 == test.length"></el-progress>
                <span v-for="(item,index) in test" :key="item">{{item}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="startUpload()">立即升级</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import $http from '../../utils/http'
import OSSUpload from '../../utils/OSSUpload/OSSUpload'
export default {
    data() {
        return {                                   
            otaUpdateForm: {
                romName: 'test',
                romCode: 1,
                romType: 1,
                region: 'JP',
                publishType: 0,
                publishState: 0
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
            middleObj: {},
            myOSSUpload:{},
            percent:0,
            test:[0]
        }
    },
    created() {
        console.log(OSSUpload);
    },
    computed: {
        percentage(){
            return this.percent
        }
    },
    methods: {

        addRobotDance() {
            this.robotDanceDialogVisible = true;
            this.btnTag = 'add';
            this.clearRobotForm();
        },

        beforeRomUpload(file) {            
            
            const isZIP = file.raw.type === 'application/zip';
            const isLt500M = file.raw.size / 1024 / 1024 < 500;

            if (!isZIP) {
                this.$message.error('上传文件只能是 ZIP 格式!');
                return false;
            }
            if (!isLt500M) {
                this.$message.error('上传文件大小不能超过 500MB!');
                return false;
            }
            return isZIP && isLt500M;
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

        handleChange(file,fileList){

            const beforeResult = this.beforeRomUpload(file);
            
            console.log(beforeResult);
            if(fileList.length > 1){                
                this.$message.error("只能上传一个文件！");
                fileList.pop();
                console.log(fileList);
                            
            }

            if(beforeResult){

                if(file.status == 'ready'){                                      

                    this.myOSSUpload = new OSSUpload(file.raw,1);
                }

                if(file.status == 'ready'){

                }

            } else {
                
                this.fileList = [];
                console.log(this.$refs.romUpload);
                
                
            }          

            console.log(file);

        },

        startUpload(){
            var self = this;
            self.myOSSUpload.on('md5',function(md5){

                var data = {
                    romName : self.otaUpdateForm.romName,        
                    romCode : self.otaUpdateForm.romCode,            
                    romType : self.otaUpdateForm.romType,            
                    region : self.otaUpdateForm.region,       
                    publishType : 0,
                    publishState : 0
                };

                self.myOSSUpload.start(data);
            });

            self.myOSSUpload.on('append', function (data) {
                console.log('进度条: ' + data);
                this.percent = parseInt(data*100);
                console.log(this.percentage);
                self.test.push(this.percent);

            });

            self.myOSSUpload.on('finish', function () {
                console.log('完成');
            });

            self.myOSSUpload.init();
        },

        cancelUpload() {
            
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
