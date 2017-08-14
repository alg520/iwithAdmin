<template>
    <div class="catalog-nav" id="catalog-nav">
        <ul class="catalog-list" id="catalog-list">
            <li class="selected">
                <a href="javascript:;">全部</a>
            </li>
            <li v-for="item in catalogDatas" :key="item.catalogId">
                <template v-if="updateCataloginputVisible == item.catalogId">
                    <el-input size="small" placeholder="请输入菜品分类" icon="close" v-model="catalogNameUpdate" :on-icon-click="cancelUpdate" style="width:80%;">
                    </el-input>
                    <el-button type="primary" icon="plus" size="small" @click="updateCatalogPost(item)"></el-button>
                </template>
                <template v-else>
                    <a href="javascript:;" class="inblock" v-text="item.nameObject.zh">
                    </a>
                    <span class="pull-right">
                        <el-button type="text" size="small" @click="updateCatalog(item)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button type="text" size="small" @click="confirmDel(item)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </span> 
                </template>    
            </li>
            <li v-if="cataloginputVisible">
                <el-input size="small" icon="close" placeholder="请输入菜品分类" :on-icon-click="cancelUpdate" v-model="catalogName" style="width:80%;">
                </el-input>
                <el-button type="primary" icon="plus" size="small" @click="addCatalogPost()"></el-button>
            </li>
            <li v-else>
                <el-button type="primary" icon="plus" size="small" @click="addCatalog()">添加目录</el-button>
            </li>
        </ul>
    
    </div>
</template>

<script>
import axios from 'axios';
// import api from '@/utils/api';
// import http from '@/utils/http';
export default {
    data() {
        return {
            isActive:true,
            cataloginputVisible: false,
            updateCataloginputVisible: 0,
            catalogName: '',
            catalogNameUpdate: '',
            catalogDatas: [],
            shopId: '',
            rules: {
                catalogName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        //默认获取属性列表
        this.getCatalogList();
    },
    computed: {

    },
    mounted: function () {

        //动态计算属性导航的高度
        var catalogNavHeight = document.body.clientHeight - 171;
        document.getElementById("catalog-nav").style.height = catalogNavHeight + 'px';

    },
    methods: {
        getCatalogList: function () {
            axios.get('/coron-web/catalog/getCatalogs')
                .then(response => {

                    console.log(response);

                    !!response.data.entry && (this.catalogDatas = response.data.entry) && (this.shopId = response.data.entry[0].shopId);

                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },

        addCatalog: function () {
            this.cataloginputVisible = true;
            this.updateCataloginputVisible = 0;
        },

        addCatalogPost: function () {
            //添加的时候需要 商铺id 和 属性名称
            // 商铺id 需要获取列表的时候 就要保存起来
            let params = {
                isDelete: false,
                type: 2,
                parentId: 11,
                shopId: this.shopId,
                isVisible: true,
                seq: 1,
                busiType: 1,
                nameObject: { "zh": this.catalogName },
            };

            if (this.catalogName == '') {

                this.$message({
                    type: 'info',
                    message: '要添加的分类名不能为空！'
                });

            } else {
                
                axios.post("/coron-web/catalog/add", params).then(response => {

                    this.cancelUpdate();
                    this.getCatalogList();

                }).catch(error => {

                    console.log(error);

                })
            }

        },

        updateCatalog: function (item) {
            
            this.updateCataloginputVisible = item.catalogId;
            this.cataloginputVisible = false;
            this.catalogNameUpdate = item.nameObject.zh;

        },

        updateCatalogPost: function (item) {
            //更新列表请求
            
            let updateParams = {
                catalogId: item.catalogId,
                nameObject: { "zh": this.catalogNameUpdate },
                isVisible: item.isVisible,
                seq: item.seq
            };

            if (item.catalogNameUpdate == '') {
                this.$message({
                    type: 'info',
                    message: '分类名不能为空！'
                });
            } else {
                axios.post("/coron-web/catalog/update", updateParams).then(response => {
                    
                    if (response.statusText == 'OK') {
                        this.$message({
                            type: 'info',
                            message: '更新成功'
                        });
                    }
                    this.getCatalogList();
                    this.cancelUpdate();

                }).catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'info',
                        message: error
                    });
                })
            }

        },

        cancelUpdate: function (item) {
            this.updateCataloginputVisible = 0;
            this.cataloginputVisible = false;
            this.catalogName = '';
        },

        delCatalog: function (item) {
            axios.post('/coron-web/catalog/del', { catalogId: item.catalogId }).then(response => {

                if(response.data.status == true){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getCatalogList();
                } else {
                    
                    this.$message({
                        type:'error',
                        message:response.data.message
                    })
                }                

            }).catch(error => {
                console.log(error);
            })
        },

        confirmDel(item) {
            this.$confirm('当前分类不为空的时候不允许删除,请先删除分类下的商品,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal:false,
                type: 'warning'
            }).then(() => {

                this.delCatalog(item);

            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });

            });
        },

        changeSelected:function(){

        }
    }
}
</script>

<style>
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

li.selected {
    border-left: 5px solid #20A0FF;
    background-color: rgba(242, 242, 242, 1);
}

</style>
