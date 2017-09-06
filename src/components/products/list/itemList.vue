<template>
    <el-row>
        <el-col :sm="6" :md="6" :lg="5">
            <template>
                <div class="catalog-nav" id="catalog-nav">
                    <ul class="catalog-list" id="catalog-list">
                        <li @click="changeSelected(0)" :class="[isActive == 0 ? 'selected' :'']">
                            <a href="javascript:;">全部</a>
                        </li>
                        <li v-for="item in catalogDatas" :key="item.catalogId" @click="changeSelected(item.catalogId)" :class="[isActive == item.catalogId ? 'selected' :'']">
                            <template>
                                <a href="javascript:;" class="inblock" v-text="item.nameObject.zh">
                                </a>
                            </template>
                        </li>
                    </ul>

                </div>
            </template>
        </el-col>
        <el-col :sm="18" :md="18" :lg="19">
            <transition mode="out-in">
                <template>
                    <div class="item-list">
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content bg-purple-dark">
                                    <el-form :inline="true" :model="itemsForm">
                                        <el-form-item label="状态">
                                            <el-select v-model="itemsForm.isSale" placeholder="状态" size="small" @change="getItemList()">
                                                <el-option label="全部" value=""></el-option>
                                                <el-option label="未上架" value="true"></el-option>
                                                <el-option label="已上架" value="false"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="商品类型">
                                            <el-select v-model="itemsForm.itemType" placeholder="商品类型" size="small" @change="getItemList()">
                                                <el-option label="全部" value=""></el-option>
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
                                            <el-button size="small" type="primary" @click="goAdd()">添加商品</el-button>
                                            <el-button size="small" type="primary" @click="goSort()">商品排序</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-col>
                        </el-row>
                        <el-table :data="productsList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" max-height="450">
                            <el-table-column prop="itemNameObject.zh" label="商品名称">
                            </el-table-column>
                            <el-table-column prop="originPrice" sortable label="价格">
                            </el-table-column>
                            <el-table-column label="商品类别">
                                <template scope="scope">
                                    <span>{{scope.row.itemType | parseProductType}}</span>
                                </template>
                            </el-table-column>
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
                                    <el-button type="text" size="small" @click="updateItem(scope.row)">
                                        <i class="el-icon-edit" title="编辑"></i>
                                    </el-button>
                                    <el-button type="text" size="small" @click="confirmDel(scope.row)">
                                        <i class="el-icon-delete" title="删除"></i>
                                    </el-button>
                                    <el-button type="text" size="small" @click="switchSale(scope.row)" v-if="scope.row.isSale">
                                        <i class="el-icon-plus" title="上架"></i>
                                    </el-button>
                                    <el-button type="text" size="small" @click="switchSale(scope.row)" v-if="!scope.row.isSale">
                                        <i class="el-icon-minus" title="下架"></i>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block turn-page" style="margin-top:10px;">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
                            </el-pagination>
                        </div>
                    </div>
                </template>
            </transition>
        </el-col>
    </el-row>
</template>

<script>
import axios from 'axios';
import Lockr from 'lockr';
export default {
    data() {
        return {
            isActive: 0,
            catalogDatas: [],
            productsList: [],
            itemsForm: {
                itemName: '',
                itemType: '',
                busiType: 1,   //1点餐系统2民宿3零售
                isSale: '',
                itemNo: '',
                catalogId: null
            },
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            formLabelWidth: '120px'
        }
    },

    created() {
        //默认获取属性列表
        this.getCatalogList();
        this.getItemList();
    },

    components: {

    },

    computed: {

    },

    mounted: function() {

        //动态计算属性导航的高度
        var catalogNavHeight = document.body.clientHeight - 171;
        document.getElementById("catalog-nav").style.height = catalogNavHeight + 'px';

    },

    methods: {
        //添加 根据当前页面的status 修改 vtitle 的值 
        getCatalogList: function() {
            axios.get('/coron-web/catalog/getCatalogs')
                .then(response => {

                    !!response.data.entry && (this.catalogDatas = response.data.entry);

                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },

        changeSelected: function(itemId) {
            console.log(itemId);
            this.isActive = itemId;
            this.getItemList();

        },

        handleSizeChange(size) {
            console.log(size);
        },
        // 翻页
        handleCurrentChange(page) {
            console.log(page);
            console.log(this.currentPage);
            this.getItemList();
        },

        getItemList() {

            let getParams = {
                itemType: this.itemsForm.itemType,
                isSale: this.itemsForm.isSale,
                rp: 10,
                page: this.currentPage,
                catalogId: !!this.isActive ? this.isActive : null
            };

            axios.post('/coron-web/item/list', getParams)
                .then(response => {

                    !!response.data.rows && (this.productsList = response.data.rows);
                    this.totalItems = response.data.total;
                    console.log(this.productsList);

                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问,请刷新页面重试！');
                })
        },

        updateItem(item) {
            console.log("更新数据", item);
            Lockr.set("itemUpdateData", item);
            this.$router.push({
                path: '/products/update'
            });

        },
        //删除菜品
        delItem(item) {
            axios.post('/coron-web/item/del', {
                itemId: item.itemId
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
                closeOnClickModal: false,
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

        switchSale(item) {

            axios.post('/coron-web/item/switchSale', {
                itemId: item.itemId,
                isSale: !item.isSale
            }).then(response => {
                console.log(response);
                this.$message({
                    type: 'info',
                    message: '状态更新成功'
                });
                this.getItemList();
            }).catch(error => {
                console.log(error);
                this.$message({
                    type: 'error',
                    message: '状态更新失败'
                });
            })
        },

        handleIconClick(ev) {
            console.log(ev);
            console.log(this.itemsForm.itemName)
        },

        goAdd() {
            this.$router.push({
                path: '/products/add'
            })
        },

        goSort() {
            this.$router.push({
                path: '/products/sort'
            })
        }

    }

}
</script>

<style scoped>
.el-col {
    text-align: center;
}

.material-icons {
    font-size: 80px;
    color: #ddd;
}

.box-card {
    height: 110px;
}

.cart-string {
    height: 100px;
    padding-top: 10px;
    font-size: 1.1rem;
}

.box-list {
    height: auto;
    text-align: left;
}

.box-list hr {
    height: 1px;
    border: none;
    border-top: 1px dashed #ccc;
    margin-bottom: 5px;
    margin-top: 6px;
}

.content-list {
    border: 1px solid #ccc;
    background-color: #fff;
}


.catalog-nav {
    border-right: 1px solid #ccc;
    padding-top: 20px;
}

ul.catalog-list {
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0;
}

ul.catalog-list li {
    height: 42px;
    line-height: 42px;
    padding: 0 18px;
}

ul.catalog-list li a {
    color: #6B6B6B;
}

ul.catalog-list li.selected {
    border-left: 5px solid #20A0FF;
    background-color: rgba(242, 242, 242, 1);
}

.el-table th>.cell {
    text-align: center;
}

.item-list {
    padding: 20px 10px;
}

.turn-page {
    margin-top: 10px;
}
</style>
