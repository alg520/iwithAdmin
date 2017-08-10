<template>
    <div class="attr-nav" id="attr-nav">    
        <ul class="attr-list" id="attr-list">
            <li class="selected">
                <a href="javascript:;">全部</a>
            </li>
            <li v-for="item in tableData" :key="item.id">
                <a v-text="item.name" href="javascript:;" class="inblock"></a>
                <span class="pull-right">
                    <el-button type="text" size="small">
                        <i class="el-icon-edit"></i>
                    </el-button> 
                    <el-button type="text" size="small">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </span>
            </li>
            <li v-if="attrinputVisible">
                <el-input
                    size="small"
                    placeholder="请输入内容"
                    v-model="attrName" style="width:70%;">
                </el-input>
                <el-button type="primary" icon="plus" size="small" @click="addAttr()"></el-button>
            </li>
            <li v-else>
                <el-button type="primary" icon="plus" size="small" @click="addAttr()">添加分类</el-button>
            </li>
        </ul>
    
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
            }],
            attrinputVisible:false,
            attrName:''
        }
    },
    mounted: function () {
        //动态计算属性导航的高度
        var attrNavHeight = document.body.clientHeight - 171;
        document.getElementById("attr-nav").style.height = attrNavHeight + 'px';


    },
    methods: {
        addAttr: function () {            
            this.attrinputVisible = true;
        }
    }
}
</script>

<style>
.attr-nav {
    border-right: 1px solid #ccc;
    padding-top: 20px;
}

ul.attr-list {
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0;
}

ul.attr-list li {
    height: 42px;
    line-height: 42px;
    padding: 0 18px;
}

ul.attr-list li a {
    color:#6B6B6B;
}

li.selected {
    border-left: 5px solid #20A0FF;
    background-color: rgba(242, 242, 242, 1);
}
.addAttr-input {
    
}
</style>
