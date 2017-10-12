<template>
    <div >
        <!-- <v-pageTitle vtitle="主页"></v-pageTitle> -->

        <div class="clear"></div>

        <div style="margin:100px auto; text-align:center;">
            <img src="../../../static/images/robot.png" alt="">
            <img src="../../../static/images/logo.png" alt="">
        </div>

        <div>
            <input type="text" v-model="name" @blur="nameChange()">
            {{translateName}}
            {{$t('skin')}}
            {{language}}
        </div>

    </div>



</template>

<script>
    import vPageTitle from '../common/pageTitle.vue';
    import count from '../common/count.vue';
    import getLanguage from '../../utils/sysLanguage.js';
    import getTranslateResult from '../../utils/translate.js';
    export default {
        data(){
           return{
              name:'红烧鱼',
              translateName:'',
              language:''
           }
        },
        components:{
            vPageTitle,count
        },
        created(){
            var self = this;
            getTranslateResult('zh',self.name)
        },
        methods:{
            nameChange(){
                var self = this;

                this.language = getLanguage();
                
                getTranslateResult('zh',self.name);
            }
        }
    }
</script>

<style scoped>
    .el-col{
        /* margin-bottom:16px; */
        text-align:center;
    }
    .material-icons{
        font-size:80px;
        color:#ddd;
    }    
    
    .box-list{
        height:auto;
        text-align:left;
    }
    .box-list hr{
        height:1px;
        border:none;
        border-top:1px  dashed #ccc;
        margin-bottom:5px;
        margin-top:6px;

    }
</style>