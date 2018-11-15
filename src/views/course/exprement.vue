<template>
	<div>
		<div v-show="tableVisable">
			<el-table
			  v-loading="tableloading"
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="coname"
		        align="center"
		        show-overflow-tooltip
		        label="课程名称">
		      </el-table-column>
		      <el-table-column
		        prop="caname"
		        align="center"
		        show-overflow-tooltip
		        label="章节名称">
		      </el-table-column>
		      <el-table-column
		        prop="ename"
		        align="center"
		        show-overflow-tooltip
		        label="实验名称">
		      </el-table-column>
		      <el-table-column
		        prop="createtime"
		        label="创建时间"
		        show-overflow-tooltip
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="flag"
		        align="center"
		        show-overflow-tooltip
		        label="实验是否添加">
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
	    	<el-col :span="24" class="toolbar">
				<!-- <el-button type="danger" @click="batchRemove" :disabled="this.tableData.length===0">批量删除</el-button> -->
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
		</div>
		<div v-show="editVisable" class="detial">
			<el-tabs type="border-card" v-model="activeName" @tab-click="handleTabClick">
				<el-button type="primary" class="el-icon-back" @click="goback">返回</el-button>
			  <el-tab-pane name="first">
			    <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
			    <div class="basicInformation">
			    	<el-form ref="detialexprement" :model="exprement" label-width="80px">
			    		<el-form-item label="课程名称">
						    <el-input v-model="exprement.projectname" disabled></el-input>
						</el-form-item>
						<el-form-item label="章节名称">
						    <el-input v-model="exprement.chaptername" disabled></el-input>
						</el-form-item>
						<el-form-item label="实验名称">
						    <el-input v-model="exprement.name"></el-input>
						</el-form-item>
						<el-form-item label="实验介绍">
						    <el-input v-model="exprement.description" type="textarea" :rows="2"></el-input>
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
					  				<p class="title"></p>
					  				<el-input v-model="title" placeholder="请输入内容" style="width: 50%;margin-bottom: 10px;"></el-input>
					  			</div>
					  			<div class="quil_content" v-for="(item,index) in treedata[0].children" v-show="titleid === item.id">
						  			<quill-editor ref="myTextEditor" v-model="content[item.id]">
		        					</quill-editor>
		        					<div class="btnsave">
		        						<el-button type="primary" style="float: right;" @click="saveContent">保存</el-button>
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
						  			<div v-show="title2 === '综合测试'">
						  				<el-form ref="Subjective" :model="Subjective" label-width="120px" style="width: 80%">
						  					<div v-for="(sub,index) in Subjective.question" class="subjectquestion">
						  						<div class="topic">
						  							<p>{{index+1}}、主观题</p>
						  							<p style="float: right; padding-right: 20px;">
						  								<i class="el-icon-delete" @click.prevent="removeSub(index)"></i>
						  							</p>
						  						</div>
						  						<el-form-item
						  							label="题目描述"
						  							:prop="'question.'+ index + '.topic'"
						  							:rules="[
													     	{ required: true, message:'题目描述',trigger: 'blur' }
													    ]"
						  						>
						  							<el-input
						  								type="textarea"
	  													:rows="3"
	  													placeholder="请输入题目的描述"
						  								v-model="sub.topic">		
						  							</el-input>
						  						</el-form-item>
						  						<el-form-item
						  							label="标准答案"
						  							:prop="'question.'+ index + '.answer'"
						  							:rules="[
													     	{ required: true, message:'标准答案',trigger: 'blur' }
													    ]"
						  						>
						  							<el-input
						  								type="textarea"
	  													:rows="3"
	  													placeholder="请输入题目的标准答案"
						  								v-model="sub.answer">		
						  							</el-input>
						  						</el-form-item>
						  							<el-form-item
						  							label="答题关键词"
						  							:prop="'question.'+ index + '.analysis'"
						  							:rules="[
													     	{ required: true, message:'关键词',trigger: 'blur' }
													    ]"
						  						>
						  							<el-input
						  								type="textarea"
	  													:rows="3"
	  													placeholder="请输入答题的关键词"
						  								v-model="sub.analysis">		
						  							</el-input>
						  						</el-form-item>
						  					</div>
						  					<el-form-item style="padding-top: 20px;">
							  					<el-button type="primary" @click="addquestion">继续添加</el-button>
							  					<el-button type="danger" @click="saveConclusion('Subjective')">保存</el-button>
						  					</el-form-item>
						  				</el-form>
						  			</div>
						  			<div v-show="title2 === '实验总结'">
						  				<el-form :model="summary" label-width="120px" style="width: 80%">
						  					<el-form-item label="总结">
											    <el-input
											    type="textarea"
	  											:rows="3"
	  											placeholder="请输入总结"
											    v-model="summary.title"
											    :disabled="true"></el-input>
											</el-form-item>
											<el-form-item style="padding-top: 20px;">
							  					<el-button type="primary" v-show="summary.flag == 0" @click="AddConclusion">添加总结</el-button>
							  					<el-button type="success" v-show="summary.flag != 0" icon="el-icon-check" disabled>已添加</el-button>
						  					</el-form-item>
						  				</el-form>
						  			</div>
						  			<div v-show="title2 === '测试题管理'">
									  <el-table
									    :data="testData"
									    border
									    v-loading="testLoading"
									    style="width: 98%;margin: 0 auto">
									    <el-table-column
									      prop="topic"
									      label="题目描述"
									      show-overflow-tooltip>
									    </el-table-column>
									    <el-table-column
									      prop="answer"
									      label="标准答案"
									      show-overflow-tooltip>
									    </el-table-column>
									    <el-table-column
									      prop="analysis"
									      label="关键词"
									      show-overflow-tooltip>
									    </el-table-column>
									    <el-table-column label="操作" width="150">
									      <template slot-scope="scope">
									        <el-button
									          size="mini"
									          @click="handleTestEdit(scope.row)">编辑</el-button>
									        <el-button
									          size="mini"
									          type="danger"
									          @click="handleTestDelete(scope.row)">删除</el-button>
									      </template>
									    </el-table-column>
									  </el-table>
						  			</div>
	        					</div>
					  		</div>
					  </el-col>
					</el-row>
			  	 </div>
			  </el-tab-pane>
			  <el-tab-pane name="fourth">
			  	<span slot="label"><i class="el-icon-tickets"></i> 新增测试题目</span>
			  	<div>
			  		<el-form ref="exam" :model="exam" label-width="120px" style="width: 80%">
	  					<div v-for="(exa,exaindex) in exam.SingleSelection" class="subjectquestion">
	  						<div class="topic">
	  							<p>{{exaindex+1}}、{{exa.questiontype}}</p>
	  							<p style="float: right; padding-right: 20px;">
	  								<i class="el-icon-delete" @click.prevent="removeSingleSelection(exaindex)"></i>
	  							</p>
	  						</div>
	  						<el-form-item
	  							label="题目描述"
	  							:prop="'SingleSelection.'+ exaindex + '.topic'"
	  							:rules="{
	  								 required: true, message: '题目描述不能为空', trigger: 'blur'
	  							}"
	  						>
	  							<el-input
	  								type="textarea"
									:rows="3"
									placeholder="请输入题目的描述"
	  								v-model="exa.topic">		
	  							</el-input>
	  						</el-form-item>
	  						<el-form-item>
	  						<el-radio-group v-model="exa.correctAnswer" style="width: 100%">
		  						<div v-for="(answer,answerindex) in exa.answer">
			  						<el-form-item 
			  							:prop="'SingleSelection.'+ exaindex + '.answer.'+ answerindex +'.value'"
			  							:rules="{
			  								required: true, message: '可选答案不能为空', trigger: 'blur'
			  							}"
			  							:label="num[answerindex]"
			  							style="margin-left: -100px">
			  							<el-radio :label="answerindex" style="width: 100%">
			  							<el-input
											placeholder="请写入可选答案"
			  								v-model="answer.value"
			  								style="width: 85%">		
			  							</el-input>
			  							<i class="el-icon-delete" @click.prevent="removeAnswerValue(exaindex,answerindex)"></i>
			  							</el-radio>
			  						</el-form-item>
		  						</div>
		  						<el-button type="success" @click.prevent="addSelect(exaindex)">增加选项</el-button>
	  						</el-radio-group>
	  						</el-form-item>
	  							<el-form-item
	  							label="答案解析"
	  						>
	  							<el-input
	  								type="textarea"
									:rows="3"
									placeholder="请输入答案解析"
	  								v-model="exa.analysis">		
	  							</el-input>
	  						</el-form-item>
	  					</div>
	  					<div v-for="(exa,exaindex) in exam.MultipleSelection" class="subjectquestion">
	  						<div class="topic">
	  							<p>{{exaindex+1}}、{{exa.questiontype}}</p>
	  							<p style="float: right; padding-right: 20px;">
	  								<i class="el-icon-delete" @click.prevent="removeMultipleSelection(exaindex)"></i>
	  							</p>
	  						</div>
	  						<el-form-item
	  							label="题目描述"
	  							:prop="'MultipleSelection.'+ exaindex + '.topic'"
	  							:rules="{
	  								 required: true, message: '题目描述不能为空', trigger: 'blur'
	  							}"
	  						>
	  							<el-input
	  								type="textarea"
									:rows="3"
									placeholder="请输入题目的描述"
	  								v-model="exa.topic">		
	  							</el-input>
	  						</el-form-item>
	  						<el-checkbox-group v-model="exa.correctAnswer" style="width: 100%">
		  						<div v-for="(answer,answerindex) in exa.answer">
			  						<el-form-item :label="num[answerindex]"
			  						:prop="'MultipleSelection.'+ exaindex + '.answer.'+ answerindex +'.value'"
			  						:rules="{
			  								required: true, message: '可选答案不能为空', trigger: 'blur'
			  							}">
			  							<el-checkbox :label="answerindex" style="width: 100%">
			  							<el-input
											placeholder="请写入可选答案"
			  								v-model="answer.value"
			  								style="width: 85%">		
			  							</el-input>
			  							<i class="el-icon-delete" @click.prevent="removeMulAnswerValue(exaindex,answerindex)"></i>
			  							</el-checkbox>
			  						</el-form-item>
		  						</div>
		  						<el-button type="success" style="margin-left: 120px;margin-bottom: 20px;" @click.prevent="addMulSelect(exaindex)">增加选项</el-button>
	  						</el-checkbox-group>

	  							<el-form-item
	  							label="答案解析"
	  						>
	  							<el-input
	  								type="textarea"
									:rows="3"
									placeholder="请输入答案解析"
	  								v-model="exa.analysis">		
	  							</el-input>
	  						</el-form-item>
	  					</div>
	  					<el-form-item style="padding-top: 20px;">
		  					<el-button type="primary" @click="addSelectQuestion">增加单选题</el-button>
		  					<el-button type="warning" @click="addMultipleSelection">增加多选题</el-button>
		  					<el-button type="danger" @click="submitForm('exam')">保存</el-button>
	  					</el-form-item>
	  				</el-form>
			  	</div>
			 </el-tab-pane>
			  <el-tab-pane name="fifth">
			  	<span slot="label"><i class="el-icon-menu"></i> 管理测试题目</span>
			  	<div>
			  		 <el-table
					    :data="testManageData"
					    border
					    v-loading="testManageLoading"
					    style="width: 98%;margin: 0 auto">
					    <el-table-column
					      prop="topic"
					      label="题目描述"
					      show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column label="题型" width="80" prop="type" :filters="[{ text: '单选题', value: '0' }, { text: '多选题', value: '1' }]" :filter-method="filterType">
					      <template slot-scope="scope">
					        <el-tag
					          :type="scope.row.type === '0' ? 'primary' : 'success'"
					          disable-transitions> {{scope.row.type == 0 ?'单选题':'多选题'}}</el-tag>
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="createtime"
					      label="创建时间"
					      width="180"
					      show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column label="操作" width="150">
					      <template slot-scope="scope">
					        <el-button
					          size="mini"
					          @click="handleTestSelectEdit(scope.row)">编辑</el-button>
					        <el-button
					          size="mini"
					          type="danger"
					          @click="handleTestSelectDelete(scope.row)">删除</el-button>
					      </template>
					    </el-table-column>
					  </el-table>
			  	</div>
			  </el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog title="实验测试主管题" :visible.sync="dialogTestFormVisible">
		  <el-form :model="testUpdate" ref="testUpdate" style="width: 70%;margin: 0 auto" :rules="testrules">
		    <el-form-item label="题目描述" label-width="80" prop="topic">
		      	<el-input v-model="testUpdate.topic" type="textarea" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="标准答案" label-width="80" prop="answer">
		     	<el-input v-model="testUpdate.answer" type="textarea" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="答题关键词" label-width="80" prop="analysis">
		     	<el-input v-model="testUpdate.analysis" type="textarea" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogTestFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="testUpdateSave('testUpdate')">修 改</el-button>
		  </div>
		</el-dialog>
	<!-- 	编辑题目 -->
		<el-dialog title="选择题编辑" :visible.sync="dialogSelectFormVisible">
		 <el-form ref="EditTestSelect" :model="EditTestSelect" label-width="120px" style="width: 80%">
				<div class="subjectquestion" v-if = "EditTestSelect.type == 0"> 
					<div class="topic">
						<p>单选题</p>
					</div>
						<el-form-item
							label="题目描述"
							prop="topic"
							:rules="{
								 required: true, message: '题目描述不能为空', trigger: 'blur'
							}"
						>
						<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入题目的描述"
							v-model="EditTestSelect.topic">		
						</el-input>
					</el-form-item>
					<el-form-item>
					<el-radio-group v-model="EditTestSelect.correctAnswer" style="width: 100%">
						<div v-for="(answer,answerindex) in EditTestSelect.answer">
  						<el-form-item 
  							:prop="'answer.'+ answerindex +'.value'"
  							:rules="{
  								required: true, message: '可选答案不能为空', trigger: 'blur'
  							}"
  							:label="num[answerindex]"
  							style="margin-left: -100px">
  							<el-radio :label="answerindex" style="width: 100%">
  							<el-input
								placeholder="请写入可选答案"
  								v-model="answer.value"
  								style="width: 85%">		
  							</el-input>
  							</el-radio>
  						</el-form-item>
						</div>
					</el-radio-group>
					</el-form-item>
						<el-form-item
						label="答案解析">
						<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入答案解析"
							v-model="EditTestSelect.analysis">		
						</el-input>
					</el-form-item>
				</div>
				<div class="subjectquestion" v-else>
					<div class="topic">
						<p>多选题</p>			
					</div>
					<el-form-item
						label="题目描述"
						prop="topic"
						:rules="{
							 required: true, message: '题目描述不能为空', trigger: 'blur'
						}"
					>
						<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入题目的描述"
							v-model="EditTestSelect.topic">		
						</el-input>
					</el-form-item>
					<el-checkbox-group v-model="EditTestSelect.correctAnswer" style="width: 100%">
						<div v-for="(answer,answerindex) in EditTestSelect.answer">
  						<el-form-item 
  							:label="num[answerindex]"
  							:prop="'answer.'+ answerindex +'.value'"
  							:rules="{
  								required: true, message: '可选答案不能为空', trigger: 'blur'
  							}">
  							<el-checkbox :label="answerindex" style="width: 100%">
  							<el-input
								placeholder="请写入可选答案"
  								v-model="answer.value"
  								style="width: 85%">		
  							</el-input>
  							</el-checkbox>
  						</el-form-item>
						</div>
					</el-checkbox-group>
					<el-form-item
						label="答案解析">
						<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入答案解析"
							v-model="EditTestSelect.analysis">		
						</el-input>
					</el-form-item>
				</div>
				<el-form-item style="padding-top: 20px;">
					<el-button type="danger" @click="saveTestSelect('EditTestSelect')">保存</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>	
