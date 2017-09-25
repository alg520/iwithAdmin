<template>
    <div class="apkmanagePage">
        <el-form :inline="true" style="text-align:center;">
            <el-form-item>
                <el-button type="primary" @click="apkAdd()">APK升级</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="apkLists" border style="width: 100%; text-align:center;">
            <el-table-column prop="id" label="APP版本ID">
            </el-table-column>
            <el-table-column prop="name" label="APP 名称">
            </el-table-column>           
            <el-table-column prop="type" label="APP 类型">
                <template scope="scope">
                    <span v-if="scope.row.type == '1'">店员app</span>
                    <span v-else>控制版app</span>
                </template>
            </el-table-column>
            <el-table-column prop="downUrl" label="下载地址">
            </el-table-column>
            <el-table-column prop="region" label="发布地区">
            </el-table-column>
            <el-table-column prop="fileSize" label="文件大小(byte)">
            </el-table-column>
            <el-table-column prop="md5" label="MD5">
            </el-table-column> 
            <el-table-column prop="uploadState" label="上传状态">
                <template scope="scope">
                    <span v-if="scope.row.uploadState == 1">上传完成</span>
                    <span v-else>正在上传</span>
                </template>
            </el-table-column>
            <el-table-column prop="publishType" label="发布类型">
                <template scope="scope">
                    <span v-if="scope.row.publishType == 0">debug</span>
                    <span v-if="scope.row.publishType == 1">test</span>
                    <span v-if="scope.row.publishType == 2">release</span>                    
                </template>
            </el-table-column>
            <el-table-column prop="publishState" label="发布状态">
                <template scope="scope">
                    <span v-if="scope.row.publishState == 0">testing</span>
                    <span v-else>release</span>
                </template>
            </el-table-column>
            <el-table-column prop="publishDate" label="上传时间">                
            </el-table-column>
            <el-table-column prop="remark" label="备注">                
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="apkInfoEdit(scope.row)">修改</el-button>
                    <el-button type="primary" size="small" @click="confirmDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block turn-page" style="margin-top:10px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
            </el-pagination>
        </div>

        <el-dialog :title=" btnTag == 'add' ? '添加舞蹈':'修改舞蹈'" :visible.sync="apkUpdateDialogVisible">
            <el-form :model="apkUpdateForm" ref="apkUpdateForm" label-width="100px" class="otaForm">            
            <el-form-item label="APK名称" prop="name">
                <el-input v-model="apkUpdateForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="APK CODE" prop="code">
                <el-input v-model="apkUpdateForm.code" disabled></el-input>
            </el-form-item>
            <el-form-item label="打包类型" prop="type">
                <el-select v-model="apkUpdateForm.type" placeholder="请选择打包类型" disabled>
                    <el-option label="full" value="1"></el-option>
                    <el-option label="delta" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布地区" prop="region">
                <el-select v-model="apkUpdateForm.region" placeholder="请选择发布地区" disabled>
                    <el-option label="中国" value="CN"></el-option>
                    <el-option label="日本" value="JP"></el-option>
                    <el-option label="英国" value="GB"></el-option>
                    <el-option label="美国" value="US"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布类型" prop="publishType">
                <el-select v-model="apkUpdateForm.publishType" placeholder="请选择发布类型">
                    <el-option label="debug" value="0"></el-option>
                    <el-option label="test" value="1"></el-option>
                    <el-option label="release" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布状态" prop="publishState">
                <el-select v-model="apkUpdateForm.publishState" placeholder="请选择发布状态">
                    <el-option label="testing" value="0"></el-option>
                    <el-option label="release" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件上传" prop="downUrl">
                <span>{{apkUpdateForm.downUrl}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="apkUpdate()">立即修改</el-button>
                <el-button @click="apkUpdateDialogVisible = false">取 消</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
    </div>
</template>

<script>
import $http from '../../utils/http'
export default {
    data() {
        return {
            apkLists: [],
            apkUpdateForm:{
                name: '',
                code: '1',
                type: '1',
                region: 'JP',
                publishType: '0',
                publishState: '0',
                downUrl:''
            },
            apkUpdateDialogVisible: false,
            fileList: [],
            imageUrl: '',
            middleObj: {},
            btnTag: 'add',
            currentPage: 1,
            pageSize: 8,
            totalItems: 0
        }
    },
    created() {
        this.getAPKLists();
    },
    computed: {

    },
    methods: {

        getAPKLists() {
            $http.post('/coron-web/apk/list', {
                page: this.currentPage,
                rp: this.pageSize
            }).then(res => {
                if (res.status) {
                    this.apkLists = res.rows;
                    this.totalItems = res.total;
                }
            })
        },

        handleSizeChange(size) {
            console.log(size);
        },
        // 翻页
        handleCurrentChange(page) {            
            this.getAPKLists();
        },

        apkInfoEdit(item){
            this.apkUpdateDialogVisible = true;

            this.middleObj = item;

            this.apkUpdateForm.name = item.name;
            this.apkUpdateForm.code = item.code;
            this.apkUpdateForm.type = item.type.toString();
            this.apkUpdateForm.region = item.region;
            this.apkUpdateForm.publishState = item.publishState.toString();
            this.apkUpdateForm.publishType = item.publishType.toString();
            this.apkUpdateForm.downUrl = item.downUrl;
        },

        apkUpdate(){
            const data = {
                id:this.middleObj.id,
                name:this.middleObj.name,
                code:this.middleObj.code,
                type:this.middleObj.type,
                publishState:this.apkUpdateForm.publishState,
                publishType:this.apkUpdateForm.publishType
            };

            console.log(data);

            $http.post('/coron-web/apk/update',data).then(res => {
                console.log("修改成功",res);
                if(res.status){
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    });
                    this.apkUpdateDialogVisible = false;
                    this.getAPKLists();
                }
                
            })
        },

        apkAdd() {
            this.$router.push({
                path: '/operation/apkadd'
            });
        },

        delAPK(item) {
            $http.post('/coron-web/apk/del', {
                id: item.id
            }).then(res => {
                console.log(res);
                if(res.status){
                    
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getAPKLists();
                    
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败'
                    })
                }               

            })
        },

        confirmDel(item) {
            this.$confirm('确定删除这条ROM记录么？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {

                this.delAPK(item);

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        }

    }
}
</script>


<style>
.apkmanagePage {
    padding: 10px 15px;
}
</style>
