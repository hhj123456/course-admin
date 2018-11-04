<template>
	<div class="coursecontent">
		<div style="margin-bottom: 10px">
			<el-button type="primary" @click="addproject">添加课程</el-button>
		</div>
		<el-row :gutter="50">
		  <el-col :span="12">
		  	<div class="grid-content bg-purple">
		  		<el-input
				  placeholder="输入关键字进行过滤"
				  suffix-icon="el-icon-search"
				  v-model="filterText" style="padding: 5px;width: 95%">
				</el-input>
				<el-tree 
					:data="data" 
					:props="defaultProps"
					v-loading="getCourseNameLoading"
					ref="tree"
					:expand-on-click-node="false">
					<span class="custom-tree-node" slot-scope="{ node, data }">
				        <span @click="() => handleNodeClick(node,data)">{{ node.label }}</span>
				        <span class="custom-tree-option">
				          <el-button
				            type="primary"
				            size="mini"
				            icon="el-icon-plus"
				            circle
				            v-show="node.level!==3"
				            @click="() => append(node,data)">
				          </el-button>
				          <el-button
				            type="danger"
				            size="mini"
				            icon="el-icon-delete" 
				            circle
				            @click="() => remove(node, data)">
				          </el-button>
				        </span>
				    </span>
				</el-tree>
		  	</div>
		  </el-col>
		  <el-col :span="12">
		  	<div class="grid-content-light bg-purple-light" v-show="projectVisable">
		  		<div class="modelname">
		  			新增课程
		  		</div>
		  		<div class="modelcontent">
			  		<el-form :model="project" :rules="projectrules" ref="project" label-width="100px" class="demo-ruleForm" label-position="top">
			  			<el-form-item label="课程名称" prop="name">
	    					<el-input v-model="project.name"  placeholder="请输入课程名称"></el-input>
	  					</el-form-item>
	  					<el-form-item label="课程介绍" prop="description">
	    					<el-input
							  type="textarea"
							  :rows="3"
							  placeholder="请输入课程介绍"
							  v-model="project.description">
							</el-input>
	  					</el-form-item>
	  					<el-form-item label="任课教师姓名" prop="teachername"> 
	    					<el-input v-model="project.teachername"  placeholder="请输入任课教师姓名"></el-input>
	  					</el-form-item>
	  					<el-form-item label="任课教师所属学院" prop="teachercollege">
	    					<el-input v-model="project.teachercollege"  placeholder="请输入任课教师所属学院"></el-input>
	  					</el-form-item>
	  					<el-form-item label="课程缩略图" prop="projectimg">
	  						<el-input v-model="project.projectimg" v-show="false"></el-input>
	    					<el-upload
							  action="post"
							  :before-upload="beforeUpload"
							  list-type="picture-card"
							  :on-preview="handlePictureCardPreview"
							  :on-remove="handleRemove">
							  <i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
	  					</el-form-item>
	  					<el-form-item>
						    <el-button type="primary" @click="submitproject('project')" style="float:right;">保存</el-button>
						</el-form-item>
			  		</el-form>
		  		</div>
		  	</div>
		  	<div class="grid-content-light bg-purple-light" v-show="chapterVisable">
		  		<div class="modelname">
		  			新增章节
		  		</div>
		  		<div class="modelcontent">
			  		<el-form :model="chapter" :rules="chapterrules" ref="chapter" label-width="100px" class="demo-ruleForm" label-position="top">
			  			<el-form-item label="课程名称" prop="projectname">
	    					<el-input v-model="chapter.projectname" :disabled="true" ></el-input>
	  					</el-form-item>
	  					<el-form-item label="章节名称" prop="name">
	    					<el-input v-model="chapter.name" placeholder="请输入章节名称"></el-input>
	  					</el-form-item>
	  					<el-form-item label="章节介绍" prop="description">
	    					<el-input
							  type="textarea"
							  :rows="3"
							  placeholder="请输入课程介绍"
							  v-model="chapter.description">
							</el-input>
	  					</el-form-item>
	  					<el-form-item>
						    <el-button type="primary" @click="submitchapter('chapter')" style="float:right;">保存</el-button>
						</el-form-item>
			  		</el-form>
		  		</div>
		  	</div>
		  	<div class="grid-content-light bg-purple-light" v-show="experimentVisable">
		  		<div class="modelname">
		  			新增实验
		  		</div>
		  		<div class="modelcontent">
			  		<el-form :model="experiment" :rules="experimentrules" ref="experiment" label-width="100px" class="demo-ruleForm" label-position="top">
			  			<el-form-item label="课程名称" prop="projectname">
	    					<el-input v-model="experiment.projectname" :disabled="true" ></el-input>
	  					</el-form-item>
	  					<el-form-item label="章节名称" prop="chaptername">
	    					<el-input v-model="experiment.chaptername" :disabled="true"></el-input>
	  					</el-form-item>
	  					<el-form-item label="实验名称" prop="name">
	    					<el-input v-model="experiment.name" placeholder="请输入实验名称" ></el-input>
	  					</el-form-item>
	  					<el-form-item label="实验介绍" prop="description">
	    					<el-input
							  type="textarea"
							  :rows="3"
							  placeholder="请输入实验介绍"
							  v-model="experiment.description">
							</el-input>
	  					</el-form-item>
	  					<el-form-item label="实验时长" prop="time">
	    					<el-input v-model="experiment.time" placeholder="请输入实验时长" ></el-input>
	  					</el-form-item>
	  					<el-form-item>
						    <el-button type="primary" @click="submitexperiment('experiment')" style="float:right;">保存</el-button>
						</el-form-item>
			  		</el-form>
		  		</div>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
	import {getProject} from '../../api/api';
	export default{
		name : "courseMange",
		data(){
			return {
		        defaultProps:{
		        	children: 'children',
          			label: 'name'
		        },
		        data:[],//树形数据
		        getCourseNameLoading:false,//加载动画
		        filterText:'',//过滤器
		        project:{
		        	name:'',//课程名称
		        	description:"",//课程介绍
		        	teachername:'',//任课老师姓名
		        	teachercollege:'',//任课老师所属学院
		        	projectimg:'',//课程图片
		        },//课程名
		        projectrules:{
		        	name:[{ required: true, message: '请输入课程名称', trigger: 'blur' }],
		        	description:[{ required: true, message: '请输入课程介绍', trigger: 'blur' }],
		        	teachername:[{ required: true, message: '请输入任课教师姓名', trigger: 'blur' }],
		        	teachercollege:[{ required: true, message: '所属学院', trigger: 'blur' }],
		        	projectimg:[{ required: true, message: '请上传缩略图', trigger: 'blur' }],
		        },
		        chapter:{
		        	id:'',//课程id
		        	projectname:'',//课程名称
		        	name:'',//章节名称
		        	description:'',//章节描述
		        },//章节名
		        chapterrules:{
		        	name:[{ required: true, message: '请输入章节名称', trigger: 'blur' }],
		        },//规则验证
		        experiment:{
		        	projectname:'',//课程名称
		        	chaptername:'',//章节名称
		        	name:'',//实验名称
		        	description:'',//实验描述
		        	time:'',//实验时长
		        },//实验名称
		        experimentrules:{
		        	name:[{ required: true, message: '请输入实验名称', trigger: 'blur' }]
		        },//验证信息
		        dialogImageUrl: '',
        		dialogVisible: false,
        		projectVisable:false,//课程添加显示
        		chapterVisable:false,//章节添加显示
        		experimentVisable:false,//实验添加显示
			}
		},
		methods:{
		    filterNode(value,data){
		    	if (!value) return true;
			    return data.name.indexOf(value) !== -1;
			},
			handleNodeClick(node,data) {
		        this.chapterVisable = false;
		    	this.experimentVisable = false;
		    	this.projectVisable = false;
		    	this.project = {
		        	name:'',//课程名称
		        	description:"",//课程介绍
		        	teachername:'',//任课老师姓名
		        	teachercollege:'',//任课老师所属学院
		        	projectimg:'',//课程图片
		        };
		        this.chapter = {
		        	id:'',//课程id
		        	projectname:'',//课程名称
		        	name:'',//章节名称
		        	description:'',//章节描述
		        };
		        this.experiment ={
		        	projectname:'',//课程名称
		        	chaptername:'',//章节名称
		        	name:'',//实验名称
		        	description:'',//实验描述
		        	time:'',//实验时长
		        };
		    	if(node.level === 1){
		    		this.project.name = node.label;
		    		this.projectVisable = true;
		    	}else if(node.level === 2){
		    		this.chapter.name = node.label;
		    		this.chapter.projectname = node.parent.label;
		    		this.chapterVisable = true;
		    	}else if(node.level === 3){
		    		this.experiment.projectname = node.parent.parent.label;
		    		this.experiment.chaptername = node.parent.label;
		    		this.experiment.name = node.label;
		    		this.experimentVisable = true;
		    	}
		    },
		    getprojcet(){
		    	this.getCourseNameLoading=true;
		    	getProject().then(res =>{
		    		this.getCourseNameLoading=false;
		    		this.data = JSON.parse(JSON.stringify(res.data.data));
		    	})
		    },
		    remove(node,data){
		    	console.log(node);
		    },
		    handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        console.log(file.url);
		        this.dialogVisible = true;
		    },
		    beforeUpload(file){
		    	console.log(file);
		    },
		    //显示添加课程
		    addproject(){
		    	this.chapterVisable = false;
		    	this.experimentVisable = false;
		    	this.projectVisable = true;
		    	this.project.name = "";
		    },
		    //点击添加按钮
		    append(node,data){
		    	this.chapterVisable = false;
		    	this.experimentVisable = false;
		    	this.projectVisable = false;
		    	this.project = {
		        	name:'',//课程名称
		        	description:"",//课程介绍
		        	teachername:'',//任课老师姓名
		        	teachercollege:'',//任课老师所属学院
		        	projectimg:'',//课程图片
		        };
		        this.chapter = {
		        	id:'',//课程id
		        	projectname:'',//课程名称
		        	name:'',//章节名称
		        	description:'',//章节描述
		        };
		        this.experiment ={
		        	projectname:'',//课程名称
		        	chaptername:'',//章节名称
		        	name:'',//实验名称
		        	description:'',//实验描述
		        	time:'',//实验时长
		        };
		    	if(node.level === 1){
		    		this.chapter.projectname = data.name;
		    		this.chapterVisable = true;
		    	}else if(node.level === 2){
		    		this.experiment.projectname = node.parent.label;
		    		this.experiment.chaptername = node.label;
		    		this.experimentVisable = true;
		    	}
		    },
		    //课程新增
		    submitproject(ref){
		    	this.$refs[ref].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    //新增章节
		    submitchapter(ref){
		    	this.$refs[ref].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    //新增实验
		    submitexperiment(ref){
		    	this.$refs[ref].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    }

		},
		watch:{
	      filterText(val) {
	        this.$refs.tree.filter(val);
	      }
	    },
	    mounted(){
	    	this.getprojcet();
	    }
	}
</script>
<style scoped>
	.coursecontent{
		margin-top: 10px;
	}
	.grid-content{
		height: 550px;
		border: 1px solid #dddee1;
		overflow-y: scroll;
		border-radius: 4px;
	}
	.modelname{
		border-bottom: 1px solid #e9eaec;
    	padding: 14px 16px;
    	line-height: 1;
    	text-align: center;
    	font-weight: bold;
	}
	.grid-content-light{
		border: 1px solid #dddee1;
		border-radius: 4px;
	}
	.modelcontent{
		width: 90%;
		margin: 20px auto;
	}
	.grid-content-light:hover{
		box-shadow: 0px 0px 5px #888888;
	}
</style>
<style>
	.el-tree{
		border:0px;
	}
	.custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    padding-right: 8px;
	}
	.custom-tree-option{
		display: none;
	}
	.el-tree-node__content:hover .custom-tree-option{
		display: inline-block;
	}
</style>