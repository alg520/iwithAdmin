<template>
    <div class="monrion-info">
        <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="openAddDialog()"> {{$t('scene.add')}} </el-button>
            </el-form-item>
        </el-form>
        <el-table :data="sceneLists" border style="width: 100%; text-align:center;">      
            <el-table-column prop="id" :label="$t('scene.id')" width="180">
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
            <el-table-column prop="parametersPojo" :label="$t('scene.parameter')" min-width="280">
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
            <el-table-column prop="sceneCasePojo" :label="$t('scene.corpus')" width="180">
                <template scope="scope">
                    <p>中：{{scope.row.sceneCasePojo.zh}}</p>
                    <p>日：{{scope.row.sceneCasePojo.jp}}</p>
                    <p>英：{{scope.row.sceneCasePojo.en}}</p>
                </template>                
            </el-table-column> 
            <!-- <el-table-column prop="userUpdatedPojo" :label="$t('scene.operator')" width="180">                
            </el-table-column>  -->
            <el-table-column prop="gmtUpdated" :label="$t('scene.updatetime')" width="180">                
            </el-table-column> 
            <el-table-column :label="$t('_global.action')" width="180" fixed="right">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="updateMotion(scope.row)">{{$t('_global.edit')}}</el-button>
                    <el-button type="danger" size="small" @click="confirmDel(scope.row)">{{$t('_global.delete')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block turn-page" style="margin-top:10px;">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems">
            </el-pagination>
        </div>

        <el-dialog :title=" btnTag == 'add' ? $t('scene.add'):$t('scene.update')" :visible.sync="addSceneDialogVisible" class="addDialog">
            <el-form :model="addSceneForm" :rules="addSceneFormRules" ref="addSceneForm" label-width="150px">                

                <el-form-item :label="$t('scene.nameZH')" prop="senceNameZH">
                    <el-input type="text" v-model="addSceneForm.senceNameZH" placeholder="请输入中文场景名称"></el-input>
                </el-form-item>

                <el-form-item :label="$t('scene.nameJP')" prop="sceneCaseJP">
                    <el-input type="text" v-model="addSceneForm.senceNameJP" placeholder="请输入日文场景名称"></el-input>
                </el-form-item>

                <el-form-item :label="$t('scene.nameEN')" prop="sceneCaseEN">
                    <el-input type="text" v-model="addSceneForm.senceNameEN" placeholder="请输入英文场景名称"></el-input>
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
                    filterable                        
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

                <el-form-item :label="$t('scene.corpus')" prop="motionNameZH">
                    <p> 
                        <b>中文参数</b>
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
                        <b>日文参数</b>
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
                        <b>英文参数</b>
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

                <el-form-item :label="$t('scene.case')" prop="motionNameJP">
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
        senceNameZH:"",
        senceNameJP:"",
        senceNameEN:"",
        parameters:[],        
        corpusZH:"",
        corpusJP:"",
        corpusEN:"",
        sceneCaseZH:"",
        sceneCaseJP:"",
        sceneCaseEN:""
      },
      addSceneFormRules: {
        senceNameZH:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        senceNameJP:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        senceNameEN:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        senceNameZH:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        corpusZH:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        corpusJP:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        corpusEN:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        sceneCaseZH:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        sceneCaseJP:[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
        ],
        sceneCaseEN                                                    :[
            { required:true , message:this.$t('motion.rules.code'), trigger:'blur'}
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
        .post("/coron-web/scene/list", {          
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
        this.addMotionFormReset();
        this.getParameters();
    },

    getParameters(){
        $http.get('/coron-web/sceneParameter/getAll').then(res => {
            console.log("全部场景",res);
            if(res.status){
                this.parameters = res.entry;
            }
        })
    },

    parameterChange(){
        console.log(this.checkedParameters);
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

    addSence() {

      const senceData = {
          titlePojo:{},
          parametersPojo:[],
          corpusPojo:{},
          sceneCasePojo:{}        
      };      

      $http.post('/coron-web/robotMotion/add',senceData).then(res => {          
          if(res.status){
              this.$message({
                  type:'success',
                  message:this.$t('motion.addSuccess')
              })
              this.getRobotMotionList();
              this.addMotionFormReset();
          } else {
              this.$message({
                  type:'error',
                  message:this.$t('motion.addError') + res.message
              })
          }

          this.addSceneDialogVisible = false;
      })


    },

    addValidate(){
        this.$refs['addMotionForm'].validate((valid) => {

            if (valid) {
            
                this.addSence();

            } else {
            
                this.$message({
                    type:'error',
                    message: this.$t('tips.rules.error')
                });

                return false;
            }

        });
          
    },



    updateMotion(item){
        this.btnTag = 'update';
        this.addMotionDialogVisible = true;        
        this.midddleObj = item;
        this.addMotionForm.motionCode = item.motionCode;
        this.addMotionForm.motionNameZH = item.motionNamePojo.zh;
        this.addMotionForm.motionNameEN = item.motionNamePojo.en;
        this.addMotionForm.motionNameJP = item.motionNamePojo.jp;
    },


    updateMotiontPost(){

        const updateData = {
            motionId:this.midddleObj.motionId,
            motionCode: this.addMotionForm.motionCode,
            motionNamePojo: {
                zh:this.addMotionForm.motionNameZH,
                en:this.addMotionForm.motionNameEN,
                jp:this.addMotionForm.motionNameJP
            }            
        };

        $http.post('/coron-web/robotMotion/update',updateData).then(res => {            
            
            if(res.status){
                this.$message({
                    type:'success',
                    message:this.$t('motion.updateSuccess')
                });

                this.addMotionDialogVisible = false;
                this.getRobotMotionList();
            } else {
                this.$message({
                    type:'error',
                    message:res.message
                });
            }


            this.addMotionDialogVisible = false;


        })
    },

    handleCurrentChange(page) {            
        this.getRobotMotionList();
    },

    updateValidate(){
        this.$refs['addMotionForm'].validate((valid) => {

            if (valid) {
            
                this.updateMotiontPost();

            } else {
            
                this.$message({
                    type:'error',
                    message: this.$t('tips.rules.error')
                });

                return false;
            }

        });

    },

    delMotion(item){

        $http.post('/coron-web/robotMotion/delete',{
            motionId:item.motionId
        }).then(res => {

            if(res.status){
            
                this.$message({
                    type:'success',
                    message:this.$t('tips.message.delSuccess')
                });
                this.getRobotMotionList();

            } else {
                this.$message({
                    type:'error',
                    message:res.message
                })
            }
        
      })



    },

    confirmDel(item){
        this.$confirm(this.$t('motion.sureDel'),this.$t('tips.message.hint'),{
            confirmButtonText:this.$t('tips.message.ok'),
            cancelButtonText:this.$t('tips.message.cancel'),
            type:'warning',
        }).then( () => {
            
            this.delMotion(item);

        }).catch(() => {
            this.$message({
            type:'info',
            message:this.$t('tips.message.canceled')
            });
        })
    },

    addMotionFormReset(){

        // this.addMotionForm.motionCode = "";        
        // this.addMotionForm.motionNameZH = "";
        // this.addMotionForm.motionNameJP = "";
        // this.addMotionForm.motionNameEN = "";
        
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
