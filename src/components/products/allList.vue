<template>
    <div class="item-list">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-form :inline="true" :model="itemsForm">
                        <el-form-item label="状态">
                            <el-select v-model="itemsForm.isSale" placeholder="状态" size="small">
                                <el-option label="全部" value="null"></el-option>
                                <el-option label="未上架" value="false"></el-option>
                                <el-option label="已上架" value="true"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品类型">
                            <el-select v-model="itemsForm.itemType" placeholder="商品类型" size="small">
                                <el-option label="单点" value="1"></el-option>
                                <el-option label="套餐" value="2"></el-option>
                                <el-option label="配菜" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="出售时间">
                            <el-select v-model="itemsForm.sellTime" placeholder="出售时间">
                                <el-option label="全天" value="00:00-24:00"></el-option>
                                <el-option label="早餐" value="07:00-11:00"></el-option>
                                <el-option label="中餐" value="11:00-13:00"></el-option>
                                <el-option label="晚餐" value="17:00-20:00"></el-option>
                                <el-option label="夜宵" value="20:00-04:00"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="">
                            <el-input size="small" placeholder="请输入商品名称" icon="search" v-model="itemsForm.itemName" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" @click="$store.commit('changeStatus','addlist')">添加商品</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-table :data="productsList" ref="multipleTable" tooltip-effect="dark" 
        style="width: 100%" max-height="450">
            <!-- <el-table-column type="selection" width="65">
            </el-table-column> -->
            <!-- <el-table-column type="index" width="55">
            </el-table-column> -->
            <el-table-column prop="itemNameObject.zh" label="商品名称">
            </el-table-column>
            <el-table-column prop="originPrice" sortable label="价格">
            </el-table-column>
            <el-table-column label="商品类别">
                <template scope="scope">
                    <span>{{scope.row.itemType | parseProductType}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column sortable label="出售开始时间">
                <template scope="scope">
                    <span>{{scope.row.timeDurations[0].startTime}}</span>
                </template>
            </el-table-column>
            <el-table-column sortable label="出售结束时间">
                <template scope="scope">
                    <span>{{scope.row.timeDurations[0].endTime}}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="状态">
                <template scope="scope">
                    <span>{{scope.row.isSale | parseIsSale}}</span>
                </template>
            </el-table-column>
            <el-table-column label="图片">
                <template scope="scope">
                    <img :src="scope.row.picUrl" alt="图片" width="50" height="50">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">
                        <i class="el-icon-edit" title="编辑"></i>
                    </el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">
                        <i class="el-icon-delete" title="删除"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- <el-dialog title="添加菜品" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="菜品顺序号" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="中文名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="中文描述" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="英文描述" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="日文名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="日文描述" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="中文菜品价格" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="日文菜品价格" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="英文菜品价格" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="特价时价格" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="菜品顺序" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                </el-dialog> -->
    </div>
</template>

<script>
import store from '@/store/index';
import axios from 'axios';
export default {
    data() {
        return {
            productsList: [],

            formItems: {
                user: '',
                state: '0',
                type: '0',
                sellTime: '00:00-24:00',
                productName: '',
                itemType:1
            },

            itemsForm:{                
                itemName:'',
                itemType:null,
                busiType:1,   //1点餐系统2民宿3零售
                isSale:null,
                itemNo:'',
                catalogId:null
            },

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

            formLabelWidth: '120px'

        };
    },
    created() {
        axios.post('/coron-web/item/list',{})
            .then(response => {
                
                console.log(response.data);

                !!response.data.rows && (this.productsList = response.data.rows);

                console.log(this.productsList);

            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            })
    },
    computed: {
        typeName: function () {
            console.log("类型", this.productsList['itemType']);
            return this.productsList['itemType'] == 1 ? '单点' : (this.productsList['itemType'] == 2 ? '套餐' : '配菜');
        }
    },
    methods: {

        getItemList:function(){

        },

        addProduct(status) {
            console.log(store);
        },

        getStatus() {
            //获取状态查询
        },

        getSummaries(param) {

            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = 'N/A';
                }
            });

            return sums;
        },

        onSubmit() {
            console.log('submit!');
        },

        handleIconClick(ev) {
            console.log(ev); 
        },

        handleEdit() {
            console.log(this);
        }

    },
    store
};
</script>
<style scoped>
.el-table th>.cell {
    text-align: center;
}
.item-list {
    padding: 20px 10px;
}
</style>
