<template>
    <div class="addProductForm">
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="所属分类">
                            <!-- <el-input v-model="form.name" placeholder="分类"></el-input> -->
                            <el-select v-model="productForm.name" placeholder="请选择分类">
                                <el-option label="酒水" value="shanghai"></el-option>
                                <el-option label="主食" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="productForm.name" placeholder="请选择类型">
                                <el-option label="酒水" value="shanghai"></el-option>
                                <el-option label="主食" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜品名称">
                            <el-input v-model="productForm.name" placeholder="菜品名称"></el-input>
                            <!-- 
                                    <el-input v-model="form.name" placeholder="日文"></el-input>
                                    <el-input v-model="form.name" placeholder="英文"></el-input> 
                                -->
                        </el-form-item>
                        <el-form-item label="菜品介绍">
                            <el-input type="textarea" :rows="2" placeholder="请输入菜品介绍" v-model="textarea">
                            </el-input>
                            <!--
                                    <el-input v-model="form.name" placeholder="日文"></el-input>
                                    <el-input v-model="form.name" placeholder="英文"></el-input> 
                                -->
                        </el-form-item>
                        <el-form-item label="原价">
                            <el-input v-model="productForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="折后价">
                            <el-input v-model="productForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="优惠">
                            <template>
                                <el-radio-group v-model="productForm.name">
                                    <el-radio label="价格"></el-radio>
                                    <el-radio label="折扣"></el-radio>
                                </el-radio-group>
                            </template>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="销售时段">
                            <el-select v-model="productForm.name" placeholder="请选择时段">
                                <el-option label="全天" value="shanghai"></el-option>
                                <el-option label="早餐" value="beijing"></el-option>
                                <el-option label="中餐" value="beijing"></el-option>
                                <el-option label="晚餐" value="beijing"></el-option>
                                <el-option label="夜宵" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属分类">
                            <el-select v-model="productForm.name" placeholder="请选择活动区域">
                                <el-option label="酒水" value="shanghai"></el-option>
                                <el-option label="主食" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品位置">
                            <el-radio-group v-model="productForm.name">
                                <el-radio label="置顶"></el-radio>
                                <el-radio label="置底"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="商品标签">
                            <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
                        </el-form-item>
                        <el-form-item label="属性设置">
                            <el-button type="primary">添加属性类型</el-button>
                        </el-form-item>
                        <el-form-item label="附属商品设置">
                            <el-button type="primary">添加附属商品类型</el-button>
                        </el-form-item>
                        <el-form-item label="是否有配菜">
                            <el-select v-model="productForm.name" placeholder="请选择活动区域">
                                <el-option label="酒水" value="shanghai"></el-option>
                                <el-option label="主食" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">立即添加</el-button>
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
            imageUrl: '',
            dynamicTags: ["标签1"],
            productForm: {
                name: '',
                itemNameObject: '',
                itemNo: '',
                shopId: '',
                catalogId: '',
                originPrice: '',
                discountPrice: '',
                discount: '',
                itemNum: '',
                picUrl: '',
                itemDescObject: '',
                itemType: 1,
                timeDurations: [{ "startTime": "06:21:00", "endTime": "12:30:00" }],
                childItems: [{ "gname": { "zh": "中文商品组名", "en": "", "jp": "" }, "selectType": "single", "seq": "0", "items": [] }],
                itemAttrs: [],
                seq: 0,
                busiType: 1
            }
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px !important;
    text-align: center;
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>
