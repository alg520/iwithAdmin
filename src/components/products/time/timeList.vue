<template>
  <div class="timeForm">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="addDialog()">添加时段</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="timeDatas" style="width: 100%">
      <el-table-column prop="nameGL.zh" label="名称" width="180"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column label="操作" width="240">
        <template scope="scope" width="240">
          <el-button size="mini" @click="updateTimeDuration(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="confirmDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <el-dialog :visible.sync="timeDialogVisible" class="addDialog" v-bind:title="titleTag">
      <el-form :model="timeDurationForm" :rules="rules" ref="timeDurationForm">
        <el-form-item label="时段名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="timeDurationForm.name" auto-complete="off" class="input193"></el-input>
        </el-form-item>
        <el-form-item label="时间范围" :label-width="formLabelWidth" required>          
            <el-time-select placeholder="起始时间" v-model="timeDurationForm.startTime" :picker-options="{
                start: '00:00',
                step: '00:10',
                end: '23:59'
              }">
            </el-time-select>
            <el-time-select placeholder="结束时间" v-model="timeDurationForm.endTime" :picker-options="{
                start: '00:00',
                step: '00:10',
                end: '23:59',
                minTime: timeDurationForm.startTime
              }">
            </el-time-select>            
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="timeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTimeDuration('timeDurationForm')" v-if="btnTag == 'add'">立即添加</el-button>
        <el-button type="primary" @click="updateTimeDurationPost()" v-else>立即修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import $http from '../../../utils/http';
export default {
  data() {
    return {
      timeDatas: [],
      timeDialogVisible: false,
      timeDurationId:'',
      btnTag:'',
      titleTag:'',
      timeDurationForm: {
        name: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ]
      },     
      formLabelWidth: '120px'
    }
  },
  created() {

    this.getTimeList();

  },
  methods: {

    getTimeList() {

      $http.get('/coron-web/shopTimeDuration/list')
        .then(response => {

          if (response.status) {
            response.rows && (this.timeDatas = response.rows);
          } else {
            this.$message({
              type: 'info',
              message: '数据错误'
            });
          }

        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不能访问');
        })
    },

    addDialog(){
      this.btnTag = 'add';
      this.titleTag="添加时段";
      this.timeDialogVisible = true;
      this.resetForm();
    },

    addTimeDuration(formName) {

      let timeParams = {
        nameGL: { zh: this.timeDurationForm.name,jp:'',en:''},
        startTime: this.timeDurationForm.startTime,
        endTime: this.timeDurationForm.endTime
      };
      
      this.$refs[formName].validate((valid) => {        

        if (valid) {
          
          $http.post('/coron-web/shopTimeDuration/add', timeParams).then(response => {            
            
            this.timeDialogVisible = false;
            this.getTimeList();            
            this.$message({
              type:'success',
              message:'添加成功'
            });
            this.resetForm();

          }).catch(error => {
            console.log(error);
            alert('网络错误不能访问');
          })

        } else {
          this.$message({
            type: 'info',
            message: '要添加的的时段名不能为空！'
          });
          return false;
        }
      });      

    },

    delTimeDuration(item) {
      
      $http.post('/coron-web/shopTimeDuration/del', {
        
        timeDurationId: item.timeDurationId

      }).then(response => {
        console.log(response);

        if(response.status){
          this.$message({
            type:'success',
            message:'删除成功'
          });
        }
        
        this.getTimeList();

      }).catch(error => {
        
        console.log(error);
        alert('请求错误');

      })

    },

    confirmDel(item) {
        this.$confirm('确定要删除该时段吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.delTimeDuration(item);
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },

    updateTimeDuration(item){
      
      this.titleTag = '修改时段';
      this.btnTag = 'update';
      this.timeDialogVisible = true;
      this.timeDurationForm.name = item.nameGL.zh;
      this.timeDurationForm.startTime = item.startTime;
      this.timeDurationForm.endTime = item.endTime;
      this.timeDurationId = item.timeDurationId;

    },

    updateTimeDurationPost(){

      let updateParams = {
        timeDurationId:this.timeDurationId,
        nameGL:{zh:this.timeDurationForm.name,jp:'',en:''},
        startTime:this.timeDurationForm.startTime,
        endTime:this.timeDurationForm.endTime
      };
      
      $http.post('/coron-web/shopTimeDuration/update',updateParams).then(response => {
        
        this.$message({
          type:'success',
          message:'修改成功'
        });
        this.timeDialogVisible = false;
        this.getTimeList();
      }).catch(error => {
        console.log(error);
      })
    },

    resetForm() {
      
      this.timeDurationForm.name = '';
      this.timeDurationForm.startTime ='';
      this.timeDurationForm.endTime = '';


    }
  }
}
</script>
<style scoped>
.timeForm {
  width: 98%;
  text-align: center;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
