<template>
    <div class="introGroup-manage" id="introGroup-manage">
        <div class="introGroup-toolbar">
            <el-button type="primary" @click="addIntroGroup()">新建分组</el-button>
            <el-button type="primary" @click="addIntroSort()">分组排序</el-button>
        </div>
        <div class="introGroup-body" >
            <el-table :data="introGroupDatas" stripe style="width: 100%" v-if="!sortPage">
                <el-table-column type="index" width="55" align="center">
                </el-table-column>
                <el-table-column prop="groupNamePojo.zh" label="提案组名称" align="center">
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template scope="scope">
                        <el-button @click.native.prevent="updateIntroGroup(scope.row)" type="text" size="small">
                            修改
                        </el-button>
                        <el-button @click.native.prevent="delConfirm(scope.row)" type="text" size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <div class="drapSortList" v-if="sortPage">
                <div class="drapSortList-list">
                    <h3>{{list1Title}}</h3>
                    <div><el-button @click="cancelSort()">返回</el-button></div>
                    <draggable :list="introGroupDatas" :move="checkMove" @change="moved" class="dragArea" :options="{group:'introGroup'}">
                        <div class="list-complete-item" v-for="element in introGroupDatas" :key='element'>
                            <div class="list-complete-item-handle">{{element.groupNamePojo.zh}} => {{element.seq}} => {{element.id}}
                                <span class="pull-right">
                                    <i class="el-icon-d-caret"></i>
                                </span>
                            </div>                            
                        </div>
                    </draggable>
                </div>
            </div>

        </div>

        <el-dialog title="提案组添加" :visible.sync="introGroupDialogVisible" class="addDialog" size="tiny">
            <el-form :model="introGroupForm" :rules="rules" ref="introGroupForm">
                <el-form-item label="属性列表名称:" label-width="120px" prop="name">
                   <el-input v-model="introGroupForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="introGroupDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addIntroGroupPost()" v-if="addTag">立即添加</el-button>
                <el-button type="primary" @click="updateIntroGroupPost()" v-else>确认修改</el-button>
            </div>
        </el-dialog>      
  </div>
  
</template>

<script>
import axios from 'axios';
import $http from '../../utils/http';
import draggable from 'vuedraggable';
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
            rules:{
                name: [
                    { required: true, message: '请输入提案组名称', trigger: 'blur' }                    
                ]                
            },
            list1:[],
            list1Title:'提案组排序'            
        }
    },

    mounted() {

        //动态计算属性导航的高度
        var introGroupHeight = document.body.clientHeight - 226;
        document.getElementById("introGroup-manage").style.height = introGroupHeight + 'px';
        // document.getElementById("content-list").style.height = introGroupHeight + 'px';

    },

    created() {
        //默认获取属性列表
        this.getIntroGroupList();
    },

    methods: {

        getIntroGroupList() {
            $http.get('/coron-web/introduceGroup/list').then(response => {
                console.log("提案列表组", response);

                response.status && (this.introGroupDatas = response.entry);


            }).catch(error => {
                console.log(error);
            })
        },

        addIntroGroup(){
            this.addTag = true;
            this.introGroupDialogVisible = true;
        },

        addIntroGroupPost(){

            let addParams = {
                groupNamePojo:{zh:this.introGroupForm.name,en:'',jp:''},
                position:1
            }

            $http.post('/coron-web/introduceGroup/add',addParams).then(response => {

                if(response.status){
                    this.$message({
                        type:'success',
                        message:'提案组添加成功！'
                    });
                }
                this.introGroupDialogVisible = false;
                this.getIntroGroupList();

            }).catch(error => {
                console.log(error);
            })
        },

        updateIntroGroup(item){
            this.addTag = false;
            this.introGroupDialogVisible = true;
            this.introGroupForm.name = item.groupNamePojo.zh;

            this.middleObj = item;
            
            console.log(item);

        },

        updateIntroGroupPost(){

            let updateParams = {
                id:this.middleObj.id,
                groupNamePojo:{zh:this.introGroupForm.name,en:'',jp:''},
                position:1
            }; 

            $http.post('/coron-web/introduceGroup/update',updateParams).then(response => {
                this.$message({
                    type:'success',
                    message:'修改成功'
                });
                this.introGroupDialogVisible = false;
                this.getIntroGroupList();
                this.middleObj = null;
            }).catch(error => {
                console.log(error);
            })

        },

        delConfirm(item){
            this.$confirm('当前分组不为空的时候不允许删除,请先删除分组下的提案,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal:false,
                type: 'warning'
            }).then(() => {

                this.delIntroGroup(item);

            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });

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
