<template>
    <div class="robotDancePage">        
        <el-table :data="snLists" border style="width: 100%; text-align:center;">
            <el-table-column label="ID" fixed="left" prop="robotId" width="80"></el-table-column>            
            <el-table-column label="机器人名称" fixed="left" prop="robotName" min-width="130px">                
            </el-table-column>           
            <el-table-column label="ROM 版本" prop="romVersion" min-width="230px">                
            </el-table-column>
            <el-table-column label="APP 版本" prop="appVersion" min-width="130px">
            </el-table-column>
            <el-table-column label="sn" min-width="230px" prop="sn">                
            </el-table-column>
            <el-table-column label="是否测试" min-width="130px" prop="isTest">
                <template scope="scope">
                    <span v-if="scope.row.isTest == 1">是</span>
                    <span v-if="scope.row.isTest == 0">否</span>
                </template>
            </el-table-column>
            <el-table-column label="桌号" min-width="130px" prop="tableNo">                
            </el-table-column>
            <el-table-column label="所属商铺ID" min-width="130px" prop="shopId">                
            </el-table-column>
            <el-table-column label="所属店员ID" min-width="130px" prop="managerId">                
            </el-table-column>
            <el-table-column label="控制板ID" min-width="130px" prop="managerId">                
            </el-table-column>            
            <!-- <el-table-column label="机器人状态" min-width="130px" prop="robotStatusId">                
            </el-table-column> -->
            <el-table-column label="操作" fixed="right" width="100px">
                <template scope="scope">                    
                    <el-button type="text" size="small" @click="snUpdate(scope.row)">
                        <i class="el-icon-edit" title="编辑"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block turn-page" style="margin-top:10px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
            </el-pagination>
        </div>

        <el-dialog
        title="修改"
        :visible.sync="snDialogVisible"
        size="tiny">
            <el-form label-width="80px" :model="snForm">
                <el-form-item label="机器人ID">
                    <el-input v-model="snForm.robotId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="是否测试">
                    <el-select v-model="snForm.isTest">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                    </el-select>
                </el-form-item>                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="snDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeTest()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import $http from "../../utils/http";
export default {
  data() {
    return {
      snLists: [],
      middleObj: {},
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      snDialogVisible:false,
      snForm: {
        robotId: '',
        isTest: ''
      }
    }
  },
  created() {
    this.getSnLists();
  },
  computed: {},
  methods: {
    getSnLists() {
      $http
        .post("/coron-web/robot/getAllSn",{
            rp:this.pageSize,
            page:this.currentPage
        })
        .then(res => {
          if (res.status) {            
            this.snLists = res.entry.rows;
            this.totalItems = res.entry.total;
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
    },

    handleSizeChange(size) {
        console.log(size);
    },
    // 翻页
    handleCurrentChange(page) {
        console.log(page);
        console.log(this.currentPage);
        this.getSnLists();
    },

    snUpdate(item){
        console.log(item);
        this.snDialogVisible = true;
        this.snForm.robotId = item.robotId;
        this.snForm.isTest = this.snForm.isTest ? item.isTest+"":"";

    },

    changeTest(){
        let data = {
            robotId:this.snForm.robotId,
            isTest:this.snForm.isTest
        }

        $http.post('/coron-web/robot/update',data).then(res => {            
            if(res.status){
                
                this.snDialogVisible = false;
                this.$message({
                    type:'success',
                    message:"修改成功"
                });
                this.getSnLists();
            } else {
                this.$message({
                    type:'error',
                    message:"修改失败"
                });
            }
        })        


    }
  }
};
</script>


<style>
.robotDancePage {
  padding: 10px 15px;
  background-color: #fff;
}
</style>
