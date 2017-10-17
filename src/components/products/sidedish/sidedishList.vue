<template>
    <div class="timeForm">
        <el-form :inline="true" :model="itemsForm">
            <!-- <el-form-item label="状态">
                <el-select v-model="itemsForm.isSale" placeholder="状态" size="small" @change="getSideDishList()">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未上架" value="true"></el-option>
                    <el-option label="已上架" value="false"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="">
                <el-input size="small" placeholder="请输入商品名称" v-model="itemsForm.itemName">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="getSideDishList()">查询</el-button>
                <el-button size="small" type="primary" @click="addsideDishDialog()">添加配菜</el-button>
                <!-- <el-button size="small" type="primary" @click="goSort()">商品排序</el-button> -->
            </el-form-item>
        </el-form>
        <el-table :data="productsList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" max-height="450">
            <el-table-column prop="itemNameObject.zh" label="商品名称">
                <template scope="scope">
                    <span v-if="_SHOPLANGUAGE == 0">{{scope.row.itemNameObject.zh}}</span>
                    <span v-if="_SHOPLANGUAGE == 1">{{scope.row.itemNameObject.en}}</span>
                    <span v-if="_SHOPLANGUAGE == 2">{{scope.row.itemNameObject.jp}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="originPrice" sortable label="价格">
            </el-table-column>
            <!-- <el-table-column label="商品类别">
                <template scope="scope">
                    <span>{{scope.row.itemType | parseProductType}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template scope="scope">
                    <span>{{scope.row.isSale | parseIsSale}}</span>
                </template>
            </el-table-column>
            <el-table-column label="图片">
                <template scope="scope">
                    <img :src="scope.row.picUrl" alt="图片" width="50" height="50">
                </template>
            </el-table-column> -->
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="text" size="small" @click="updatesideDishDialog(scope.row)">
                        <i class="el-icon-edit" title="编辑"></i>
                    </el-button>
                    <el-button type="text" size="small" @click="confirmDel(scope.row)">
                        <i class="el-icon-delete" title="删除"></i>
                    </el-button>
                    <!-- <el-button type="text" size="small" @click="switchSale(scope.row)" v-if="scope.row.isSale">
                        <i class="el-icon-plus" title="上架"></i>
                    </el-button>
                    <el-button type="text" size="small" @click="switchSale(scope.row)" v-if="!scope.row.isSale">
                        <i class="el-icon-minus" title="下架"></i>
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="block turn-page" style="margin-top:10px;">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
            </el-pagination>
        </div>

        <el-dialog :visible.sync="sidedishDialogVisible" class="addDialog" v-bind:title="titleTag" size="tiny">
            <el-form :model="productForm" ref="productForm" :rules="rules" label-width="100px">
                <!-- <el-form-item label="菜品编号" prop="itemNo">
                    <el-input v-model="productForm.itemNo" placeholder="菜品编号"></el-input>
                </el-form-item> -->
                <el-form-item label="菜品名称" prop="itemName">
                    <el-input v-model="productForm.itemName" placeholder="菜品名称" @blur="translateContent(productForm.itemName,'name')"></el-input>
                </el-form-item>
                <!-- <el-form-item label="菜品介绍" prop="itemDesc">
                    <el-input type="textarea" :rows="3" placeholder="请输入菜品介绍" v-model="productForm.itemDesc">
                    </el-input>
                </el-form-item> -->
                <el-form-item label="原价(元)" prop="originPrice">
                    <el-input type="number" v-model="productForm.originPrice" placeholder="请输入商品原价"></el-input>
                </el-form-item>
                <!-- <el-form-item label="图片" prop="picUrl">
                    <el-upload class="avatar-uploader" ref="sidedishUpload"
                    action="/coron-web/upload/itemUpload" 
                    :show-file-list="true" 
                    :on-success="handleItemPicSuccess" 
                    :on-remove="handleItemPicRemove"
                    :before-upload="beforeItemPicUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>                    
                </el-form-item> -->
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="sidedishDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSideDishPost()" v-if="btnTag == 'add'">立即添加</el-button>
                <el-button type="primary" @click="updateSideDishPost()" v-else>立即修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import $http from '../../../utils/http';
import Cookies from 'js-cookie';
import getLanguage from '../../../utils/sysLanguage.js';
import {baiduTranslate, returnTransArray} from '../../../utils/translate.js';
export default {
    data() {
        return {
            productsList: [],
            itemsForm: {
                itemName: '',
                itemType: '',
                busiType: 1,   //1点餐系统2民宿3零售
                isSale: '',
                itemNo: '',
                catalogId: null
            },
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            formLabelWidth: '120px',
            sidedishDialogVisible: false,
            dialogVisible: false,
            btnTag: '',
            titleTag: '',
            imageUrl: '',
            productForm: {
                itemNo: '',         //必填--菜品编号                
                itemName: '',       //必填 -- 菜品名称
                itemDesc: '',       //菜品描述
                originPrice: '',    //必填  -- 原价
                picUrl: '',         // -- 图片
                catalogId: -1,      //必填--所属分类
                itemType: 3,        //必填  1单点 2套餐 3配菜                                     
                seq: 1,  //必填
                busiType: 1,  //必填
            },
            rules: {
                itemNo: [
                    { required: true, message: '请输入菜品编号', trigger: 'blur' }
                ],
                itemName: [
                    { required: true, message: '请输入菜品名称', trigger: 'blur' }
                ],
                originPrice: [
                    { required: true, message: '请输入配菜价格', trigger: 'blur' }
                ]
            },
            formLabelWidth: '120px',
            midObj: {},
            sideDishTransArray:[]
        }
    },
    created() {

        this.getSideDishList();

    },
    computed:{
        _SHOPLANGUAGE(){            
            return Cookies.get('SHOPLANGUAGE');
        }
    },
    methods: {

        // 翻页
        handleCurrentChange(page) {
            this.getSideDishList();
        },

        beforeItemPicUpload(file) {

            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        handleItemPicSuccess(res, file, fileList) {
                        
            if (!res.status) {
                this.$message.error("上传失败：" + res.message);
            }
            this.imageUrl = URL.createObjectURL(file.raw);
            this.productForm.picUrl = res.entry;
            console.log(this.imageUrl);
            console.log(this.productForm.picUrl);
        },

        handleItemPicRemove(file, fileList){
            this.imageUrl = '';
            this.productForm.picUrl ='';
            fileList = [];
        },

        cancelUpload() {
            this.imageUrl = '';
            this.productForm.picUrl = '';
        },

        getSideDishList() {

            let getParams = {
                itemName: this.itemsForm.itemName,
                itemType: [3],
                isSale: this.itemsForm.isSale,
                languageType:0,
                rp: 10,
                page: this.currentPage,
                catalogId: -1
            };

            $http.post('/coron-web/item/list', getParams).then(response => {

                !!response.rows && (this.productsList = response.rows);
                this.totalItems = response.total;
                console.log(this.productsList);

            }).catch(error => {
                console.log(error);
                alert('网络错误，不能访问,请刷新页面重试！');
            })
        },

        addsideDishDialog() {
            this.btnTag = 'add';
            this.titleTag = "添加配菜";
            this.sidedishDialogVisible = true;
            this.clearForm();
        },

        addSideDishPost(){
            var self = this;
            self.$refs['productForm'].validate((valid) => {
                if(valid){
                    self.addSideDish();    
                } else {
                    self.$message({
                        type:'warning',
                        message:'请输入必填字段！'
                    })
                }
            })
        },

        translateContent(itemName,type){
            var self = this;
            let _language = self._SHOPLANGUAGE;
            itemName !== ''
            &&
            baiduTranslate(itemName,_language).then(res => {
                if(type == 'name'){
                    self.sideDishTransArray = returnTransArray(res);
                    console.log(" 添加配菜 ",self.sideDishTransArray);
                }
            })
        },

        addSideDish() {
            let sideDishNameObj = {zh:this.productForm.itemName,jp:this.productForm.itemName,en:this.productForm.itemName};
            if(this._SHOPLANGUAGE == 0){
                sideDishNameObj.zh = this.productForm.itemName;
            } else if (this._SHOPLANGUAGE == 1){
                sideDishNameObj.en = this.productForm.itemName;
            } else if(this._SHOPLANGUAGE == 2) {
                sideDishNameObj.jp = this.productForm.itemName;
            }

            if(this.sideDishTransArray.length > 0){
                sideDishNameObj = Object.assign(sideDishNameObj,this.sideDishTransArray[0]);
                console.log("合并后的配菜对象",sideDishNameObj);
            }

            const addParams = {
                itemNo: this.productForm.itemNo,
                itemNameObject: sideDishNameObj,
                itemDescObject: { zh: this.productForm.itemDesc, jp: this.productForm.itemDesc, en: this.productForm.itemDesc },
                catalogId: this.productForm.catalogId,
                originPrice: this.productForm.originPrice,
                picUrl: this.productForm.picUrl ? this.productForm.picUrl : null,
                itemType: this.productForm.itemType,
                timeDurations: [{ startTime: '00:00', endTime: '23:59' }],
                seq: 1,
                busiType: 1
            };

            axios({
                url: '/coron-web/item/add',
                method: 'post',
                data: addParams,
                headers: {
                    Language: 0
                }
            }).then(response => {

                if (response.data.status == true) {
                    this.$message({
                        type: 'info',
                        message: '配菜添加成功'
                    })                         
                    this.sidedishDialogVisible = false;                    
                    this.getSideDishList();
                    this.clearForm();
                } else {
                    this.$message.error(response.data.cnMessage)
                }

            }).catch(error => {
                console.log(error);                
                this.$message({
                    type:'error',
                    message:'添加失败'
                })
            })
        },

        updatesideDishDialog(item) {
            this.btnTag = 'update';
            this.titleTag = '修改配菜';
            this.sidedishDialogVisible = true;

            this.productForm.itemNo = item.itemNo;
            this.productForm.itemName = item.itemNameObject.zh;
            this.productForm.itemDesc = item.itemDescObject.zh;
            if(this._SHOPLANGUAGE == 0){          
                this.productForm.itemName = item.itemNameObject.zh;
                this.productForm.itemDesc = item.itemDescObject.zh;
            } else if (this._SHOPLANGUAGE == 1){          
                this.productForm.itemName = item.itemNameObject.en;
                this.productForm.itemDesc = item.itemDescObject.en;
            } else if(this._SHOPLANGUAGE == 2) {          
                this.productForm.itemName = item.itemNameObject.jp;
                this.productForm.itemDesc = item.itemDescObject.jp;
            }

            this.productForm.originPrice = item.originPrice;

            this.imageUrl = this.productForm.picUrl = item.picUrl;
            this.midObj = item;
        },

        updateSideDishPost(){
            var self = this;
            self.$refs['productForm'].validate((valid) => {
                if(valid){
                    self.updateSideDish();    
                } else {
                    self.$message({
                        type:'warning',
                        message:'请输入必填字段！'
                    })
                }
            })
        },

        updateSideDish() {

            let sideDishNameObj = {zh:this.productForm.itemName,jp:this.productForm.itemName,en:this.productForm.itemName};
            if(this.sideDishTransArray.length > 0){
                sideDishNameObj = Object.assign(sideDishNameObj,this.sideDishTransArray[0]);
                console.log("合并后的配菜对象",sideDishNameObj);
            }


            const updateParams = {
                itemId: this.midObj.itemId,
                itemNo: this.productForm.itemNo,
                itemNameObject: sideDishNameObj,
                itemDescObject: { zh: this.productForm.itemDesc, jp: this.productForm.itemName, en: this.productForm.itemName },
                catalogId: this.productForm.catalogId,
                originPrice: this.productForm.originPrice,
                picUrl: this.productForm.picUrl ? this.productForm.picUrl : null,
                itemType: this.productForm.itemType,
                timeDurations: [{ startTime: '00:00', endTime: '23:59' }],
                seq: 1,
                busiType: 1
            };

            axios({
                url: '/coron-web/item/update',
                method: 'post',
                data: updateParams,
                headers: {
                    Language: 0
                }
            }).then(response => {

                if (response.data.status == true) {
                    this.$message({
                        type: 'info',
                        message: '配菜修改成功'
                    })                    
                    this.sidedishDialogVisible = false;                    
                    this.getSideDishList();
                    this.clearForm();
                } else {
                    this.$message.error(response.data.cnMessage)
                }

            }).catch(error => {
                console.log(error);
                this.$message({
                    type:'error',
                    message:'添加失败'
                })
            })


        },

        delSideDish(item) {
            $http.post('/coron-web/item/del', {
                itemId: item.itemId
            }).then(response => {
                console.log(response);
                this.$message({
                    type: 'info',
                    message: '删除成功'
                });
                this.getSideDishList();
            }).catch(error => {
                console.log(error);
            })
        },

        confirmDel(item) {
            this.$confirm('确定要删除这个配菜吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'warning'
            }).then(() => {

                this.delSideDish(item);

            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });

            });
        },

        switchSale(item) {

            $http.post('/coron-web/item/switchSale', {
                itemId: item.itemId,
                isSale: !item.isSale
            }).then(response => {
                console.log(response);
                this.$message({
                    type: 'info',
                    message: '状态更新成功'
                });
                this.getSideDishList();
            }).catch(error => {
                console.log(error);
                this.$message({
                    type: 'error',
                    message: '状态更新失败'
                });
            })
        },

        clearForm(){
            this.productForm.itemNo ='';
            this.productForm.itemName ='';
            this.productForm.itemDesc ='';
            this.productForm.originPrice ='';            
            this.productForm.picUrl ='';
            this.imageUrl ='';        
        }

    }
}
</script>
<style scoped>
.timeForm {
    width: 98%;
    text-align: center;
    margin: 0 auto;
    padding: 20px 0;
}
</style>
