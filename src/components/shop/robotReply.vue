<template>
    <div class="monrion-info">        
        <el-table :data="sceneLists" border style="width: 100%; text-align:center;">      
            <el-table-column prop="id" :label="$t('scene.id')" min-width="100" fixed="left">
            </el-table-column>            
            <el-table-column prop="title" :label="$t('scene.name')" width="180">
                <template scope="scope">
                    <span>中：{{scope.row.titlePojo.zh}}</span>
                    <br>
                    <span>英：{{scope.row.titlePojo.en}}</span>
                    <br>
                    <span>日：{{scope.row.titlePojo.jp}}</span>
                </template>
            </el-table-column>            
            <el-table-column prop="parametersPojo" :label="$t('scene.parameter')" min-width="180">
                <template scope="scope">
                    <el-tag
                    v-for="parameter in scope.row.parametersPojo"
                    :key="parameter.namePojo.zh"                    
                    type="primary"
                    >
                    {{parameter.namePojo.zh}}
                    </el-tag>                    
                </template>
            </el-table-column>
            <el-table-column prop="sceneCasePojo" :label="$t('scene.corpus')" min-width="180">
                <template scope="scope">
                    <p>中：{{scope.row.sceneCasePojo.zh}}</p>
                    <p>日：{{scope.row.sceneCasePojo.jp}}</p>
                    <p>英：{{scope.row.sceneCasePojo.en}}</p>
                </template>                
            </el-table-column>
            <el-table-column prop="sceneCasePojo" label="个性化语料" min-width="180">
                <template scope="scope">
                    <p>中：{{scope.row.sceneCasePojo.zh}}</p>
                    <p>日：{{scope.row.sceneCasePojo.jp}}</p>
                    <p>英：{{scope.row.sceneCasePojo.en}}</p>
                </template>                
            </el-table-column> 
            <el-table-column prop="userUpdatedPojo" :label="$t('scene.operator')" width="180">                
            </el-table-column> 
            <el-table-column prop="gmtUpdated" :label="$t('scene.updatetime')" width="180">                
            </el-table-column> 
            <el-table-column :label="$t('_global.action')" width="180" fixed="right">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="updateMotion(scope.row)">{{$t('_global.edit')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block turn-page" style="margin-top:10px;">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
            </el-pagination>
        </div>

        <el-dialog :title=" btnTag == 'add' ? $t('scene.add'):$t('scene.update')" :visible.sync="addSceneDialogVisible" class="addDialog">
            <el-form :model="addSceneForm" :rules="addSceneFormRules" ref="addSceneForm" label-width="150px">                

                <el-form-item :label="$t('scene.nameZH')" prop="sceneNameZH">
                    <el-input type="text" v-model="addSceneForm.sceneNameZH" placeholder="请输入中文场景名称"></el-input>
                </el-form-item>

                <el-form-item :label="$t('scene.nameJP')" prop="sceneNameJP">
                    <el-input type="text" v-model="addSceneForm.sceneNameJP" placeholder="请输入日文场景名称"></el-input>
                </el-form-item>

                <el-form-item :label="$t('scene.nameEN')" prop="sceneNameEN">
                    <el-input type="text" v-model="addSceneForm.sceneNameEN" placeholder="请输入英文场景名称"></el-input>
                </el-form-item>

                <el-form-item :label="$t('scene.parameterList')" prop="parameters">
                    <!-- <el-popover
                    ref="popoverParameter"
                    placement="right"
                    width="400"
                    trigger="click">
                        <el-checkbox-group 
                        v-model="checkedParameters">
                            <el-checkbox v-for="parameter in parameters" :label="parameter.namePojo.zh" :key="parameter.id">{{parameter.namePojo.zh}}</el-checkbox>
                        </el-checkbox-group>
                    </el-popover> -->
                    <!-- <el-tag
                    v-for="parameter in checkedParameters"
                    :key="parameter.id"
                    :closable="true"
                    type="success"
                    >
                    {{parameter.namePojo.zh}}
                    </el-tag> -->
                    <!-- <el-button type="primary" v-popover:popoverParameter icon="plus" size="small" @click="getParameters()"></el-button> -->
                    <el-select
                    v-model="checkedParameters"
                    multiple                                            
                    placeholder="请选择场景参数"
                    value-key="id"
                    @change="parameterChange()">
                        <el-option
                        v-for="parameter in parameters"
                        :key="parameter.id"
                        :label="parameter.namePojo.zh"
                        :value="parameter">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('scene.corpus')" prop="corpusZH">
                    <p>                       
                        <el-button 
                        v-for="parameter in checkedParameters"
                        :key="parameter.id"                        
                        type="info" size="mini" @click="insertParameter(parameter,'zh')">
                        {{parameter.namePojo.zh}}
                        </el-button>
                    </p>
                    <el-input v-model="addSceneForm.corpusZH" placeholder="请输入中文语料">                        
                    </el-input>
                    <p>                        
                        <el-button 
                        v-for="parameter in checkedParameters"
                        :key="parameter.id"
                        type="info" size="mini" @click="insertParameter(parameter,'jp')">
                        {{parameter.namePojo.jp}}
                        </el-button>
                    </p>
                    <el-input v-model="addSceneForm.corpusJP" placeholder="请输入日文语料">                        
                    </el-input>
                    <p>                       
                        <el-button
                        v-for="parameter in checkedParameters"
                        :key="parameter.id"
                        type="info" size="mini" @click="insertParameter(parameter,'en')">
                        {{parameter.namePojo.en}}
                        </el-button>
                    </p>                    
                    <el-input v-model="addSceneForm.corpusEN" placeholder="请输入英文语料">                        
                    </el-input>
                    <!-- <div contenteditable="true">
                        <p>点击输入语料</p>
                    </div> -->
                </el-form-item>

                <el-form-item :label="$t('scene.case')" prop="sceneCaseZH">
                    <el-input v-model="addSceneForm.sceneCaseZH" type="textarea" placeholder="请输入中文案例">                        
                    </el-input>
                    <p></p>
                    <el-input v-model="addSceneForm.sceneCaseJP" type="textarea" placeholder="请输入日文案例">                        
                    </el-input>
                    <p></p>
                    <el-input v-model="addSceneForm.sceneCaseEN" type="textarea" placeholder="请输入英文案例">                        
                    </el-input>
                </el-form-item>                
                
                <el-form-item>
                    <el-button v-if="btnTag == 'add'" type="primary" @click="addValidate()">{{$t('_global.confirm')}}</el-button>
                    <el-button v-else type="primary" @click="updateValidate()">{{$t('_global.lijiEdit')}}</el-button>
                    <el-button @click="addSceneDialogVisible = false">{{$t('_global.cancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import $http from "../../utils/http";
import Lockr from "lockr";
import MD5 from "js-md5";
export default {
  data() {
    return {      
      sceneLists: [],
      parameters:[],
      checkedParameters:[],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      addSceneDialogVisible: false,
      btnTag:'add',
      addSceneForm: {
        sceneNameZH:"",
        sceneNameJP:"",
        sceneNameEN:"",
        parameters:[],        
        corpusZH:"",
        corpusJP:"",
        corpusEN:"",
        sceneCaseZH:"",
        sceneCaseJP:"",
        sceneCaseEN:""
      },
      addSceneFormRules: {
        sceneNameZH:[
            { required:true , message:"请输入中文场景名称", trigger:'blur'}
        ],
        sceneNameJP:[
            { required:true , message:"请输入日文场景名称", trigger:'blur'}
        ],
        sceneNameEN:[
            { required:true , message:"请输入英文场景名称", trigger:'blur'}
        ],
        parameters:[
            { required:true , message:"请选择场景参数", trigger:'change'}
        ],
        corpusZH:[
            { required:true , message:"请输入中文语料", trigger:'blur'}
        ],
        corpusJP:[
            { required:true , message:"请输入中文语料", trigger:'blur'}
        ],
        corpusEN:[
            { required:true , message:"请输入中文语料", trigger:'blur'}
        ],
        sceneCaseZH:[
            { required:true , message:"请输入中文案例", trigger:'blur'}
        ],
        sceneCaseJP:[
            { required:true , message:"请输入日文案例", trigger:'blur'}
        ],
        sceneCaseEN                                                    :[
            { required:true , message:"请输入英文案例", trigger:'blur'}
        ]
      },
      midddleObj:{}
    };
  },
  created() {
    this.getSceneList();
  },
  computed: {
    
    baseUrl(){
        return `${window.location.origin}/coron-web/`;
    }

  },
  methods: {
    getSceneList() {
      $http
        .post("/coron-web/sceneShop/list", {          
          rp: this.pageSize,
          page: this.currentPage
        })
        .then(res => {
          
          if(res.status){
              this.sceneLists = res.rows;
              this.totalItems = res.total;
          } else {
              this.$message({
                  type:'error',
                  message:res.message
              });
          }
          
        });
    },

    openAddDialog(){
        this.addSceneDialogVisible = true;
        this.btnTag = 'add';
        this.addSceneFormReset();        
    },

    insertParameter(item,lang){
        console.log(item);
        if(lang == 'zh'){
            this.addSceneForm.corpusZH += item.valuePojo.zh;
        } else if (lang == 'jp'){
            this.addSceneForm.corpusJP += item.valuePojo.zh;
        } else if (lang == 'en'){
            this.addSceneForm.corpusEN += item.valuePojo.en;
        }
        
    },

    updateMotion(item){
        this.btnTag = 'update';
        this.addSceneDialogVisible = true;
        this.midddleObj = item;
        console.log(item);
        this.addSceneForm.sceneNameZH = item.titlePojo.zh;
        this.addSceneForm.sceneNameEN = item.titlePojo.en;
        this.addSceneForm.sceneNameJP = item.titlePojo.jp;        
        this.checkedParameters = item.parametersPojo;
        this.parameterChange();
        this.addSceneForm.corpusZH = item.corpusPojo.zh;
        this.addSceneForm.corpusEN = item.corpusPojo.en;
        this.addSceneForm.corpusJP = item.corpusPojo.jp;
        this.addSceneForm.sceneCaseZH = item.sceneCasePojo.zh;
        this.addSceneForm.sceneCaseJP = item.sceneCasePojo.jp;
        this.addSceneForm.sceneCaseEN = item.sceneCasePojo.en;
    },


    updateScenePost(){

        const updateData = {
            id:this.midddleObj.id,
            titlePojo:{
                zh:this.addSceneForm.sceneNameZH,
                en:this.addSceneForm.sceneNameEN,
                jp:this.addSceneForm.sceneNameJP
            },
            parametersPojo:this.checkedParameters,
            corpusPojo:{
                zh:this.addSceneForm.corpusZH,
                en:this.addSceneForm.corpusEN,
                jp:this.addSceneForm.corpusJP
            },
            sceneCasePojo:{
                zh:this.addSceneForm.sceneCaseZH,
                en:this.addSceneForm.sceneCaseEN,
                jp:this.addSceneForm.sceneCaseJP
            }                
        };

        $http.post('/coron-web/sceneShop/update',updateData).then(res => {            
            
            if(res.status){
                this.$message({
                    type:'success',
                    message:this.$t('motion.updateSuccess')
                });

                this.addSceneDialogVisible = false;
                this.getSceneList();
                
            } else {
                this.$message({
                    type:'error',
                    message:res.message
                });
            }

            this.addSceneDialogVisible = false;

        })
    },

    handleCurrentChange(page) {            
        this.getSceneList();
    },

    updateValidate(){
        this.$refs['addSceneForm'].validate((valid) => {

            if (valid) {
            
                this.updateScenePost();

            } else {
            
                this.$message({
                    type:'error',
                    message: this.$t('tips.rules.error')
                });

                return false;
            }

        });

    }

  }
};
</script>

<style scoped>
.monrion-info {
  padding: 10px 15px;
  background: #fff;
  text-align: center;
}

.monrion-info p {
  margin: 5px 0;
  line-height: 30px;
}
</style>
