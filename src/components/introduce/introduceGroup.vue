<template>
    <div class="introGroup-manage" id="introGroup-manage">
        <div class="introGroup-toolbar">
            <el-button type="primary" @click="addIntroGroup()">{{$t('introduce.addGroup')}}</el-button>
            <el-button type="primary" @click="addIntroSort()">{{$t('introduce.groupSort')}}</el-button>
        </div>
        <div class="introGroup-body" >
            <el-table :data="introGroupDatas" stripe style="width: 100%" v-if="!sortPage">
                <el-table-column type="index" width="55" align="center">
                </el-table-column>
                <el-table-column prop="groupNamePojo.zh" :label="$t('introduce.introduceGroupName')" align="center">
                </el-table-column>
                <el-table-column :label="$t('_global.action')" width="100">
                    <template scope="scope">
                        <el-button @click.native.prevent="updateIntroGroup(scope.row)" type="text" size="small">
                            {{$t('_global.edit')}}
                        </el-button>
                        <el-button @click.native.prevent="delConfirm(scope.row)" type="text" size="small">
                            {{$t('_global.delete')}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <div class="drapSortList" v-if="sortPage">
                <div class="drapSortList-list">                    
                    <div><el-button @click="cancelSort()">{{$t('_global.back')}}</el-button></div>
                    <draggable :list="introGroupDatas" :move="checkMove" @change="moved" class="dragArea" :options="{group:'introGroup'}">
                        <div class="list-complete-item" v-for="element in introGroupDatas" :key='element'>
                            <div class="list-complete-item-handle">{{element.groupNamePojo.zh}}
                                <span class="pull-right">
                                    <i class="el-icon-d-caret"></i>
                                </span>
                            </div>                            
                        </div>
                    </draggable>
                </div>
            </div>

        </div>

        <el-dialog :title="addTag ? $t('introduce.addIntroduceGroup'):$t('introduce.updateIntroduceGroup')" :visible.sync="introGroupDialogVisible" class="addDialog" size="tiny">
            <el-form :model="introGroupForm" :rules="introGroupFormRules" ref="introGroupForm">
                <el-form-item :label="$t('introduce.introduceGroupName')" label-width="120px" prop="name">
                   <el-input v-model="introGroupForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="introGroupDialogVisible = false">{{$t('_global.cancel')}}</el-button>
                <el-button type="primary" @click="addIntroGroupPost()" v-if="addTag">{{$t('_global.lijiAdd')}}</el-button>
                <el-button type="primary" @click="updateIntroGroupPost()" v-else>{{$t('_global.lijiEdit')}}</el-button>
            </div>
        </el-dialog>      
  </div>
  
</template>

<script>
import axios from 'axios';
import $http from '../../utils/http';
import draggable from 'vuedraggable';
import Cookies from 'js-cookie';
import { baiduTranslate, returnTransArray } from '../../utils/translate.js';
export default {
    components:{
        draggable
    },
    data() {
        return {
            introGroupDialogVisible:false,
            introGroupDatas: [],
            middleObj:{},
            sortPage:false,
            addTag:true,
            introGroupForm:{
                name:''
            },
            introGroupFormRules:{
                name: [
                    { required: true, message: '请输入提案组名称', trigger: 'blur' }                    
                ]                
            },
            introGroupTransArray:[]
        }
    },

    computed: {
        _SHOPLANGUAGE() {
        return Cookies.get('SHOPLANGUAGE');
        }
    },
    mounted() {

        function getHeight(){            
            //动态计算属性导航的高度
            var introGroupHeight = document.body.clientHeight - 196;
            document.getElementById("introGroup-manage").style.height = introGroupHeight + 'px';
        }
        window.onresize = function(){
            setTimeout(getHeight,500);
        };
        getHeight();

    },

    created() {
        //默认获取属性列表
        this.getIntroGroupList();
    },

    methods: {

        getIntroGroupList() {
            $http.get('/coron-web/introduceGroup/list').then(response => {
                response.status && (this.introGroupDatas = response.entry);
            }).catch(error => {
                console.log(error);
            })
        },

        async translateContent(itemName, type) {
            var self = this;
            let _language = self._SHOPLANGUAGE;
            if (itemName !== "") {
                var res = await baiduTranslate(itemName, _language);
                switch(type){
                    case 'introGroup':
                    self.introGroupTransArray = returnTransArray(res);
                    break;
                }            
            }
        },

        addIntroGroup(){
            this.addTag = true;
            this.introGroupForm.name ='';
            this.introGroupDialogVisible = true;
        },

       async addIntroGroupPost(){
            var self = this;

            await self.translateContent(self.introGroupForm.name,'introGroup');
            
            self.$refs['introGroupForm'].validate((valid) => {

                if(valid){

                    let introGroupObj = { zh: self.introGroupForm.name, jp: self.introGroupForm.name, en: self.introGroupForm.name };
                    if (self.introGroupTransArray.length > 0) {
                        introGroupObj = Object.assign(introGroupObj, self.introGroupTransArray[0]);                        
                    }

                    let addParams = {
                        groupNamePojo: introGroupObj,
                        position:1
                    }

                    $http.post('/coron-web/introduceGroup/add',addParams).then(response => {

                        if(response.status){
                            self.$message({
                                type:'success',
                                message:'提案组添加成功！'
                            });
                        }
                        self.introGroupDialogVisible = false;
                        self.getIntroGroupList();

                    }).catch(error => {
                        console.log(error);
                    })

                } else {
                    self.$message({
                        type:'warning',
                        message:'请输入必填字段！'
                    })
                }

            });           
        },

        updateIntroGroup(item){
            this.addTag = false;
            this.introGroupDialogVisible = true;
            this.introGroupForm.name = item.groupNamePojo.zh;
            this.middleObj = item;
        },
        

       async updateIntroGroupPost(){
            let self = this;

            let introGroupObj = { zh: self.introGroupForm.name, jp: self.introGroupForm.name, en: self.introGroupForm.name };
            if(self.introGroupForm.name === self.middleObj.groupNamePojo.zh || self.introGroupForm.name === self.middleObj.groupNamePojo.en || self.introGroupForm.name === self.middleObj.groupNamePojo.jp){          
                introGroupObj = self.middleObj.groupNamePojo;
            } else {
                await self.translateContent(self.introGroupForm.name,'introGroup');
                if (self.introGroupTransArray.length > 0) {
                    introGroupObj = Object.assign(introGroupObj, self.introGroupTransArray[0]);                        
                }
            }

            let updateParams = {
                id:self.middleObj.id,
                groupNamePojo:introGroupObj,
                position:1
            };

            self.$refs['introGroupForm'].validate((valid) => {
                if(valid){

                    $http.post('/coron-web/introduceGroup/update',updateParams).then(response => {
                        self.$message({
                            type:'success',
                            message:'修改成功'
                        });
                        self.introGroupDialogVisible = false;
                        self.getIntroGroupList();
                        self.middleObj = null;
                    }).catch(error => {
                        console.log(error);
                    })

                } else {
                    self.$message({
                        type:'warning',
                        message:'请输入必填字段！'
                    })
                }
            })
        },

        delConfirm(item){
            var self = this;
            self.checkNotChild(item).then(res => {
                if(res.data.rows && res.data.rows.length > 0){
                    self.$alert('该分类下有提案时，不可直接删除分类','提示',{
                        confirmButtonText:'我知道了',
                        type: 'warning'
                    })
                } else {
                    self.$confirm('确认删除该分类吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal:false,
                        type: 'warning'
                    }).then(() => {
                        self.delIntroGroup(item);
                    }).catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }).catch(res => {
                console.log("错误提示",res);
            })            
        },

        checkNotChild(item){
            return axios.get('/coron-web/introduce/list',{
                params:{groupId:item.id}
            });
        },

        delIntroGroup(item){
            $http.post('/coron-web/introduceGroup/delete',{
                id:item.id
            }).then(response => {
                
                if(!response.status){
                    this.$message({
                        type:'warning',
                        message:'该分组下有提案，请先删除分组下得提案！'
                    });
                } else {
                    this.$message({
                        type:'success',
                        message:'删除成功！'
                    });
                    this.getIntroGroupList();
                }
                
            }).catch(error => {
                console.log(error);
            })
        },

        sortIntroGroup(itemParams){
            
            $http.post('/coron-web/introduceGroup/sort',itemParams).then(response => {

                this.$message({
                    type:'success',
                    message:'更新成功'
                });
                this.getIntroGroupList();

            }).catch(error => {
                this.$message({
                    type:'error',
                    message:'更新失败'
                });
            })
        },

        checkMove(evt){
            //console.log(evt);
        },

        addIntroSort(){
            this.sortPage = true;
        },

        cancelSort(){
            this.sortPage = false;
        },


        moved(evt) {

            let newIndex = evt.moved.newIndex;
            let oldIndex = evt.moved.oldIndex;

            console.log(evt);
            console.log(this.introGroupDatas[evt.moved.newIndex+1]);
            console.log(this.introGroupDatas[evt.moved.newIndex]);

            if(newIndex > oldIndex){
                let oldItem = this.introGroupDatas[evt.moved.newIndex],
                    newItem = this.introGroupDatas[evt.moved.newIndex-1];
                
                const item = {
                    id: oldItem.id,
                    oldIndex: oldItem.seq,
                    newIndex: newItem.seq
                };
                
                this.sortIntroGroup(item);

            } else {

                let oldItem = this.introGroupDatas[evt.moved.newIndex],
                    newItem = this.introGroupDatas[evt.moved.newIndex+1];

                const item = {
                    id: oldItem.id,
                    oldIndex: oldItem.seq,
                    newIndex: newItem.seq
                };

                this.sortIntroGroup(item);
            }

        }

    }

}
</script>

<style>
.introGroup-manage {    
    background-color: #fff;
    overflow-y: auto;
}
.introGroup-toolbar {    
    padding: 8px 0 20px 20px;
    text-align: center;
}

.introGroup-body {
    padding: 10px 30px;
}

.drapSortList-list {
    width: 330px;
}
.dragArea {
    margin-top: 15px;
    min-height: 50px;
    padding-bottom: 30px;
}
.list-complete-item {
    cursor: move;
    position: relative;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    padding: 5px 12px;
    margin-top: 4px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
    font-weight: bold;
    background: #FAFAFA;
}
</style>
