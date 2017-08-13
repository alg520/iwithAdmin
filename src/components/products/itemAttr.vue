<template>
    <div class="attr-nav" id="attr-nav">
        <ul class="attr-list" id="attr-list">
            <li class="selected">
                <a href="javascript:;">全部</a>
            </li>
            <li v-for="item in itemAttrDatas" :key="item.itemAttrId">
                <template v-if="updateattrinputVisible == item.itemAttrId">
                    <el-input
                        size="small"
                        placeholder="请输入菜品分类"
                        icon="close"
                        v-model="attrNameUpdate"
                        :on-icon-click="cancelUpdate" style="width:80%;">
                    </el-input>
                    <el-button type="primary" icon="plus" size="small" @click="updateAttrPost(item)"></el-button>                    
                </template>
                <template v-else>
                    <a href="javascript:;" class="inblock" v-text="item.attrNameObject.zh">
                    </a>
                    <span class="pull-right">
                        <el-button type="text" size="small" @click="updateAttr(item)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button type="text" size="small" @click="confirmDel(item)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </span>
                </template>
    
            </li>
            <li v-if="attrinputVisible">
                <el-input 
                size="small" 
                icon="close" 
                placeholder="请输入菜品分类"
                :on-icon-click="cancelUpdate" 
                v-model="attrName" 
                style="width:80%;">
                </el-input>
                <el-button type="primary" icon="plus" size="small" @click="addAttrPost()"></el-button>
            </li>
            <li v-else>
                <el-button type="primary" icon="plus" size="small" @click="addAttr()">添加分类</el-button>
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
            attrinputVisible: false,
            updateattrinputVisible: 0,
            attrName: '',
            attrNameUpdate:'', 
            itemAttrDatas: [],
            shopId:''
        }
    },
    created() {
        //默认获取属性列表
        this.getItemAttrList();
    },
    computed: {
        
    },
    mounted: function () {

        //动态计算属性导航的高度
        var attrNavHeight = document.body.clientHeight - 171;
        document.getElementById("attr-nav").style.height = attrNavHeight + 'px';

    },
    methods: {
        getItemAttrList:function(){
            axios.get('/coron-web/itemAttr/list')
            .then(response => {

                !!response.data.rows && (this.itemAttrDatas = response.data.rows) && (this.shopId = response.data.rows[0].shopId);

            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            })
        },

        addAttr: function () {
            this.attrinputVisible = true;
            this.updateattrinputVisible = 0;
        },

        addAttrPost:function(){
            //添加的时候需要 商铺id 和 属性名称
            // 商铺id 需要获取列表的时候 就要保存起来
            let params = {
                shopId:this.shopId,
                attrNameObject:{"zh":this.attrName}
            };

            console.log(params);

            axios.post("/coron-web/itemAttr/add",params).then( response => {
                
                console.log(response);
                this.cancelUpdate();
                this.getItemAttrList();

            }).catch(error => {
                
                console.log(error);

            })
        },

        updateAttr: function (item) {
            
            this.updateattrinputVisible = item.itemAttrId;
            this.attrinputVisible = false;

            this.attrNameUpdate = item.attrNameObject.zh;
            
        },

        updateAttrPost:function(item){
            //更新列表请求

            console.log(item);

            let updateParams = {
                itemAttrId:item.itemAttrId,
                attrNameObject:{"zh":this.attrNameUpdate}
            };

            axios.post("/coron-web/itemAttr/update",updateParams).then(response => {
                console.log(response);
                this.getItemAttrList();
                this.cancelUpdate();
            }).catch(error => {
                console.log(error);
                this.$message({
                    type: 'info',
                    message: error
                });
            })
        },

        cancelUpdate:function(item){            
            this.updateattrinputVisible = 0;
            this.attrinputVisible = false;
        },

        delAttr: function (item) {
            axios.post('/coron-web/itemAttr/del',{itemAttrId:item.itemAttrId}).then(response => {
                
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getItemAttrList();
                console.log("删除成功",response);

            }).catch(error => {
                console.log(error);
            })
        },

        confirmDel(item) {
            this.$confirm('此操作将永久删除该分类下所有菜品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delAttr(item);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>

<style>
.attr-nav {
    border-right: 1px solid #ccc;
    padding-top: 20px;
}

ul.attr-list {
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0;
}

ul.attr-list li {
    height: 42px;
    line-height: 42px;
    padding: 0 18px;
}

ul.attr-list li a {
    color: #6B6B6B;
}

li.selected {
    border-left: 5px solid #20A0FF;
    background-color: rgba(242, 242, 242, 1);
}

.addAttr-input {}
</style>
