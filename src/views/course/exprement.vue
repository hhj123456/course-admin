<template>
	<div>
		<div v-show="tableVisable">
			<el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="projectname"
		        label="课程名称">
		      </el-table-column>
		      <el-table-column
		        prop="chaptername"
		        label="章节名称">
		      </el-table-column>
		      <el-table-column
		        prop="exprementname"
		        label="实验名称">
		      </el-table-column>
		      <el-table-column
		        prop="createtime"
		        label="创建时间"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="flag"
		        label="实验是否添加"
		        width="180">
		       	<template slot-scope="scope">
		       		{{scope.row.flag === 1 ? '已添加':'未添加'}}
		       	</template>
		      </el-table-column>
		      <el-table-column
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			  </el-table-column>
	    	</el-table>
		</div>
		<div v-show="editVisable" class="detial">
			<el-tabs type="border-card" v-model="activeName">
			  <el-tab-pane name="first">
			    <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
			    <div class="basicInformation">
			    	<el-form ref="detialexprement" :model="exprement" label-width="80px">
			    		<el-form-item label="课程名称">
						    <el-input v-model="exprement.projectname"></el-input>
						</el-form-item>
						<el-form-item label="章节名称">
						    <el-input v-model="exprement.chaptername"></el-input>
						</el-form-item>
						<el-form-item label="实验名称">
						    <el-input v-model="exprement.exprementname"></el-input>
						</el-form-item>
						<el-form-item label="实验时长">
						    <el-input v-model="exprement.time"></el-input>
						</el-form-item>
						<el-form-item>
						    <el-button type="primary" @click="saveBasic" style="float: right;">保存</el-button>
						 </el-form-item>
			    	</el-form>
			    </div>
			  </el-tab-pane>
			  <el-tab-pane name="second">
			  	 <span slot="label"><i class="el-icon-edit"></i> 内容编辑</span>
			  	 <div>
			  	 	<el-row>
					  <el-col :span="7">
					  		<div class="grid-content bg-purple-dark">
					  			<el-tree 
					  				:data="treedata" 
					  				:props="defaultProps" 
					  				default-expand-all 
					  				:expand-on-click-node="false">
					  				<span class="custom-tree-node" slot-scope="{ node, data }">
								        <span style="width: 100%" @click="() => handleNodeClick(node,data)">{{ node.label }}</span>
								        <span class="custom-tree-option">
								          <el-button
								            type="primary"
								            size="mini"
								            icon="el-icon-plus"
								            circle
								            v-show="node.level===1"
								            @click="() => append(node,data)">
								          </el-button>
								          <el-button
								            type="danger"
								            size="mini"
								            icon="el-icon-delete" 
								            circle
								            v-show="node.level===2"
								            @click="() => remove(node, data)">
								          </el-button>
								        </span>
								    </span>
					  			</el-tree>
					  		</div>
					  </el-col>
					  <el-col :span="17">
					  		<div class="grid-content bg-purple-light">
					  			<div v-show="contentViable">
					  			<div>
					  				<p class="title">{{title}}</p>
					  			</div>
					  			<div class="quil_content" v-for="(item,index) in treedata[0].children" v-show="title === item.label">
						  			<quill-editor ref="myTextEditor" v-model="content[item.label]">
		        					</quill-editor>
		        					<div class="btnsave">
		        						<el-button type="primary" style="float: right;">保存</el-button>
		        					</div>
	        					</div>
	        					</div>
					  		</div>
					  </el-col>
					</el-row>
			  	 </div>
			  </el-tab-pane>
			  <el-tab-pane name="third">
			  	<span slot="label"><i class="el-icon-service"></i> 实验总结</span>
			  	 <div>
			  	 	<el-row>
					  <el-col :span="7">
					  		<div class="grid-content bg-purple-dark">
					  			<el-tree 
					  				:data="tree2data" 
					  				:props="defaultProps" 
					  				default-expand-all 
					  				:expand-on-click-node="false">
					  				<span class="custom-tree-node" slot-scope="{ node, data }">
								        <span style="width: 100%" @click="() => handleNodeClick2(node,data)" >{{ node.label }}</span>
								        <span class="custom-tree-option">
								          <el-button
								            type="primary"
								            size="mini"
								            icon="el-icon-plus"
								            circle
								            v-show="node.level===1"
								            @click="() => append(node,data)">
								          </el-button>
								          <el-button
								            type="danger"
								            size="mini"
								            icon="el-icon-delete" 
								            circle
								            v-show="node.level===2"
								            @click="() => remove(node, data)">
								          </el-button>
								        </span>
								    </span>
					  			</el-tree>
					  		</div>
					  </el-col>
					  <el-col :span="17">
					  		<div class="grid-content bg-purple-light">
					  			<div v-show="contentViable2">
					  			<div>
					  				<p class="title">{{title2}}</p>
					  			</div>
					  			<div>
					  				<p>1.主观题</p>
					  				<el-form ref="Subjective" :model="Subjective" label-width="80px">
					  				</el-form>
					  			</div>
	        					</div>
					  		</div>
					  </el-col>
					</el-row>
			  	 </div>
			  </el-tab-pane>
			  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
			</el-tabs>
		</div>
	</div>	
