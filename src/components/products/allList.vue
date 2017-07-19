<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="状态">
                <el-select v-model="formInline.state" placeholder="状态">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="未上架" value="1"></el-option>
                    <el-option label="已上架" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="formInline.type" placeholder="商品分类">
                    <el-option label="推荐菜" value="0"></el-option>
                    <el-option label="特价菜" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出售时间">
                <el-select v-model="formInline.sellTime" placeholder="出售时间">
                    <el-option label="全天" value="00:00-24:00"></el-option>
                    <el-option label="早餐" value="07:00-11:00"></el-option>
                    <el-option label="中餐" value="11:00-13:00"></el-option>
                    <el-option label="晚餐" value="17:00-20:00"></el-option>
                    <el-option label="夜宵" value="20:00-04:00"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-input placeholder="请输入商品名称" icon="search" v-model="formInline.user" :on-icon-click="handleIconClick">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dialogFormVisible = true">添加商品</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData6" ref="multipleTable" border tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="65">
            </el-table-column>
            <el-table-column type="index" width="55">
            </el-table-column>
            <el-table-column prop="productName" label="商品名称">
            </el-table-column>
            <el-table-column prop="productPrice" sortable label="价格">
            </el-table-column>
            <el-table-column prop="productCategory" label="商品类别">
            </el-table-column>
            <el-table-column prop="sellTime" sortable label="出售时间">
            </el-table-column>
            <el-table-column prop="productState" label="状态">
            </el-table-column>
            <el-table-column prop="productPic" label="图片">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <el-dialog title="添加菜品" :visible.sync="dialogFormVisible">
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
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData6: [{
                productName: '红烧排骨',
                productPrice: '38',
                productCategory: '特色菜',
                sellTime: '2017-07-14',
                productState: '已上架',
                productPic: '无图'
            }, {
                productName: '三文鱼',
                productPrice: '68',
                productCategory: '特色菜',
                sellTime: '2017-07-14',
                productState: '已上架',
                productPic: '无图'
            }, {
                productName: '麻辣香锅',
                productPrice: '38',
                productCategory: '特色菜',
                sellTime: '2017-07-14',
                productState: '已上架',
                productPic: '无图'
            }, {
                productName: '蛋黄土豆丝',
                productPrice: '38',
                productCategory: '特色菜',
                sellTime: '2017-07-16',
                productState: '已上架',
                productPic: '无图'
            }, {
                productName: '东坡肉',
                productPrice: '88',
                productCategory: '特色菜',
                sellTime: '2017-07-14',
                productState: '已上架',
                productPic: '无图'
            }],

            formInline: {
                user: '',
                state: '0',
                type:'0',
                sellTime:'00:00-24:00'
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
    methods: {
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

    }
};
</script>
<style scoped>
.el-table th>.cell {
    text-align: center;
}
</style>
