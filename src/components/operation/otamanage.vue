<template>
    <div class="robotDancePage">
        <el-form :inline="true" style="text-align:center;">
            <el-form-item>
                <el-button type="primary" @click="otaAdd()">OTA升级</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="romLists" border style="width: 100%; text-align:center;">
            <el-table-column prop="romId" label="ROM ID">
            </el-table-column>
            <el-table-column prop="romName" label="ROM 名称">
            </el-table-column>
            <el-table-column prop="romCode" label="ROM CODE">
            </el-table-column>
            <el-table-column prop="romType" label="ROM 类型">
                <template scope="scope">
                    <span v-if="scope.row.romType == '1'">full</span>
                    <span v-else>delta</span>
                </template>
            </el-table-column>
            <el-table-column prop="downUrl" label="ROM 下载地址">
            </el-table-column>
            <el-table-column prop="region" label="发布地区">
            </el-table-column>
            <el-table-column prop="fileSize" label="文件大小(byte)">
            </el-table-column>
            <el-table-column prop="uploadState" label="是否上传成功">
                <template scope="scope">
                    <span v-if="scope.row.uploadState">成功</span>
                    <span v-else>失败</span>
                </template>
            </el-table-column>
            <el-table-column prop="uploadSize" label="已上传大小">
            </el-table-column>
            <el-table-column prop="md5" label="MD5">
            </el-table-column>
            <el-table-column prop="publishType" label="发布类型">
                <template scope="scope">
                    <span v-if="scope.row.publishType == '0'">debug</span>
                    <span v-if="scope.row.publishType == '1'">test</span>
                    <span v-if="scope.row.publishType == '2'">release</span>
                </template>
            </el-table-column>
            <el-table-column prop="publishState" label="发布状态">
                <template scope="scope">
                    <span v-if="scope.row.publishState == '0'">testing</span>
                    <span v-else>release</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="otaInfoEdit(scope.row)">修改</el-button>
                    <el-button type="primary" size="small" @click="confirmDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block turn-page" style="margin-top:10px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
            </el-pagination>
        </div>

        <el-dialog title="修改信息" :visible.sync="otaUpdateDialogVisible">
            <el-form :model="otaUpdateForm" ref="otaUpdateForm" label-width="100px" class="otaForm">
                <el-form-item label="ROM名称" prop="romName">
                    <el-input v-model="otaUpdateForm.romName" disabled></el-input>
                </el-form-item>
                <el-form-item label="ROM CODE" prop="romCode">
                    <el-input v-model="otaUpdateForm.romCode" disabled></el-input>
                </el-form-item>
                <el-form-item label="打包类型" prop="romType" >
                    <el-select v-model="otaUpdateForm.romType" placeholder="请选择活动区域" disabled>
                        <el-option label="full" value="1"></el-option>
                        <el-option label="delta" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布地区" prop="region">
                    <el-select v-model="otaUpdateForm.region" placeholder="请选择发布地区" disabled>
                        <el-option label="中国" value="CN"></el-option>
                        <el-option label="日本" value="JP"></el-option>
                        <el-option label="英国" value="GB"></el-option>
                        <el-option label="美国" value="US"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布类型" prop="publishType" >
                    <el-select v-model="otaUpdateForm.publishType" placeholder="请选择发布类型" disabled>
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
                <el-form-item label="文件上传" prop="downUrl">
                    <span>{{otaUpdateForm.downUrl}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="otaUpdate()">立即修改</el-button>
                    <el-button @click="otaUpdateDialogVisible = false">取 消</el-button>
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
            romLists: [],
            otaUpdateForm: {
                romName: '',
                romCode: '1',
                romType: '1',
                region: 'JP',
                publishType: '0',
                publishState: '0',
                downUrl:''
            },
            middleObj:{},
            otaUpdateDialogVisible: false,
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
        this.getRomLists();
    },
    computed: {

    },
    methods: {

        getRomLists() {
            $http.get('/coron-web/otarom/list', {
                page: this.currentPage,
                rp: this.pageSize
            }).then(res => {
                if (res.status) {
                    this.romLists = res.rows;
                    this.totalItems = res.total;
                }
            })
        },

        handleSizeChange(size) {
            console.log(size);
        },
        // 翻页
        handleCurrentChange(page) {            
            this.getRomLists();
        },

        otaInfoEdit(item) {
            this.otaUpdateDialogVisible = true;

            this.middleObj = item;

            this.otaUpdateForm.romName = item.romName;
            this.otaUpdateForm.romCode = item.romCode;
            this.otaUpdateForm.romType = item.romType.toString();
            this.otaUpdateForm.region = item.region;
            this.otaUpdateForm.publishState = item.publishState.toString();
            this.otaUpdateForm.publishType = item.publishType.toString();
            this.otaUpdateForm.downUrl = item.downUrl;
        },

        otaUpdate() {
            const data = {
                romId: this.middleObj.romId,                
                publishState: this.otaUpdateForm.publishState               
            };

            console.log(data);

            $http.post('/coron-web/otarom/update', data).then(res => {
                
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    this.otaUpdateDialogVisible = false;
                    this.getRomLists();
                } else {
                    this.$message.error(res.message);
                }

            })
        },

        otaAdd() {
            this.$router.push({
                path: '/operation/otaadd'
            });
        },

        delRom(item) {
            $http.post('/coron-web/otarom/delete', {
                romId: item.romId
            }).then(res => {
                console.log(res);
                if(res.status){
                    
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getRomLists();
                    
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

                this.delRom(item);

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
.robotDancePage {
    padding: 10px 15px;
}
</style>
