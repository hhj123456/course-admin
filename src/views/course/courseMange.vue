<template>
	<div class="coursecontent">
		<el-row :gutter="50">
		  <el-col :span="12">
		  	<div class="grid-content bg-purple">
		  		<el-input
				  placeholder="输入关键字进行过滤"
				  suffix-icon="el-icon-search"
				  v-model="filterText" style="padding: 5px;width: 95%">
				</el-input>
		  		<el-tree
				  :props="props1"
				  :load="loadNode1"
				  ref="tree"
				  lazy
				  v-loading="getCourseNameLoading"
				  :filter-node-method="filterNode">
				</el-tree>
		  	</div>
		  </el-col>
		  <el-col :span="12">
		  	<div class="grid-content bg-purple-light">
		  		
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
	import {getCourseName ,getChapterName} from '../../api/api';
	export default{
		name : "courseMange",
		data(){
			return {
				props1: {
		          label: 'name',
		          children: 'zones',
		          isLeaf: 'leaf'
		        },
		        getCourseNameLoading:false,//加载动画
		        filterText:''//过滤器
			}
		},
		methods:{
			loadNode1(node, resolve) {
		        if (node.level === 0) {
		        	this.getCourseNameLoading=true;
		        	getCourseName().then(ret =>{
		        		this.getCourseNameLoading=false;
		        		return resolve(ret.data.data);
		        	});
		        }
		        else if (node.level === 1){
		        	let param = {id:node.data.id}
		        	getChapterName(param).then(ret =>{
		        		return resolve(ret.data.data);
		        	});
		        }
		        else if (node.level === 2){
		        	let param = {id:node.data.id}
		        	getChapterName(param).then(ret =>{
		        		var data =JSON.parse(JSON.stringify(ret.data.data));
		        		data.forEach(res =>{
		        			res["leaf"] = true;
		        		});
		        		return resolve(data);
		        	});
		        }
		    },
		    filterNode(value,data){
		    	// console.log(data);
		    	if (!value) return true;
			    return data.name.indexOf(value) !== -1;
			}
		},
		watch:{
	      filterText(val) {
	        this.$refs.tree.filter(val);
	      }
	    },
	}
</script>
<style scoped>
	.coursecontent{
		margin-top: 50px;
	}
	.grid-content{
		height: 550px;
		border: 1px solid #dddee1;
		overflow-y: scroll;
		border-radius: 4px;
	}
</style>
<style>
	.el-tree{
		border:0px;
	}
</style>