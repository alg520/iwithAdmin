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
                                <el-option
                                v-for="item in catalogDatas"
                                :key="item.catalogId"
                                :label="item.nameObject.zh"
                                :value="item.catalogId">
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
                        <el-form-item label="类型">
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
                                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
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
                        <el-form-item label="图片">
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="销售时段" prop="timeDurations" v-if="productForm.itemType != 3">
                            <el-select v-model="productForm.timeDurations" multiple placeholder="请选择时段">
                                <el-option
                                v-for="item in timeDatas"
                                :key="item.timeDuration"
                                :label="item.name"
                                :change="getT()"
                                :value="item.timeDuration">
                                </el-option> 
                            </el-select>
                            <el-button type="primary" icon="plus" @click="timeDialogVisible = true"></el-button>
                        </el-form-item>
                        <el-form-item label="属性设置" prop="itemAttr" v-if="productForm.itemType == 1">                            
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
                                            <el-tag :key="tag" v-for="tag in productForm.attrGlist" :closable="true"
                                            :close-transition="false"
                                            @close="handleClose(tag)">
                                            {{tag}}
                                            </el-tag>
                                            <el-button class="button-new-tag" size="small" type="primary" @click="selectAttr()">选择属性</el-button>
                                        </el-form-item>
                                    </el-form>
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
                                                <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
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
                                        <el-button style="float: right;" type="text" @click="addAttrGroup()">
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
                                            <el-tag :key="tag" v-for="tag in productForm.itemGlist" :closable="true"
                                            :close-transition="false"
                                            @close="handleClose(tag)">
                                            {{tag}}
                                            </el-tag>
                                            <el-button class="button-new-tag" size="small" type="primary" @click="selectAttr()">选择商品</el-button>
                                        </el-form-item>
                                    </el-form>
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
                                                <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                                    移除
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>  
                                </el-card>                                                              
                            </template>
                        </el-form-item>                        
                        
                        <!-- <el-form-item label="" v-if="productForm.itemType == 1">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 24px;">附属商品组1</span>
                                    <el-button style="float: right;" type="text">
                                        <i class="el-icon-close"></i>
                                    </el-button>
                                </div>
                                <el-form label-width="100px">
                                    <el-form-item label="组名称">
                                        <el-input style="width:50%;" size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="类型">
                                        <el-radio-group v-model="attrType" size="small">
                                            <el-radio-button label="single">单选</el-radio-button>
                                            <el-radio-button label="multi">多选</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="属性列表">
                                        <el-button :plain="true" type="info" size="small">选择附属商品</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-card>
                        </el-form-item> -->
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
                <el-form-item label="时段名称" :label-width="formLabelWidth">
                    <el-input v-model="attrListForm.name" auto-complete="off" class="input193"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="attrListDialogVisible = false">取 消</el-button>
                <el-button type="primary">立即添加</el-button>
            </div>
        </el-dialog>

        <el-dialog title="商品列表" :visible.sync="itemListDialogVisible" class="addDialog">
            <el-form :model="attrListForm">
                <el-form-item label="时段名称" :label-width="formLabelWidth">
                    <el-input v-model="attrListForm.name" auto-complete="off" class="input193"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="attrListDialogVisible = false">取 消</el-button>
                <el-button type="primary">立即添加</el-button>
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
            catalogDatas:[],
            timeDatas:[{name:'全天',timeDuration:{startTime:'00:00',endTime:'23:59'}}],
            attrGroups: [
                {
                    gname:'口味',
                    selectType: 'single',  //multi
                    seq: 0,
                    attrs: [
                        { attrId: 0,name:'测试00' },
                        { attrId: 1,name:'测试11' },
                        { attrId: 2,name:'测试22' },
                        { attrId: 3,name:'测试33' }
                    ]
                }
            ],
            attrType: 'single',
            inputVisible: false,
            timeDialogVisible: false,
            attrDialogVisible: false,
            attrListDialogVisible: false,
            itemListDialogVisible:false,
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
                timeDurationList:[],    //可售时段列表
                timeDurations: [],     //可售时段

                attrGname:'',           //属性组名称
                attrGtype:'single',     //属性组类型
                attrGlist:[],           //属性组列表

                itemGname:'',           //附属商品组名称--配菜
                itemGtype:'multi',      //附属商品组类型
                itemGlist:[],           //配菜列表


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


                timeDurations2: [{ "startTime": "06:21:00", "endTime": "12:30:00" }],
                discount: '',
                itemNum: '',
                childItems2: [{ "gname": { "zh": "中文商品组名", "en": "", "jp": "" }, "selectType": "single", "seq": "0", "items": [] }],
                itemAttrs2: [{ attrs: [{ attrGroupId: 2, attrId: 1, name: { zh: '' }, selected: true }], gname: { zh: '' }, selectType: "multi", seq: 1 }]
            },
            rules: {
                itemNameObject: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        //默认获取属性列表
        this.getCatalogList();
        this.getTimeList();
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

        getT(){
            console.log(this.productForm.timeDurations);
        },

        getCatalogList() {
            axios.get('/coron-web/catalog/getCatalogs')
                .then(response => {
                    console.log(response);
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
                    if(response.data.rows && response.data.rows.length > 0){
                        response.data.rows.forEach((item,index) => {
                            let obj = {name:item.nameGL.zh,timeDuration:{startTime:item.startTime,endTime:item.endTime}};
                            this.timeDatas.push(obj);                            
                            console.log("哈哈哈",this.timeDatas);
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

        addItems () {
            let addParams = {
                itemNo:this.productForm.itemNo,
                itemNameObject:{zh:this.productForm.itemName,jp:'',en:''},
                catalogId:this.productForm.catalogId,
                originPrice:this.productForm.originPrice,
                picUrl:'http://imglf.nosdn.127.net/img/Q0RPNGd0czV3aEZQQ0lZMmtkbC9HVWRqcG9YekdtZWRXNS9qZG8vRkc4NldldlRNelYrM3F3PT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg%7Cwatermark&type=2&text=wqkg5bCP6KKr5Y2VIC8gaHVjaGVuc2kubG9mdGVyLmNvbQ==&font=bXN5aA==&gravity=southwest&dissolve=30&fontsize=240&dx=8&dy=10&stripmeta=0',
                itemDescObject:{zh:this.productForm.itemDesc,jp:'',en:''},
                itemType:this.productForm.itemType,
                timeDurations:this.productForm.timeDurations,
                seq:1,
                busiType:1
            };

            axios.post('/coron-web/item/add',addParams).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);                
            })
        },

        addAttr() {

            let groupItem = {
                gname: { zh: '' },
                selectType: 'single',  //multi
                seq: 0,
                attrs: [
                    { attrId: 0 }
                ]
            };
            this.attrGroups.push(groupItem);
            console.log(this.attrGroups);

        },

        selectAttr(){
            axios.get('/coron-web/itemAttr/list').then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        },

        addAttrGroup() {

            let attrItem = {
                gname: this.productForm.attrGname,
                selectType: this.productForm.attrGtype,  //multi
                seq: 0,
                attrs: [
                    { attrId: 0,name:'测试00' }
                ]
            };

            if(this.productForm.attrGname != ''){
                this.attrGroups.push(attrItem);
            } else {
                this.$message({
                    type:'info',
                    message:'属性组名称不能为空！'
                });
            }
            
        },

        delAttrGroup(){
            
        },

        closeAttrGroup(index) {
            //this.attrGroups.splice(index,1);            
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
