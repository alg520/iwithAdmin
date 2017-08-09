<template>
  <div class="tasteForm">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">添加属性</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50px">
      </el-table-column>
      <el-table-column prop="tasteName" label="名称"></el-table-column>
      <el-table-column label="操作" width="240">
        <template scope="scope" width="240">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <el-dialog title="添加属性" :visible.sync="dialogFormVisible" class="addDialog tasteDialog">
      <el-form :model="form">
        <el-form-item label="属性名称：" :label-width="formLabelWidth">
          <el-input v-model="form.taste" auto-complete="off" class="input193"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">立即添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        tasteName: '麻辣'
      }, {
        tasteName: '香辣'
      }, {
        tasteName: '清淡'
      }, {
        tasteName: '清汤'
      }],
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
  }
}
</script>
<style scoped>

</style>
