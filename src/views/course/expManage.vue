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
					:filter-node-method="filterNode"
					:expand-on-click-node="false">
					<span class="custom-tree-node" slot-scope="{ node, data }">
				        <span @click="() => handleNodeClick(node,data)" style="width: 100%">{{ node.label }}</span>
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
		  			{{project.title}}
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
	    					  class="avatar-uploader"
							  :action="actionimgUploadUrl"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeUpload">
							  <img v-if="project.projectimg" :src="project.projectimg" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<!-- <el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="project.projectimg" alt="">
							</el-dialog> -->
	  					</el-form-item>
	  					<el-form-item>
						    <el-button  :loading="saveloading" type="primary" @click="submitproject('project')" style="float:right;">保存</el-button>
						</el-form-item>
			  		</el-form>
		  		</div>
		  	</div>
		  	<div class="grid-content-light bg-purple-light" v-show="chapterVisable">
		  		<div class="modelname">
		  			{{chapter.title}}
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
		  			{{experiment.title}}
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
	import {getProject,imgUpload,imgUploadUrl,baseImge,removeCourse,updateCourse,Addcourse,removeChapter,updateChapter,Addexperiment,UpdateExperiment,removeExperiment} from '../../api/api';
	export default{
		name : "courseMange",
		data(){
			return {
		        defaultProps:{
		        	children: 'children',
          			label: 'name'
		        },
		        actionimgUploadUrl:imgUploadUrl,
		        data:[],//树形数据
		        getCourseNameLoading:false,//加载动画
		        filterText:'',//过滤器
		        project:{
		        	title:'新增课程',//文章标题
		        	name:'',//课程名称
		        	description:"",//课程介绍
		        	teachername:'',//任课老师姓名
		        	teachercollege:'',//任课老师所属学院
		        	projectimg:'',//课程图片
		        	imgfile:'',//图片属性
		        },//课程名
		        projectrules:{
		        	name:[{ required: true, message: '请输入课程名称', trigger: 'blur' }],
		        	description:[{ required: true, message: '请输入课程介绍', trigger: 'blur' }],
		        	teachername:[{ required: true, message: '请输入任课教师姓名', trigger: 'blur' }],
		        	teachercollege:[{ required: true, message: '所属学院', trigger: 'blur' }],
		        	projectimg:[{ required: true, message: '请上传缩略图', trigger: 'blur' }],
		        },
		        chapter:{
		        	title:'新增章节',//文章标题
		        	id:'',//章节id
		        	coid:'',//课程id
		        	projectname:'',//课程名称
		        	name:'',//章节名称
		        	description:'',//章节描述
		        },//章节名
		        chapterrules:{
		        	name:[{ required: true, message: '请输入章节名称', trigger: 'blur' }],
		        },//规则验证
		        experiment:{
		        	title:'新增实验',//文章标题
		        	id:'',//实验ID
		        	coid:'',//课程id
		        	caid:'',//章节ID
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
        		saveloading:false,//点击保存按钮
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
		    		title:'修改课程',
		    		id:'',//课程id
		        	name:'',//课程名称
		        	description:"",//课程介绍
		        	teachername:'',//任课老师姓名
		        	teachercollege:'',//任课老师所属学院
		        	projectimg:'',//课程图片
		        	imgfile:'',//图片属性
		        };
		        this.chapter = {
		        	title:'修改章节',//文章标题
		        	id:'',//章节id
		        	coid:'',//课程id
		        	projectname:'',//课程名称
		        	name:'',//章节名称
		        	description:'',//章节描述
		        };
		        this.experiment ={
		        	title:'修改实验',
		        	id:'',//实验ID
		        	coid:'',//课程id
		        	caid:'',//章节ID
		        	projectname:'',//课程名称
		        	chaptername:'',//章节名称
		        	name:'',//实验名称
		        	description:'',//实验描述
		        	time:'',//实验时长
		        };
		    	if(node.level === 1){
		    		this.project.name = node.label;
		    		this.projectVisable = true;
		    		this.project.description = data.cinfo;
		    		this.project.teachername = data.tname;
		    		this.project.id = data.id;
		    		this.project.teachercollege = data.tcollege;
		    		this.project.projectimg = baseImge+data.image; 
		    	}else if(node.level === 2){
		    		this.chapter.coid = node.parent.id;
		    		this.chapter.name = node.label;
		    		this.chapter.id = data.id;
		    		this.chapter.projectname = node.parent.label;
		    		this.chapter.description = data.cainfo;
		    		this.chapterVisable = true;
		    	}else if(node.level === 3){
		    		this.experiment.projectname = node.parent.parent.label;
		    		this.experiment.chaptername = node.parent.label;
		    		this.experiment.name = node.label;
		    		this.experiment.id = data.id;
		    		this.experiment.description = data.einfo;
		    		this.experiment.time = data.etime;
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
		    //删除
		    remove(node,data){
		    	if(node.childNodes.length > 0){
		    		this.$message({
				        message: '警告！此节点下面有内容',
				        type: 'warning'
			        });
		    	}else{
		 			this.$confirm('此操作将永久删除其内容, 是否继续?', '提示', {
				        confirmButtonText: '确定',
				       	cancelButtonText: '取消',
				        type: 'warning'
			        }).then(() => {
			        	if(node.level == 1){
			        		console.log(data);
			        		let param = {
			        			id : data.id
			        		}
			        		removeCourse(param).then(res => {
			        			if(res.data.code === 200){
			        				this.$message({
							            type: 'success',
							            message: res.data.msg
							        });
							        this.projectVisable = false;
			        				this.getprojcet();
			        			}else{
			        				this.$message.error(res.data.msg);
			        			}
			        		})
			        	}else if(node.level == 2){
			        		let param = {
			        			id : data.id
			        		}
			        		removeChapter(param).then(res =>{
			        			if(res.data.code === 200){
			        				this.$message({
							            type: 'success',
							            message: res.data.msg
							        });
			        				this.getprojcet();
			        				this.chapterVisable = false;

			        			}else{
			        				this.$message.error(res.data.msg);
			        			}
			        		});
			        	}else if(node.level == 3){
			        		let param = {
			        			id : data.id
			        		}
			        		removeExperiment(param).then(res =>{
			        			if(res.data.code === 200){
			        				this.$message({
							            type: 'success',
							            message: res.data.msg
							        });
			        				this.getprojcet();
			        				this.experimentVisable = false;

			        			}else{
			        				this.$message.error(res.data.msg);
			        			}
			        		});
			        	}
			        }).catch(() => {
				        this.$message({
				            type: 'info',
				            message: '已取消删除'
				        });          
			        });
		    	}
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
		    	this.project.projectimg = URL.createObjectURL(file);
		    	this.project.imgfile = file;
		    	return false;
		    },//上传之前
		    handleAvatarSuccess(res,file){
		    	// this.project.projectimg = URL.createObjectURL(file.raw);
		    },//上传成功
		    //显示添加课程
		    addproject(){
		    	this.chapterVisable = false;
		    	this.experimentVisable = false;
		    	this.projectVisable = true;
		    	this.project = {
		    		title:'添加课程',
		    		id:'',//课程id
		        	name:'',//课程名称
		        	description:"",//课程介绍
		        	teachername:'',//任课老师姓名
		        	teachercollege:'',//任课老师所属学院
		        	projectimg:'',//课程图片
		        };
		    },
		    //点击添加按钮
		    append(node,data){
		    	this.chapterVisable = false;
		    	this.experimentVisable = false;
		    	this.projectVisable = false;
		        this.chapter = {
		        	title:'新增章节',//文章标题
		        	id:'',//章节id
		        	coid:'',//课程id
		        	projectname:'',//课程名称
		        	name:'',//章节名称
		        	description:'',//章节描述
		        };
		        this.experiment ={
		        	title:'新增实验',//新增实验
		        	id:'',//实验ID
		        	coid:'',//课程id
		        	caid:'',//章节ID
		        	projectname:'',//课程名称
		        	chaptername:'',//章节名称
		        	name:'',//实验名称
		        	description:'',//实验描述
		        	time:'',//实验时长
		        };
		    	if(node.level === 1){
		    		this.chapter.coid = data.id;
		    		this.chapter.projectname = data.name;
		    		this.chapterVisable = true;
		    	}else if(node.level === 2){
		    		this.experiment.coid = node.parent.data.id;
		    		this.experiment.caid = node.data.id;
		    		this.experiment.projectname = node.parent.label;
		    		this.experiment.chaptername = node.label;
		    		this.experimentVisable = true;
		    	}
		    },
		    //课程新增
		    submitproject(ref){
		    	this.$refs[ref].validate((valid) => {
		          if (valid) {
		          		let fileDate = new FormData();
		          		fileDate.append('id',this.project.id);
		          		fileDate.append('name',this.project.name);
		          		fileDate.append('description',this.project.description);
		          		fileDate.append('teachername',this.project.teachername);
		          		fileDate.append('teachercollege',this.project.teachercollege);
		          		if(this.project.id ==''){
			          		fileDate.append('image',this.project.imgfile);
			          		this.saveloading = true;
			            	imgUpload(fileDate).then(res => {
			            		this.saveloading = false
			            		if(res.data.code != 200){
			            			this.$message.error(res.data.msg);
			            		}else{
			            			this.$message({
								        message: res.data.msg,
								        type: 'success'
							        });
							        this.getprojcet();
			            		}
			            	})
		            	}else{
		            		fileDate.append('image',this.project.imgfile);
		            		this.saveloading = true;
		            		updateCourse(fileDate).then(res => {
		            			this.saveloading = false;
		            			if(res.data.code == 200){
		            				this.$message({
								        message: res.data.msg,
								        type: 'success'
							        });
							        this.getprojcet();
		            			}else{
		            				this.$message.error(res.data.msg);
		            			}
		            		})
		            	}
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
			          	if(this.chapter.id === ''){
				            Addcourse(this.chapter).then(res => {
				            	if(res.data.code === 200){
				            		this.$message({
								        message: res.data.msg,
								        type:'success'
							        });
							        this.getprojcet();
				            	}else{
				            		this.$message.error(res.data.msg);
				            	}
				            });
			        	}else{
			        		updateChapter(this.chapter).then(res =>{
			        			if(res.data.code === 200){
				            		this.$message({
								        message: res.data.msg,
								        type:'success'
							        });
							        this.getprojcet();
				            	}else{
				            		this.$message.error(res.data.msg);
				            	}
			        		});
			        	}
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
		          	if(this.experiment.id == ''){
			            Addexperiment(this.experiment).then(res =>{
			            	if(res.data.code === 200){
			            		this.$message({
							        message: res.data.msg,
							        type:'success'
						        });
						        this.getprojcet();
			            	}else{
			            		this.$message.error(res.data.msg);
			            	}
			            });
		       		}else{
		       			UpdateExperiment(this.experiment).then(res =>{
		       				if(res.data.code === 200){
			            		this.$message({
							        message: res.data.msg,
							        type:'success'
						        });
						        this.getprojcet();
			            	}else{
			            		this.$message.error(res.data.msg);
			            	}
		       			});
		       		}
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
	 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>