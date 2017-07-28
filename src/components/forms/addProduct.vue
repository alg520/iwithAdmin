<template>
    <div class="addProductForm">
        <el-row>
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="编号">
                            <el-input v-model="form.name" placeholder="编号"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">                            
                                <el-input v-model="form.name" placeholder="中文"></el-input>
                            <el-input v-model="form.name" placeholder="日文"></el-input>
                            <el-input v-model="form.name" placeholder="英文"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="form.name" placeholder="中文"></el-input>
                            <el-input v-model="form.name" placeholder="日文"></el-input>
                            <el-input v-model="form.name" placeholder="英文"></el-input>
                        </el-form-item>
                        <el-form-item label="原价">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-card :body-style="{ padding: '0px' }" style="width:230px;">
                                <img src="/static/images/hamburg.png" class="image">
                                <div style="padding: 14px;">
                                    <span>好吃的汉堡</span>
                                    <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button type="text" class="button">重新上传</el-button>
                                    <el-button type="text" class="button">删除</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-form-item>
                        <el-form-item label="所属分类">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="酒水" value="shanghai"></el-option>
                                <el-option label="主食" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>                        
                        <el-form-item label="商品位置">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="置顶"></el-radio>
                                <el-radio label="置底"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="销售时段">
                            <el-select v-model="form.region" placeholder="请选择时段">
                                <el-option label="全天" value="shanghai"></el-option>
                                <el-option label="早餐" value="beijing"></el-option>
                                <el-option label="中餐" value="beijing"></el-option>
                                <el-option label="晚餐" value="beijing"></el-option>
                                <el-option label="夜宵" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="属性设置">
                            <el-button type="primary">添加属性类型</el-button>
                        </el-form-item>                            
                        <el-form-item label="附属商品设置">
                            <el-button type="primary">添加附属商品类型</el-button>
                        </el-form-item>    
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即添加</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style>

</style>
