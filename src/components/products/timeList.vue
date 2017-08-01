<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">添加时间段</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableList" style="width: 100%">
      <el-table-column prop="nameGL.zh" label="名称" width="180"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column label="操作" width="240">
        <template scope="scope" width="240">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delTimeDuration(scope.row.timeDurationId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <el-dialog title="添加时间段" :visible.sync="dialogFormVisible">
      <el-form :model="timeDurationForm">
        <el-form-item label="时间段" :label-width="formLabelWidth">
          <el-input v-model="timeDurationForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间范围" :label-width="formLabelWidth">
          <!-- <el-time-picker
                is-range
                v-model="timeRange"
                placeholder="选择时间范围">
              </el-time-picker> -->
          <template>
            <!-- <el-time-select placeholder="起始时间" format="HH:mm:ss" v-model="startTime" :picker-options="{
                    start: '06:30',
                    step: '00:30',
                    end: '22:30'                    
                  }">
            </el-time-select> -->
            <el-time-picker
            v-model="startTime"
            :picker-options="{
              selectableRange: '06:30:00 - 22:30:00'
            }"
            placeholder="开始时间">
          </el-time-picker>
          <el-time-picker
            v-model="endTime"
            :picker-options="{
              selectableRange: '06:30:00 - 22:30:00'
            }"
            placeholder="结束时间">
          </el-time-picker>            
          </template>
  
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTimeDuration()">立即添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      tableList: [],
      dialogFormVisible: false,
      timeDurationForm: {
        name: '',
        startTime: '',
        endTime: ''
      },
      startTime: '',
      endTime: '',   
      formLabelWidth: '120px',
      timeRange: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    }
  },
  created() {
    axios.get('/coron-web/shopTimeDuration/list')
      .then(response => {
        console.log(response);
        this.tableList = response.data.rows;
      })
      .catch(error => {
        console.log(error);
        alert('网络错误，不能访问');
      })
  },
  methods:{
    addTimeDuration(){
      let name = {"zh":this.timeDurationForm.name};

      let timeParams = {        
        nameGL:name,
        startTime:this.startTime,
        endTime:"20:00:00"
      };
      console.log(timeParams);
      
      axios.post('/coron-web/shopTimeDuration/add',timeParams).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
        alert('网络错误不能访问');
      })
    },

    delTimeDuration(itemId){

        console.log(itemId);

        axios.post('/coron-web/shopTimeDuration/del',{
          timeDurationId:itemId
        }).then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
          alert('请求错误');
        })
    }
  }
}
</script>
<style scoped>

</style>
