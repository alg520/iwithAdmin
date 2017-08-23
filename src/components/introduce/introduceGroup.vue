<template>
    <div class="introGroup-manage" id="introGroup-manage">
        <div class="introGroup-toolbar">
            <el-button type="primary" @click="addIntroGroup()">新建分组</el-button>
        </div>
        <div class="introGroup-body">
            <el-table :data="introGroupDatas" stripe style="width: 100%">
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
        </div>

        <el-dialog title="提案组添加" :visible.sync="introGroupDialogVisible" class="addDialog">
            <el-form :model="introGroupForm" :rules="rules" ref="introGroupForm">
                <el-form-item label="属性列表名称:" label-width="120px" prop="name">
                   <el-input v-model="introGroupForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="introGroupDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addIntroGroupPost()">立即添加</el-button>
                <el-button type="primary" @click="updateIntroGroupPost()">确认修改</el-button>
            </div>
        </el-dialog>      
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            introGroupDialogVisible:false,
            introGroupDatas: [],
            middleObj:{},
            introGroupForm:{
                name:''
            },
            rules:{
                name: [
                    { required: true, message: '请输入提案组名称', trigger: 'blur' }                    
                ]                
            }
            
        }
    },

    mounted() {

        //动态计算属性导航的高度
        var introGroupHeight = document.body.clientHeight - 266;
        document.getElementById("introGroup-manage").style.height = introGroupHeight + 'px';
        // document.getElementById("content-list").style.height = introduceHeight + 'px';

    },

    created() {
        //默认获取属性列表
        this.getIntroGroupList();
    },

    methods: {

        getIntroGroupList() {
            axios.get('/coron-web/introduceGroup/list').then(response => {
                console.log("提案列表组", response);

                response.data.status && (this.introGroupDatas = response.data.entry);


            }).catch(error => {
                console.log(error);
            })
        },

        addIntroGroup(){
            this.introGroupDialogVisible = true;
        },

        addIntroGroupPost(){

            let addParams = {
                groupNamePojo:{zh:this.introGroupForm.name,en:'',jp:''},
                position:1
            }

            axios.post('/coron-web/introduceGroup/add',addParams).then(response => {

                if(response.data.status){
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

            axios.post('/coron-web/introduceGroup/update',updateParams).then(response => {
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
            axios.post('/coron-web/introduceGroup/delete',{
                id:item.id
            }).then(response => {

                console.log(response.data);
                if(!response.data.status){
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
        }



    }

}
</script>

<style>
.introGroup-toolbar {
    /* background: #f8f8f9; */
    padding: 8px 0 20px 20px;
    text-align: center;
}

.introGroup-body {
    padding: 10px 30px;
}
</style>
