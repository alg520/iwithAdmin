<template>
    <div>
        <el-form :inline="true" :model="formItems">                 
            <el-form-item>
                <el-button type="primary" @click="$store.commit('changeStatus','addlist')">添加</el-button>
                <el-button type="primary" @click="$store.commit('changeStatus','addlist')">排序</el-button>                
                <el-button type="primary" @click="$store.commit('changeStatus','addlist')">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%">
            <el-table-column prop="name" label="菜品属性">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button type="text" size="small">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" size="small">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <!-- <el-card class="box-card">
            <ul class="attr-list">
                <li class="selected">
                    <a href="javascript:;">全部</a>
                </li>
                <li v-for="item in tableData" :key="item.id">
                    <a v-text="item.name" href="javascript:;"></a>
                    <span style="float:right;">
                        <el-button type="text" size="small">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button type="text" size="small">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </span>
                </li>
            </ul>
        </el-card> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                name: '刺身拼盘'
            }, {
                name: '菜肴'
            }, {
                name: '沙拉'
            }, {
                name: '油炸类'
            }]
        }
    }
}
</script>

<style>
ul.attr-list {
    list-style: none;
    text-align: left;    
    padding: 10px 15px;    
}

ul.attr-list li {
    height: 42px;
    line-height: 42px;    
}
li.selected {
    border-left: 5px solid #20A0FF;
}
</style>
