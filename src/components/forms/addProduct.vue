<template>
    <div class="addProductForm">
        <el-row>
            <el-col :span="18">
                <div class="grid-content bg-purple">
                    <el-form ref="productForm" :model="productForm" :rules="rules" label-width="100px">
                        <el-form-item label="菜品编号" prop="itemNo">
                            <el-input v-model="productForm.itemNo" placeholder="菜品编号"></el-input>
                        </el-form-item>
                        <el-form-item label="所属目录" prop="catalogId" v-if="productForm.itemType != 3">
                            <el-select v-model="productForm.catalogId" placeholder="请选择分类">
                                <el-option v-for="item in catalogDatas" :key="item.catalogId" :label="item.nameObject.zh" :value="item.catalogId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜品名称" prop="itemName">
                            <el-input v-model="productForm.itemName" placeholder="菜品名称"></el-input>
                        </el-form-item>
                        <el-form-item label="菜品介绍" prop="itemDesc">
                            <el-input type="textarea" :rows="2" placeholder="请输入菜品介绍" v-model="productForm.itemDesc">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="类型" prop="itemType">
                            <el-radio-group v-model="productForm.itemType">
                                <el-radio :label="1">单点</el-radio>
                                <el-radio :label="2">套餐</el-radio>
                                <el-radio :label="3">配菜</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="所含商品" v-if="productForm.itemType == 2">
                            <el-button type="text">
                                <i class="el-icon-plus"></i>添加套餐内商品
                            </el-button>
                            <el-table :data="attrGroups" border style="width: 100%; margin-top:10px;" max-height="250">
                                <el-table-column prop="gname" label="名称" width="120">
                                </el-table-column>
                                <el-table-column prop="selectType" label="类型" width="120">
                                </el-table-column>
                                <el-table-column prop="attrs" label="属性列表">
                                    <template scope="scope">
                                        <el-tag v-for="attr in scope.row.attrs" :key="attr.attrId" type="success">{{attr.name}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="80">
                                    <template scope="scope">
                                        <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">
                                            移除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item label="原价(元)" prop="originPrice">
                            <el-input v-model="productForm.originPrice" placeholder="请输入商品原价"></el-input>
                        </el-form-item>
                        <el-form-item label="折后价(元)" prop="discountPrice" v-if="productForm.itemType != 3">
                            <el-input v-model="productForm.discountPrice" placeholder="请输入商品折后价"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" prop="picUrl">
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="销售时段" prop="timeDurations" v-if="productForm.itemType != 3">
                            <el-select v-model="productForm.timeDurations" multiple placeholder="请选择时段">
                                <el-option v-for="item in timeDatas" :key="item.timeDuration" :label="item.name" :change="getT()" :value="item.timeDuration">
                                </el-option>
                            </el-select>
                            <el-button type="primary" icon="plus" @click="timeDialogVisible = true"></el-button>
                        </el-form-item>
                        <el-form-item label="属性设置" v-if="productForm.itemType == 1">
                            <template>
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span style="line-height: 24px;">属性组添加</span>
                                        <el-button style="float: right;" type="text" @click="addAttrGroup()">
                                            <i class="el-icon-plus"></i>添加
                                        </el-button>
                                    </div>
                                    <el-form label-width="120px" :inline="true">
                                        <el-form-item label="属性组名称">
                                            <el-input style="width:100%;" size="small" placeholder="请输入属性组名称" v-model="productForm.attrGname"></el-input>
                                        </el-form-item>
                                        <el-form-item label="类型">
                                            <el-radio-group v-model="productForm.attrGtype" size="small">
                                                <el-radio-button label="single">单选</el-radio-button>
                                                <el-radio-button label="multi">多选</el-radio-button>
                                            </el-radio-group>
                                        </el-form-item>
                                        <br>
                                        <el-form-item label="属性列表">
                                            <el-tag :key="tag" v-for="tag in productForm.attrGlist" :closable="true" :close-transition="false" @close="handleClose(tag)">
                                                {{tag.name.zh}}
                                            </el-tag>
                                            <el-button class="button-new-tag" size="small" type="primary" @click="selectAttr()">选择属性</el-button>
                                        </el-form-item>
                                    </el-form>
                                    <el-table :data="attrGroups" border style="width: 100%; margin-top:10px;" max-height="250">
                                        <el-table-column prop="gname.zh" label="名称" width="120">
                                        </el-table-column>
                                        <el-table-column prop="selectType" label="类型" width="120">
                                        </el-table-column>
                                        <el-table-column prop="attrs" label="属性列表">
                                            <template scope="scope">
                                                <el-tag v-for="attr in scope.row.attrs" :key="attr.itemAttrId" type="success">{{attr.name.zh}}</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" width="80">
                                            <template scope="scope">
                                                <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">
                                                    移除
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-card>
                            </template>
                        </el-form-item>
                        <el-form-item label="附属商品设置" v-if="productForm.itemType == 1">
                            <template>
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span style="line-height: 24px;">附属商品组添加</span>
                                        <el-button style="float: right;" type="text" @click="addItemGroup()">
                                            <i class="el-icon-plus"></i>添加
                                        </el-button>
                                    </div>
                                    <el-form label-width="120px" :inline="true">
                                        <el-form-item label="附属商品组名称">
                                            <el-input style="width:100%;" size="small" placeholder="请输入附属商品组名称" v-model="productForm.itemGname"></el-input>
                                        </el-form-item>
                                        <el-form-item label="类型">
                                            <el-radio-group v-model="productForm.itemGtype" size="small">
                                                <el-radio-button label="single">单选</el-radio-button>
                                                <el-radio-button label="multi">多选</el-radio-button>
                                            </el-radio-group>
                                        </el-form-item>
                                        <br>
                                        <el-form-item label="附属商品列表">
                                            <!-- <el-button :plain="true" type="info" size="small" @click="attrListDialogVisible = true">添加属性</el-button> -->
                                            <el-tag :key="tag" v-for="tag in productForm.itemGlist" :closable="true" :close-transition="false" @close="handleClose(tag)">
                                                {{tag.itemNameObject.zh}}
                                            </el-tag>
                                            <el-button class="button-new-tag" size="small" type="primary" @click="getSideDishes()">选择商品</el-button>
                                        </el-form-item>
                                    </el-form>
                                    <el-table :data="sideDishGroups" border style="width: 100%; margin-top:10px;" max-height="250">
                                        <el-table-column prop="gname.zh" label="名称" width="120">
                                        </el-table-column>
                                        <el-table-column prop="selectType" label="类型" width="120">
                                        </el-table-column>
                                        <el-table-column label="配菜列表">
                                            <template scope="scope">
                                                <el-tag v-for="item in scope.row.items" :key="item.itemId" type="success">{{item.itemNameObject.zh}}</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" width="80">
                                            <template scope="scope">
                                                <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">
                                                    移除
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-card>
                            </template>
                        </el-form-item>                        
                        <!-- <el-form-item label="商品标签">
                                <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" :close-transition="false">
                                    {{tag}}
                                </el-tag>
                                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small">添加</el-button>
                            </el-form-item> -->
                        <el-form-item>
                            <el-button type="primary" @click="addItems()">立即添加</el-button>
                            <el-button>保存并添加下一个商品</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>

        <el-dialog title="属性列表" :visible.sync="attrListDialogVisible" class="addDialog">
            <el-form :model="attrListForm">
                <el-form-item label="属性列表名称:" :label-width="formLabelWidth">
                   <template>
                        <el-checkbox-group v-model="checkAttrList" @change="handleCheckedAttrsChange">
                            <el-checkbox v-for="item in itemAttrDatas" :label="item.itemAttrId" :key="item.itemAttrId">{{item.attrNameObject.zh}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="attrListDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectedAttr()">立即添加</el-button>
            </div>
        </el-dialog>

        <el-dialog title="商品列表" :visible.sync="itemListDialogVisible" class="addDialog">
            <el-form :model="attrListForm">
                <el-form-item label="配菜列表:" :label-width="formLabelWidth">
                    <template>
                        <el-checkbox-group v-model="checkSideDishList" @change="handleCheckedDishChange">
                            <el-checkbox v-for="item in sideDishDatas" :label="item.itemId" :key="item.itemId">{{item.itemNameObject.zh}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="itemListDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectedSideDish()">立即添加</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加时段" :visible.sync="timeDialogVisible" class="addDialog">
            <el-form :model="timeDurationForm">
                <el-form-item label="时段名称" :label-width="formLabelWidth">
                    <el-input v-model="timeDurationForm.name" auto-complete="off" class="input193"></el-input>
                </el-form-item>
                <el-form-item label="时间范围" :label-width="formLabelWidth">
                    <template>

                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="timeDialogVisible = false">取 消</el-button>
                <el-button type="primary">立即添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            imageUrl: '',
            dynamicTags: ["标签1"],
            catalogDatas: [],
            timeDatas: [{ name: '全天', timeDuration: { startTime: '00:00', endTime: '23:59' } }],
            itemAttrDatas:[],
            checkAttrList:[],
            sideDishDatas:[],
            checkSideDishList:[],
            attrGroups: [],
            sideDishGroups:[],
            inputVisible: false,
            timeDialogVisible: false,
            attrDialogVisible: false,
            attrListDialogVisible: false,
            itemListDialogVisible: false,
            formLabelWidth: '120px',
            attrListForm: {
                name: ''
            },
            timeDurationForm: {
                name: '',
                startTime: '06:30',
                endTime: '22:00'
            },
            productForm: {
                gname: '',
                selectType: 'single',

                itemNameObject: { zh: '' }, //必填
                itemDescObject: { zh: '' },
                shopId: '',   //店铺id

                itemNo: '',         //必填--菜品编号
                catalogId: '',      //必填--所属分类
                itemName: '',       //必填 -- 菜品名称
                itemDesc: '',       //菜品描述
                itemType: 1,        //必填  1单点 2套餐 3配菜
                originPrice: '',    //必填  -- 原价

                discountPrice: '',   //折扣价
                picUrl: '',  //必填  -- 图片
                timeDurationList: [],   //可售时段列表
                timeDurations: [],     //可售时段

                attrGname: '',           //属性组名称
                attrGtype: 'single',     //属性组类型
                attrGlist: [],           //属性组列表

                itemGname: '',           //附属商品组名称--配菜
                itemGtype: 'multi',      //附属商品组类型
                itemGlist: [],           //配菜列表

                itemAttrs: [
                    {
                        title: '属性组',
                        gname: { zh: '' },
                        selectType: 'single',  //multi
                        seq: 0,
                        attrs: [
                            { attrId: 0 }
                        ]
                    }
                ],
                itemAttr: '',
                childItems: [
                    {
                        gname: { zh: '' },
                        selectType: 'single',
                        seq: 0,
                        items: [

                        ]
                    }
                ],
                seq: 1,  //必填
                busiType: 1,  //必填
            },
            rules: {                
                itemNo:[
                    { required: true, message: '请输入商品编号', trigger: 'blur' }
                ],
                catalogId:[
                    {required:true, message:'请选择商品分类',trigger: 'blur'}
                ],
                itemName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }                    
                ],
                originPrice:[
                    {required:true,message:'请输入商品原价',trigger:'blur'}
                ],
                itemType:[
                    {required:true,message:'请选择商品类型',trigger:'blur'}
                ],
                picUrl:[
                    {required:true,message:'请选择图片',trigger:'blur'}
                ]

            }
        }
    },
    created() {
        //默认获取属性列表
        this.getCatalogList();
        this.getTimeList();
        this.getItemAttrList();
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
        },

        handleCheckedAttrsChange(value) {

            console.log("属性选中更改事件",value);

            //console.log(value);            
            //console.log(this.checkAttrList);
            //this.productForm.attrGlist = value;
            
        },
        handleCheckedDishChange(value){
            console.log("选取的配菜",value);
        },

        getT() {
            //console.log(this.productForm.timeDurations);
        },

        getCatalogList() {
            axios.get('/coron-web/catalog/getCatalogs')
                .then(response => {
                    
                    !!response.data.entry && (this.catalogDatas = response.data.entry);

                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },
        getTimeList() {

            axios.get('/coron-web/shopTimeDuration/list')
                .then(response => {

                    if (response.data.status) {

                        //response.data.rows && (this.timeDatas = response.data.rows);
                        //{name:'全天',timeDuration:{startTime:'00:00',endTime:'23:59'}}
                        if (response.data.rows && response.data.rows.length > 0) {
                            response.data.rows.forEach((item, index) => {
                                let obj = { name: item.nameGL.zh, timeDuration: { startTime: item.startTime, endTime: item.endTime } };
                                this.timeDatas.push(obj);                                
                            });
                        }

                    } else {
                        this.$message({
                            type: 'info',
                            message: '数据错误'
                        });
                    }

                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },
        getItemAttrList() {
            axios.get('/coron-web/itemAttr/list')
                .then(response => {
                    
                    !!response.data.rows && (this.itemAttrDatas = response.data.rows);
                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },
        //获取配菜
        getSideDishes(){
            this.itemListDialogVisible = true;

            axios.get('/coron-web/item/getSideDishes').then(response => {
                console.log("配菜列表",response.data.entry);
                this.sideDishDatas = response.data.entry;

            }).catch(error => {
                
                this.$message({
                    type: 'info',
                    message: '配菜列表请求失败！'
                });
                console.log(error);
            })
        },

        addItems() {
            let addParams = {
                itemNo: this.productForm.itemNo,
                itemNameObject: { zh: this.productForm.itemName, jp: '', en: '' },
                catalogId: this.productForm.catalogId,
                originPrice: this.productForm.originPrice,
                discountPrice:this.productForm.discountPrice,
                picUrl: 'http://imglf.nosdn.127.net/img/Q0RPNGd0czV3aEZQQ0lZMmtkbC9HVWRqcG9YekdtZWRXNS9qZG8vRkc4NldldlRNelYrM3F3PT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg%7Cwatermark&type=2&text=wqkg5bCP6KKr5Y2VIC8gaHVjaGVuc2kubG9mdGVyLmNvbQ==&font=bXN5aA==&gravity=southwest&dissolve=30&fontsize=240&dx=8&dy=10&stripmeta=0',
                itemDescObject: { zh: this.productForm.itemDesc, jp: '', en: '' },
                itemType: this.productForm.itemType,
                timeDurations: this.productForm.timeDurations.length == 0 ? [{ startTime: '00:00', endTime: '23:59' }]: this.productForm.timeDurations,
                childItems:this.attrGroups,
                itemAttrs:this.sideDishGroups,
                seq: 1,
                busiType: 1
            };

            axios.post('/coron-web/item/add', addParams).then(response => {
                console.log("菜品添加成功",response);
                if(response.data.status == true){
                    this.$message({
                        type:'info',
                        message:'菜品添加成功'
                    })
                    this.$notify({
                        title: '成功',
                        message: '菜品添加成功',
                        type: 'success'
                    });
                    //添加成功后需要跳转到菜品列表页
                }

            }).catch(error => {
                console.log(error);
                this.$notify({
                    title: '成功',
                    message: '这是一条成功的提示消息',
                    type: 'success'
                });
            })
        },        
        //选取属性列表
        selectAttr() {
            this.attrListDialogVisible = true;
        },
        // 选中属性列表
        selectedAttr(){
            var self = this;

            self.productForm.attrGlist = [];

            self.itemAttrDatas.forEach((item,index) => {
                
                self.checkAttrList.forEach((item2,index2) => {
                    
                    if(item.itemAttrId == item2) {
                        //选中的数据结构  {itemAttrId:'',name:{zh:'',jp:'',en:''}}                        
                        self.productForm.attrGlist.push({itemAttrId:item2,name:{zh:item.attrNameObject.zh}});
                    }
                })
                
            })
            this.attrListDialogVisible = false;

        },

        // 选中配菜列表
        selectedSideDish(){
            var self = this;

            self.productForm.itemGlist = [];

            self.sideDishDatas.forEach((item,index) => {
                
                self.checkSideDishList.forEach((item2,index2) => {
                    
                    if(item.itemId == item2) {
                        //选中的数据结构  {itemAttrId:'',name:{zh:'',jp:'',en:''}}                        
                        self.productForm.itemGlist.push(item);
                        
                    }
                })
                
            })
            console.log("添加的配菜",this.productForm.itemGlist);
            this.itemListDialogVisible = false;

        },

        //根据索引删除已选中的标签
        handleClose(tag) {            
            this.productForm.attrGlist.splice(this.productForm.attrGlist.indexOf(tag), 1);
            this.checkAttrList.splice(this.checkAttrList.indexOf(tag.itemAttrId),1);
        },        

        deleteRow(rowIndex){
            //根据索引删除数据
            this.attrGroups.splice(rowIndex, 1);
        },

        //选中配菜列表
        selectedItems(){
            
        },

        addAttrGroup() {

            let attrItem = {
                gname: {zh:this.productForm.attrGname},
                selectType: this.productForm.attrGtype == 'single' ? '单选':'多选',  //multi
                seq: 0,
                attrs: this.productForm.attrGlist
            };

            if (this.productForm.attrGname != '' && this.productForm.attrGlist.length > 0) {
                
                this.attrGroups.push(attrItem);
                console.log("添加后的属性组",this.attrGroups);
                this.productForm.attrGname = '';
                this.productForm.attrGlist =[];
                this.checkAttrList = [];

            } else {
                this.$message({
                    type: 'info',
                    message: '属性组名称不能为空！'
                });
            }

        },

        addItemGroup(){

            let itemSideDish = {
                gname:{zh:this.productForm.itemGname},
                selectType: this.productForm.itemGtype == 'single' ? '单选':'多选',  //multi
                seq: 0,
                items: this.productForm.itemGlist
            };

            if (this.productForm.itemGname != '' && this.productForm.itemGlist.length > 0) {
                this.sideDishGroups.push(itemSideDish);
                this.productForm.itemGname = '';
                this.productForm.itemGlist =[];
                this.checkSideDishList = [];
            } else {
                this.$message({
                    type: 'info',
                    message: '附属商品组名称不能为空！'
                });
            }

        },

        delAttrGroup() {

        },

        closeAttrGroup(index) {
            
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

.el-card__header {
    padding: 2px 20px !important;
}

.el-tag {
    margin-left: 8px;
}
</style>
