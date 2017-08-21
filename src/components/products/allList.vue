<template>
    <div class="item-list">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-form :inline="true" :model="itemsForm">
                        <el-form-item label="状态">
                            <el-select v-model="itemsForm.isSale" placeholder="状态" size="small">
                                <el-option label="全部" value="null"></el-option>
                                <el-option label="未上架" value="0"></el-option>
                                <el-option label="已上架" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品类型">
                            <el-select v-model="itemsForm.itemType" placeholder="商品类型" size="small">
                                <el-option label="单点" value="1"></el-option>
                                <el-option label="套餐" value="2"></el-option>
                                <el-option label="配菜" value="3"></el-option>
                            </el-select>
                        </el-form-item>                        
                        <el-form-item label="">
                            <el-input size="small" placeholder="请输入商品名称" icon="search" v-model="itemsForm.itemName" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" @click="$store.commit('changeStatus','addlist')">添加商品</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-table :data="productsList" ref="multipleTable" tooltip-effect="dark" 
        style="width: 100%" max-height="450">
            <!-- <el-table-column type="selection" width="65">
            </el-table-column> -->
            <!-- <el-table-column type="index" width="55">
            </el-table-column> -->
            <el-table-column prop="itemNameObject.zh" label="商品名称">
            </el-table-column>
            <el-table-column prop="originPrice" sortable label="价格">
            </el-table-column>
            <el-table-column label="商品类别">
                <template scope="scope">
                    <span>{{scope.row.itemType | parseProductType}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column sortable label="出售开始时间">
                <template scope="scope">
                    <span>{{scope.row.timeDurations[0].startTime}}</span>
                </template>
            </el-table-column>
            <el-table-column sortable label="出售结束时间">
                <template scope="scope">
                    <span>{{scope.row.timeDurations[0].endTime}}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="状态">
                <template scope="scope">
                    <span>{{scope.row.isSale | parseIsSale}}</span>
                </template>
            </el-table-column>
            <el-table-column label="图片">
                <template scope="scope">
                    <img :src="scope.row.picUrl" alt="图片" width="50" height="50">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">
                        <i class="el-icon-edit" title="编辑"></i>
                    </el-button>
                    <el-button type="text" size="small" @click="confirmDel(scope.row)">
                        <i class="el-icon-delete" title="删除"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top:10px;">            
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="50">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
import store from '@/store/index';
import axios from 'axios';
export default {
    data() {
        return {
            productsList: [],
            currentPage:2,
            itemsForm:{                
                itemName:'',
                itemType:null,
                busiType:1,   //1点餐系统2民宿3零售
                isSale:null,
                itemNo:'',
                catalogId:null
            },
            formLabelWidth: '120px'
        };
    },
    created() {
        this.getItemList();
    },
    computed: {
        typeName: function () {
            console.log("类型", this.productsList['itemType']);
            return this.productsList['itemType'] == 1 ? '单点' : (this.productsList['itemType'] == 2 ? '套餐' : '配菜');
        }
    },
    methods: {
        handleSizeChange(size){
            console.log(size);
        },

        handleCurrentChange(page){
            console.log(page);
            console.log(this.currentPage);
        },

        getItemList(){

            let getParams = {
                itemName:'',
                itemType:null,
                catalogId:null,
                isSale:0,
                rp:10,
                page:1
            };

            axios.post('/coron-web/item/list',{})
            .then(response => {                
                
                !!response.data.rows && (this.productsList = response.data.rows);
                console.log(this.productsList);

            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问,请刷新页面重试！');                
            })
        },
        //删除菜品
        delItem(item){
            axios.post('/coron-web/item/del',{
                itemId:item.itemId
            }).then(response => {
                console.log(response);
                this.$message({
                    type: 'info',
                    message: '删除成功'
                });
                this.getItemList();
            }).catch(error => {
                console.log(error);
            })
        },

        confirmDel(item) {

            this.$confirm('确定要删除这个菜品吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal:false,
                type: 'warning'
            }).then(() => {

                this.delItem(item);

            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });

            });
        },

        addProduct(status) {
            console.log(store);
        },

        getStatus() {
            //获取状态查询
        },

        getSummaries(param) {

            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = 'N/A';
                }
            });

            return sums;
        },

        onSubmit() {
            console.log('submit!');
        },

        handleIconClick(ev) {
            console.log(ev); 
        },

        handleEdit() {
            console.log(this);
        }

    },
    store
};
</script>
<style scoped>
.el-table th>.cell {
    text-align: center;
}
.item-list {
    padding: 20px 10px;
}
</style>
