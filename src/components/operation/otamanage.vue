<template>
    <div class="robotDancePage">
        <el-form :inline="true" style="text-align:center;">
            <el-form-item>
                <el-button type="primary" @click="otaUpdate()">OTA升级</el-button>
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
            <el-table-column prop="fileSize" label="文件大小">
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
                    <el-button type="primary" size="small" @click="updaterobotDance(scope.row)">修改</el-button>
                    <el-button type="primary" size="small" @click="confirmDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block turn-page" style="margin-top:10px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import $http from '../../utils/http'
export default {
    data() {
        return {
            romLists: [],
            robotDanceDialogVisible: false,
            fileList: [],
            imageUrl: '',
            middleObj: {},
            btnTag: 'add',
            currentPage: 1,
            pageSize: 10,
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
                pageIndex: this.currentPage,
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

        otaUpdate() {
            this.$router.push({
                path: '/operation/otamanage/add'
            });
        },

        delRom(item) {
            $http.post('/coron-web/otarom/delete', {
                romId: item.romId
            }).then(res => {
                console.log(res);
                if(res.status){
                    this.getRomLists();
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
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
