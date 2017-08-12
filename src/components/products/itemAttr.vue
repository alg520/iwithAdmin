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
                        v-model="item.attrNameObject.zh"
                        :on-icon-click="cancelUpdate" style="width:80%;">
                    </el-input>
                    <el-button type="primary" icon="plus" size="small" @click="addAttr()"></el-button>                    
                </template>
                <template v-else>
                    <a href="javascript:;" class="inblock" v-text="item.attrNameObject.zh">
                    </a>
                    <span class="pull-right">
                        <el-button type="text" size="small" @click="updateAttr(item)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button type="text" size="small" @click="delAttr(item)">
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
                v-model="attrName" style="width:80%;">
                </el-input>
                <el-button type="primary" icon="plus" size="small" @click="addAttr()"></el-button>
            </li>
            <li v-else>
                <el-button type="primary" icon="plus" size="small" @click="addAttr()">添加分类</el-button>
            </li>
        </ul>
    
    </div>
</template>

<script>
import axios from 'axios';
import api from '@/utils/api';
import http from '@/utils/http';
export default {
    data() {
        return {
            attrinputVisible: false,
            updateattrinputVisible: 0,
            attrName: '', 
            itemAttrDatas: [],
            shopId:''
        }
    },
    created() {
        //默认获取属性列表
        this.getItemAttrList();
        console.log(api);
        console.log(http);
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

                !!response.data.rows && (this.itemAttrDatas = response.data.rows);
            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            })
        },

        addAttr: function () {
            this.attrinputVisible = true;
        },

        addAttrPost:function(){
            //添加的时候需要 商铺id 和 属性名称
            // 商铺id 需要获取列表的时候 就要保存起来
            var params = {
                shopId:'',
                attrNameObject:{"jp":"","zh":"","en":""}
            };

            axios.post('/coron-web/itemAttr/add',{
                shopId:'',
                attrNameObject:' '
            }).then( response => {
                
                console.log(response);

            }).catch(error => {
                
                console.log(error);

            })
        },

        updateAttr: function (item) {
            
            this.updateattrinputVisible = item.itemAttrId;
            
        },

        updateAttrPost:function(item){
            //更新列表请求
        },

        cancelUpdate:function(item){            
            this.updateattrinputVisible = 0;
            this.attrinputVisible = false;
        },

        delAttr: function (item) {
            axios.post('/coron-web/itemAttr/del',{itemAttrId:item.itemAttrId}).then(response => {
                
                this.getItemAttrList();
                console.log("删除成功",response);

            }).catch(error => {
                console.log(error);
            })
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
