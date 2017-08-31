<template>
    <div class="shop-info">
        <el-row>
            <el-col :sm="24" :md="24" :lg="24">
                <div class="base-info">                    
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <h3>基本信息</h3>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺名称：</p>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺联系人：</p>
                        </el-col>
                        <el-col :span="12">
                            <p>店铺地址：</p>
                        </el-col>
                        <el-col :span="12">
                            <p>语言设置：</p>
                        </el-col>
                        <el-col :span="12">
                            <p>微信支付账号：</p>
                        </el-col>
                        <el-col :span="24">                            
                            <h3>设备信息</h3>
                        </el-col>
                        <el-col :span="24">
                            <el-table
                            :data="tableData"
                            style="width: 100%; text-align:center;">
                            <el-table-column
                                prop="date"
                                label="设备类型"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="SN号"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="名称">
                            </el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :span="24">                            
                            <h3>登陆账号</h3>
                        </el-col>
                        <el-col :span="24">
                            
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
</script>

<style>
.shop-info {
    padding: 10px 15px;
}

.shop-info p {
    margin: 5px 0;
    line-height: 30px;
}
</style>
