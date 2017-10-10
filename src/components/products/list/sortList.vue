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
                    <!-- <div class="drapSortList-list">                        
                        <draggable :list="catalogDatas" :move="checkMove" @change="moved" class="dragArea" :options="{group:'introGroup'}">
                            <div class="list-complete-item" v-for="element in catalogDatas" :key='element'>
                                <div class="list-complete-item-handle">{{element.nameObject.zh}}
                                    <span class="pull-right">
                                        <i class="el-icon-d-caret"></i>
                                    </span>
                                </div>                            
                            </div>
                        </draggable>
                    </div> -->

                </div>
            </template>
        </el-col>
        <el-col :sm="18" :md="18" :lg="19">
            <transition mode="out-in">
                <template>
                    <div class="item-list">

                        <div class="drapSortList-list">                        
                            <draggable :list="productsList" :move="checkMove" @change="moved" class="dragArea" :options="{group:'introGroup'}">
                                <div class="list-complete-item" v-if="productsList.length == 0">
                                    <div class="list-complete-item-handle">
                                        当前分类下暂无菜品！                                        
                                    </div>   
                                </div>
                                <div class="list-complete-item" v-for="element in productsList" :key='element' v-else>
                                    <div class="list-complete-item-handle">
                                        {{element.itemNameObject.zh}}
                                        <span class="pull-right">
                                            <i class="el-icon-d-caret"></i>
                                        </span>
                                    </div>                            
                                </div>                                
                            </draggable>
                        </div>                        
                    </div>
                </template>
            </transition>
        </el-col>
    </el-row>
</template>

<script>
import axios from 'axios';
import $http from '../../../utils/http';
import draggable from 'vuedraggable';
export default {    
    data() {
        return {
            isActive: 0,
            catalogDatas: [],
            productsList: [],            
            formLabelWidth: '120px'
        }
    },

    created() {
        //默认获取属性列表
        this.getCatalogList();
        
    },

    components: {
        draggable
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
            $http.get('/coron-web/catalog/getCatalogs')
                .then(response => {

                    !!response.entry && (this.catalogDatas = response.entry)
                    && (this.isActive = this.catalogDatas[0].catalogId) && this.getItemList();

                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },

        changeSelected: function(itemId) {
            
            this.isActive = itemId;
            this.getItemList();

        },
        

        getItemList() {

            let getParams = {                
                catalogId: !!this.isActive ? this.isActive : null
            };

            $http.post('/coron-web/item/list', getParams)
                .then(response => {

                    !!response.rows && (this.productsList = response.rows);
                    this.totalItems = response.total;
                    console.log(this.productsList);

                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问,请刷新页面重试！');
                })
        },

        checkMove(evt){
            //console.log(evt);
        },

        sortItem(data){            
            $http.post('/coron-web/item/sort',data).then( res => {
                if(res.status){
                    this.$message({
                        type:'success',
                        message:'交换成功'
                    });
                    this.getItemList();
                }else {
                    this.$message({
                        type:'error',
                        message:'交换失败'
                    });
                }
            })
        },
        
        moved(evt) {
            let newIndex = evt.moved.newIndex;
            let oldIndex = evt.moved.oldIndex;

            console.log(evt);
            console.log(this.productsList[evt.moved.newIndex+1]);
            console.log(this.productsList[evt.moved.newIndex]);

            if(newIndex > oldIndex){
                let oldItem = this.productsList[evt.moved.newIndex],
                    newItem = this.productsList[evt.moved.newIndex-1];
                
                const data = {
                    id: oldItem.itemId,
                    catalogId: this.isActive,
                    oldIndex: oldItem.seq,
                    newIndex: newItem.seq
                };

                this.sortItem(data);                
                

            } else {

                let oldItem = this.productsList[evt.moved.newIndex],
                    newItem = this.productsList[evt.moved.newIndex+1];

                const data = {
                    id: oldItem.itemId,
                    catalogId: this.isActive,
                    oldIndex: oldItem.seq,
                    newIndex: newItem.seq
                };

                this.sortItem(data); 
                
            }
        }

    }

}
</script>

<style scoped>
.el-col {
    text-align: center;
}

.content-list {    
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

.drapSortList-list {
    width: auto;
}
.list-complete-item {
    border:none;
}
</style>