</template>
<script>
	import {getExperiment,UpdateExperiment,AddExperimentConclusion,AddExperimentContent,getExperimentContent,AddExperimentTitle,deleteExperimentContent,getExperimentConclusion,deleteExperimentConclusion,updateExperimentConclusion,AddExpConclusion,AddExamSelect,getAllExamSelect,updateExamSelect,deleteExamSelect} from '../../api/api';
	export default{
		name:"exprement",
		data(){
			return {
				activeName:'first',
				total:0,//总页数
				page:1,//当前页数
				pageSize:10,//分页数
				tableData:[],//实验数据
				testData:[],//测试题数据
				testManageData:[],//测试题管理
				tableloading:false,//加载
				testLoading:false,//加载
				testManageLoading:false,//加载
				exprement:{
					id:'',//实验编号
					projectname:'',//课程名称
					chaptername:'',//章节名称
					name:'',//实验名称
					description:'',//实验介绍
					time:'',//实验时长
				},
				dialogTestFormVisible:false,//dialog打开
				dialogSelectFormVisible:false,//测试题打开
				testUpdate:{
					id:'',//id
					topic:'',//题目描述
					answer:'',//标准答案
					analysis:'',//关键词
				},
				testrules:{
					topic:[ { required: true, message: '请输入题目的描述', trigger: 'blur' }],
					answer:[ { required: true, message: '请输入题目的标准答案', trigger: 'blur' }],
					analysis:[ { required: true, message: '请输入题目的分析', trigger: 'blur' }]
				},
				tableVisable:true,//表格显示
				editVisable:false,//编辑显示
				defaultProps:{
					children: 'children',
          			label: 'retitle'
				},//定义
				treedata:[{
					retitle:'添加实验报告',
					children:[
					]
				}],
				tree2data:[{
					retitle:'实验结果与总结',
					children:[
						{retitle:"综合测试"},
						{retitle:"实验总结"},
						{retitle:"测试题管理"},
					]
				}],
				title:'',//选择标题
				titleid:'',//选择的id
				title2:'',//实验总结标题
				content:[],//内容
				contentViable:false,//右侧内容显示
				contentViable2:false,//右侧内容显示
				Subjective:{
					question:[
						{
							topic:"",//题目描述
							answer:"",//标准答案
							analysis:"",//答案解析
						}
					],
				},
				summary:{
					title:"实验总结 （总结本次实验收获，实验中应该注意的事项）",
					flag:0,//是否添加总结
				},
				exam:{
					SingleSelection:[
						{
							questiontype:"单选题",
							topic:"",//题目描述
							answer:[
								{value:""},
								{value:""},
								{value:""},
								{value:""},
							],//答案
							correctAnswer:0,//正确答案
							analysis:"",//答案解析
						}
					],//单项选择题
					MultipleSelection:[
						{
							questiontype:"多选题",
							topic:"",//题目描述
							answer:[
								{value:""},
								{value:""},
								{value:""},
								{value:""},
							],//答案
							correctAnswer:[0],//正确答案
							analysis:"",//答案解析
						}
					],//多项选择题
				},
				EditTestSelect:{
					analysis:"",
					answer:[],
					correctAnswer:"",
					createtime:"",
					exid:"",
					id:"",
					topic:"",
					type:""
				},//选择题编辑
				num:["A","B","C","D","E","F","G","H","I","J"],//字母

			}
		},
		methods:{
			//获取实验数据
			getExprements(){
				let param={
					page:this.page,
					pageSize:this.pageSize
				}
				this.tableloading = true;
				getExperiment(param).then(res =>{
					this.tableloading = false;
					this.total = res.data.total;
					this.tableData = res.data.data;
				})
			},
			handleClick(row){
				this.tableVisable = false;
				this.editVisable = true;
				this.exprement.projectname = row.coname;
				this.exprement.chaptername = row.caname;
				this.exprement.name = row.ename;
				this.exprement.time = row.etime;
				this.exprement.description = row.einfo;
				this.exprement.id = row.id;
				this.testData = [];
				this.summary.flag = row.isconclusion;
				this.activeName = 'first';
				this.getExprementsConten();
			},
			//筛选
			filterType(value,row){
				return row.type == value;
			},
			saveBasic(){
				UpdateExperiment(this.exprement).then(res =>{
					if(res.data.code === 200){
	            		this.$message({
					        message: res.data.msg,
					        type:'success'
				        });
	            	}else{
	            		this.$message.error(res.data.msg);
	            	}
				});
			},
			append(node,data){
				this.$prompt('请选择要添加的模块', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		        }).then(({ value }) => {
			        let param = {
			    		exid:this.exprement.id,
			    		retitle:value
			    	}
			    	AddExperimentTitle(param).then(res=>{
			    		if(res.data.code === 200){
			    			this.$message({
						        message: res.data.msg,
						        type:'success'
					        });
					        this.getExprementsConten();
			    		}else{
			    			this.$message.error(res.data.msg);
			    		}
			    	});
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
		        	// const parent = node.parent;
			        // const children = parent.data.children || parent.data;
			        // const index = children.findIndex(d => d.label === node.label);
			        console.log(data);
			        let param = {
			        	id : data.id
			        }
			        deleteExperimentContent(param).then(res=>{
			        	if(res.data.code == 200){
			        		this.title = "";
			        		this.title2 = "";
			        		this.$message({
				               type: 'success',
				               message: res.data.msg
				            });
				            this.getExprementsConten();
			        	}else{
			        		this.$message.error(res.data.msg);
			        	}
			        })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    },
		    handleNodeClick(node,data){
		    	this.title = node.label;
		    	this.titleid = data.id;
		    	this.contentViable = true;
		    },
		    handleNodeClick2(node,data){
		    	this.title2 = node.label;
		    	this.contentViable2 = true;
		    	if(node.label === '测试题管理'){
		    		this.getConclusion();
		    	}
		    },
		    //添加主观题
		    addquestion(){
		    	this.Subjective.question.push({
		    		id:'',//标志
		    		topic:"",//题目描述
					answer:"",//标准答案
					analysis:"",//答案解析
		    	});
		    },
		    //remove删除主观题
		    removeSub(index){
		    	this.Subjective.question.splice(index,1);
		    },
		    //removeAnswerValue删除单项选择题的选项
		    removeAnswerValue(exaindex,answerindex){
		    	if(this.exam.SingleSelection[exaindex].answer.length <= 2) {
		    		this.$message({
			          showClose: true,
			          message: '最少需要两个答案',
			          type: 'warning'
			        });
		    		return
		    	};
		    	this.exam.SingleSelection[exaindex].correctAnswer = 0;
		    	this.exam.SingleSelection[exaindex].answer.splice(answerindex,1);
		    },
		    //removeMulAnswerValue删除多选择题的选项
		    removeMulAnswerValue(exaindex,answerindex){
		    	if(this.exam.MultipleSelection[exaindex].answer.length <= 2) {
		    		this.$message({
			          showClose: true,
			          message: '最少需要两个答案',
			          type: 'warning'
			        });
		    		return
		    	};
		    	this.exam.MultipleSelection[exaindex].correctAnswer = [0];
		    	this.exam.MultipleSelection[exaindex].answer.splice(answerindex,1);
		    },
		    //addSelect增加选项
		    addSelect(exaindex){
		    	this.exam.SingleSelection[exaindex].answer.push({
		    		value:""
		    	});
		    },
		    //addMulSelect增加多选选项
		    addMulSelect(exaindex){
		    	this.exam.MultipleSelection[exaindex].answer.push({
		    		value:""
		    	});
		    },
		    //添加单选题
		    addSelectQuestion(){
		    	this.exam.SingleSelection.push({
					questiontype:"单选题",
					topic:"",//题目描述
					answer:[
						{value:""},
						{value:""},
						{value:""},
						{value:""},
					],//答案
					correctAnswer:0,//正确答案
					analysis:"",//答案解析
				});
		    },
		    //addMultipleSelection添加多选题
		    addMultipleSelection(){
		    	this.exam.MultipleSelection.push({
		    		questiontype:"多选题",
					topic:"",//题目描述
					answer:[
						{value:""},
						{value:""},
						{value:""},
						{value:""},
					],//答案
					correctAnswer:[0],//正确答案
					analysis:"",//答案解析
		    	});
		    },
		    //removeSingleSelection删除单选题
		    removeSingleSelection(index){
		    	this.exam.SingleSelection.splice(index,1);
		    },
		    //removeMultipleSelection删除多选题
		    removeMultipleSelection(index){
		    	this.exam.MultipleSelection.splice(index,1);
		    },
		    //submitForm题目保存
		    submitForm(formName){
		    	this.$refs[formName].validate((valid) => {
			        if (valid) {
			        	this.exam.exid = this.exprement.id;
			          	AddExamSelect(this.exam).then(res =>{
			          		if(res.data.code === 200){
				    			this.$message({
						          message: res.data.msg,
						          type: 'success'
						        });
						        this.exam ={
									SingleSelection:[
										{
											questiontype:"单选题",
											topic:"",//题目描述
											answer:[
												{value:""},
												{value:""},
												{value:""},
												{value:""},
											],//答案
											correctAnswer:0,//正确答案
											analysis:"",//答案解析
										}
									],//单项选择题
									MultipleSelection:[
										{
											questiontype:"多选题",
											topic:"",//题目描述
											answer:[
												{value:""},
												{value:""},
												{value:""},
												{value:""},
											],//答案
											correctAnswer:[0],//正确答案
											analysis:"",//答案解析
										}
									],//多项选择题
								}
				    		}else{
				    			this.$message.error(res.data.msg);
				    		}
			         	});
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
		        });
		    },
		    //handleCurrentChange分页
		    handleCurrentChange(val){
		    	this.page = val;
		    	this.getExprements();
		    },
		    goback(){
		    	this.tableVisable = true;
		    	this.editVisable = false;
		    },
		    //保存内容
		    saveContent(){
		    	let param = {
		    		id:this.titleid,
		    		retitle:this.title,
		    		recont:this.content[this.titleid]
		    	}
		    	AddExperimentContent(param).then(res => {
		    		if(res.data.code === 200){
		    			this.$message({
				          message: res.data.msg,
				          type: 'success'
				        });
				        this.getExprementsConten();
		    		}else{
		    			this.$message.error(res.data.msg);
		    		}
		    	});
		    },
		    //实验总结保存
		    saveConclusion(formName){
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.Subjective.exid = this.exprement.id;
		    		AddExperimentConclusion(this.Subjective).then(res =>{
			    		if(res.data.code === 200){
			    			this.$message({
					          message: res.data.msg,
					          type: 'success'
					        });
					        this.Subjective = {
					    		question:[
									{
										id:"",//标志
										topic:"",//题目描述
										answer:"",//标准答案
										analysis:"",//答案解析
									}
								],
			    			}
			    		}else{
			    			this.$message.error(res.data.msg);
			    		}
			    	});
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    //获取实验结果与总结
		    getConclusion(){
		    	let param = {
		    		exid : this.exprement.id
		    	}
		    	this.testLoading = true;
		    	getExperimentConclusion(param).then(res =>{
		    		this.testData = res.data.data;
		    		this.testLoading = false;
		    	});
		    },
		    //获取实验内容
		    getExprementsConten(){
		    	let param ={
		    		id:this.exprement.id
		    	}
		    	getExperimentContent(param).then(res =>{
		    		this.treedata[0].children = res.data.data;
		    		res.data.data.forEach(content => {
		    			this.content[content.id] = content.recont;
		    		})
		    	});
		    },
		    //handleTestDelete删除测试题
		    handleTestDelete(row){
		    	this.$confirm('此操作将永久删除该主观测试题, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	let param = {
		    			id : row.id
			    	}
			    	deleteExperimentConclusion(param).then(res =>{
			    		if(res.data.code === 200){
			    			this.$message({
						        message: res.data.msg,
						        type: 'success'
					        });
					        this.getConclusion();
			    		}else{
			    			this.$message.error(res.data.msg);
			    		}
			    	});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    },
		    //handleTestEdit打开编辑测试题
		    handleTestEdit(row){
		    	this.dialogTestFormVisible = true;
		    	this.testUpdate = row;
		    },
		    //testUpdateSave 修改测试题
		    testUpdateSave(formName){
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		            updateExperimentConclusion(this.testUpdate).then(res =>{
			    		if(res.data.code === 200){
			    			this.$message({
					          message: res.data.msg,
					          type: 'success'
					        });
					        this.dialogTestFormVisible = false;
					        this.getConclusion();
			    		}else{
			    			this.$message.error(res.data.msg);
			    		}
			    	});
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    //添加总结
		    AddConclusion(){
		    	let param = {
		    		id : this.exprement.id
		    	}
		    	AddExpConclusion(param).then(res => {
		    		if(res.data.code === 200){
		    			this.$message({
				          message: res.data.msg,
				          type: 'success'
				        });
				        this.summary.flag = 1;
		    		}else{
		    			this.$message.error(res.data.msg);
		    		}
		    	});
		    },
		    //获取所有的测试题
		    getAllExamSelects(){
		    	let param = {
		    		id : this.exprement.id
		    	}
		    	this.testManageLoading = true;
		    	getAllExamSelect(param).then(res => {
		    		this.testManageData = res.data.data;
		    		this.testManageLoading = false;
		    	});
		    },
		    //handleTabClick点击上面tab标签
		    handleTabClick(tab, event){
		    	if(tab.name == 'fifth'){
		    		this.getAllExamSelects();
		    	}else if(tab.name == 'third'){
		    		this.getConclusion();
		    	}
		    },
		    //handleTestSelectEdit处理测试题目
		    handleTestSelectEdit(row){
		    	this.EditTestSelect = row;
		    	if(row.type == 1){
		    		if(typeof (row.correctAnswer) == 'string'){
		    			this.EditTestSelect.correctAnswer = row.correctAnswer.split(",").map(Number);
		    		}
		    	}else{
		    		this.EditTestSelect.correctAnswer = Number(this.EditTestSelect.correctAnswer);
		    	}
		    	this.dialogSelectFormVisible = true;
		    },
		    //测试题保存
		    saveTestSelect(formName){
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		           	updateExamSelect(this.EditTestSelect).then(res => {
		           		if(res.data.code === 200){
			    			this.$message({
					          message: res.data.msg,
					          type: 'success'
					        });
					        this.dialogSelectFormVisible = false;
					        this.getAllExamSelects();
			    		}else{
			    			this.$message.error(res.data.msg);
			    		}
		           	});
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    //删除测试题
		    handleTestSelectDelete(row){
		    	this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	deleteExamSelect(row).then(res => {
		        		if(res.data.code === 200){
			    			this.$message({
					          message: res.data.msg,
					          type: 'success'
					        });
					        this.dialogSelectFormVisible = false;
					        this.getAllExamSelects();
			    		}else{
			    			this.$message.error(res.data.msg);
			    		}
	    			});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    }

		},
		mounted(){
	    	this.getExprements();
	    }
	}
</script>
<style scoped>
	.detial{
		padding-top: 40px;
	}
	.basicInformation{
		width: 50%;
		margin: 10px 10%;
	}
	.grid-content{
		height: 500px;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		border-left: 1px solid #ccc;
	}
	.bg-purple-light{
		border-right: 1px solid #ccc;
		overflow-y: scroll;
	}
	.quil_content{
		padding-left: 10px;
		padding-right: 10px;
	}
	.title{
		padding-left: 10px;
		font-weight: bold;
		display: inline-block;
	}
	.btnsave{
		padding-top: 10px;
	}
	.topic{
		margin-left: 40px;
		padding-left: 10px;
		height: 30px;
		line-height: 30px;
		background-color: #dfe2e2;
		box-sizing: border-box;
		color: #333;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.topic p{
		display: inline-block;
		margin: 0px;
	}
	.subjectquestion{
		border-bottom: 1px dashed #dfe2e2;
	}
	.el-icon-delete{
		color:#2D8cF0;
		cursor: pointer;
	}
	.el-icon-delete:hover{
		color: #62a7f1;
	}
	.el-icon-back{
		margin-bottom: 10px;
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
	.el-checkbox__label{
		width: 100%;
	}
	.el-form-item .el-form-item{
		margin-bottom: 20px;
	}
</style>