</template>
<script>
	export default{
		name:"exprement",
		data(){
			return {
				activeName:'third',
				tableData:[
					{
						projectname:"web程序设计",
						chaptername:"认识HTML语言",
						exprementname:"div+css实验",
						flag:1,
						createtime:"2018-11-11 16:51"
					},
					{
						projectname:"web程序设计",
						chaptername:"认识HTML语言",
						exprementname:"语言化标签化实验",
						flag:0,
						createtime:"2018-11-11 16:51"
					}
				],
				exprement:{
					projectname:'',//课程名称
					chaptername:'',//章节名称
					exprementname:'',//实验名称
					time:'',//实验时长
				},
				tableVisable:false,//表格显示
				editVisable:true,//编辑显示
				defaultProps:{
					children: 'children',
          			label: 'label'
				},//定义
				treedata:[{
					label:'内容树',
					children:[
						{label:"实验目的"},
						{label:"实验原理"},
						{label:"实验内容"},
						{label:"实验步骤"},
					]
				}],
				tree2data:[{
					label:'实验结果与总结',
					children:[
						{label:"综合测试"},
						{label:"实验总结"},
					]
				}],
				title:'',//选择标题
				title2:'',//实验总结标题
				content:[],//内容
				contentViable:false,//右侧内容显示
				contentViable2:false,//右侧内容显示

			}
		},
		methods:{
			handleClick(row){
				this.tableVisable = false;
				this.editVisable = true;
				this.exprement.projectname = row.projectname;
				this.exprement.chaptername = row.chaptername;
				this.exprement.exprementname = row.exprementname;
			},
			saveBasic(){

			},
			append(node,data){
				this.$prompt('请选择要添加的模块', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		        }).then(({ value }) => {
		         this.treedata[0].children.push({label:value});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消输入'
		          });       
		        });
			},
			remove(node, data) {
				this.$confirm('确认删除后，此模块的已经编辑的内容将无法恢复, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	const parent = node.parent;
			        const children = parent.data.children || parent.data;
			        const index = children.findIndex(d => d.label === node.label);
			        children.splice(index, 1);
			        this.title = "";
			        this.title2 = "";
		            this.$message({
		               type: 'success',
		               message: '删除成功!'
		            });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    },
		    handleNodeClick(node,data){
		    	this.title = node.label;
		    	this.contentViable = true;
		    },
		    handleNodeClick2(node,data){
		    	this.title2 = node.label;
		    	this.contentViable2 = true;
		    }

		}
	}
</script>
<style scoped>
	.detial{
		padding-top: 40px;
	}
	.basicInformation{
		width: 50%;
		margin: 50px 10%;
	}
	.grid-content{
		height: 500px;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		border-left: 1px solid #ccc;
	}
	.bg-purple-light{
		border-right: 1px solid #ccc;
	}
	.quil_content{
		padding-left: 10px;
		padding-right: 10px;
	}
	.title{
		padding-left: 10px;
		padding-right: 10px;	
		font-weight: bold;
	}
	.btnsave{
		padding-top: 10px;
	}
</style>
<style>
	/*.el-tabs__content{
		height: 500px;
		overflow-y: scroll;
	}*/
	.ql-container.ql-snow{
		height: 320px;
	}
</style>