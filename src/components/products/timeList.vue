<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">添加时间段</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableList" style="width: 100%">
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column label="操作" width="240">
        <template scope="scope" width="240">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <el-dialog title="添加时间段" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="时间段" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间范围" :label-width="formLabelWidth">
          <el-time-picker
            is-range
            v-model="timeRange"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {      
      tableList:[],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      timeRange: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    }
  },
  created(){
    axios.get('http://127.0.0.1:3003/rows')
    .then(response => {        
        this.tableList = response.data.body;        
    })
    .catch(error => {
        console.log(error);
        alert('网络错误，不能访问');
    })
  }
}
</script>
<style scoped>

</style>
