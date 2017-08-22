<template>
    <div class="intro-manage">
        <div class="intro-toolbar">
            <el-button type="primary">新建提案</el-button>
        </div>
        <el-row>            
            <el-col :sm="4" :md="3" :lg="3">                
                <div class="intro-nav" id="intro-nav">
                    <ul class="intro-list" id="intro-list">
                        <li class="selected">
                            <a href="javascript:;">全部提案</a>
                        </li>
                        <li v-for="item in introGroupDatas" :key="item.id">
                            <a href="javascript:;">{{item.groupNamePojo.zh}}</a>
                        </li>                       
                    </ul>
                </div>
            </el-col>
            <el-col :sm="20" :md="21" :lg="21">
                <div class="content-list" id="content-list" style="display:none;">
                    <el-row>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。
                                </p>
                            </el-card>
                        </el-col>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。
                                </p>
                            </el-card>
                        </el-col>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。
                                </p>
                            </el-card>
                        </el-col>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。我是一个不怎么好得提案，但是凑合的看吧。我就是测试数据。
                                </p>
                            </el-card>
                        </el-col>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。
                                </p>
                            </el-card>
                        </el-col>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。
                                </p>
                            </el-card>
                        </el-col>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。
                                </p>
                            </el-card>
                        </el-col>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。
                                </p>
                            </el-card>
                        </el-col>
                        <el-col :sm="8" :md="8" :lg="8">
                            <el-card class="box-card intro-card" :body-style="{ padding: '0px' }">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">提案名称</span>                                    
                                    <el-button style="float: right; margin-left:10px;" type="text"><i class="el-icon-delete"></i></el-button>
                                    <el-button style="float: right;" type="text"><i class="el-icon-edit"></i></el-button>
                                </div>
                                <p>
                                    我是一个不怎么好得提案，但是凑合的看吧。
                                </p>
                            </el-card>
                        </el-col>
                    </el-row> 
                </div>
                <div class="add-intro-form">
                    <el-form :model="introForm" :rules="rules" ref="introForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="提案分组" prop="introGroup">
                            <!-- <el-input v-model="introForm.name" class="input440"></el-input> -->
                            <el-select v-model="whichGroup" placeholder="请选择">
                                <el-option
                                v-for="item in introGroupDatas"
                                :key="item.id"
                                :label="item.groupNamePojo.zh"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="提案名称" prop="title">
                            <el-input v-model="introForm.title" class="input440"></el-input>
                        </el-form-item>                        
                        <el-form-item label="提案内容" prop="content">
                            <el-input type="textarea" class="input440" :autosize="{ minRows: 3, maxRows: 5}" v-model="introForm.content"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addIntro()">立即创建</el-button>
                            <el-button @click="resetForm('introForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            introForm:{
                introGroup:'',
                title:'',
                content:''
            },
            rules:{
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }                    
                ],
                content:[
                    { required: true, message: '请输入提案内容', trigger: 'blur' },
                    { max: 10, message: '最多两百个字符', trigger: 'blur' }
                ]
            },
            introGroupDatas:[],
            introDatas:[],
            whichGroup:''
            
        }
    },

    mounted() {

        //动态计算属性导航的高度
        var introduceHeight = document.body.clientHeight - 296;
        document.getElementById("intro-nav").style.height = introduceHeight + 'px';
        document.getElementById("content-list").style.height = introduceHeight + 'px';

    },

    created() {
        //默认获取属性列表
        this.getIntroGroupList();
        this.getIntroList();        
    },

    methods: {

        getIntroGroupList(){
            axios.get('/coron-web/introduceGroup/list').then(response => {
                console.log("提案列表组",response);
                
                response.data.status && (this.introGroupDatas = response.data.entry);


            }).catch(error => {
                console.log(error);
            })
        },

        getIntroList(){
            axios.get('/coron-web/introduce/list').then(response => {
                console.log("获取提案列表",response);
                response.data.status && (this.introDatas = response.data.rows);
            }).catch(error => {
                console.log(error);
            })
        },

        addIntro(){
            let addParams = {
                groupId:this.whichGroup,
                titlePojo:{zh:this.introForm.title,jp:'',en:''},
                contentPojo:{zh:this.introForm.content,jp:'',en:''},
                type:1,
                position:0
            };

            axios.post('/coron-web/introduce/add',addParams).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })            

        }


    }

}
</script>

<style scoped>

.intro-nav {
    border-right: 1px solid #d1dbe5;
    padding-top: 20px;
}
.intro-toolbar {
    /* background: #f8f8f9; */
    padding: 8px 0 20px 20px;
    border-bottom: solid 1px #d1dbe5;
}

ul.intro-list {
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0;
}

ul.intro-list li {
    height: 42px;
    line-height: 42px;
    padding: 0 18px;
}

ul.intro-list li a {
    color: #6B6B6B;
}

li.selected {
    border-left: 3px solid #20A0FF;
    background-color: rgba(242, 242, 242, 1);
}

.content-list {
    padding: 8px;
    overflow-y: scroll;
}

.content-list .intro-card {
    margin:0 8px 8px 0;
}

.content-list .intro-card p {
    padding: 8px 10px;
    margin: 10px 0;
    height:180px;
    text-indent:2em;
}

.add-intro-form {
    padding: 20px 10px;
}
.input440 {
    width: 440px;
}

</style>
