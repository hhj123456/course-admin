<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-select v-model="filters.classname" filterable placeholder="请选择班级">
				    <el-option
				      v-for="item in classoption"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
				<el-select v-model="filters.exid" filterable placeholder="请选择课程" @change = "changeSelect">
				    <el-option
				      v-for="item in options"
				      :key="item.id"
				      :label="item.coname"
				      :value="item.id">
				    </el-option>
				</el-select>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
					<el-button type="danger" v-on:click="UploadCourse" v-show="downloadFlag">下载</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;"  height="500">
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column prop="num" label="学号"  show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="name" label="姓名" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="stuChoice" label="实验预习"  show-overflow-tooltip  align="center" sortable>
				<template slot-scope="scope">
					{{scope.row.stuChoice.toFixed(2)}}
				</template>
			</el-table-column>
			<el-table-column prop="operationscore" label="实验操作" show-overflow-tooltip  align="center" sortable>
				<template slot-scope="scope">
					{{scope.row.stuOperation.toFixed(2)}}
				</template>
			</el-table-column>
			<el-table-column prop="reportscore" label="实验报告"  show-overflow-tooltip  align="center" sortable>
				<template slot-scope="scope">
					{{scope.row.stuReport.toFixed(2)}}
				</template>
			</el-table-column>
			<el-table-column prop="rationscore" label="总分"  show-overflow-tooltip  align="center" sortable>
				<template slot-scope="scope">
					{{scope.row.stuAllScore.toFixed(2)}}
				</template>
			</el-table-column>
		<!-- 	<el-table-column label="操作" width="200">
				 <template slot-scope="scope">
					<el-button size="small" @click="handleExprement(scope.$index, scope.row)">分数</el-button>
					<el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column> -->
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">全部数据</el-button>
			<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination> -->
		</el-col>

		<!--编辑界面-->
		<el-dialog title="实验报告" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<div id="pdfDom"  ref="resume">
				<p style="text-align: center;line-height: 50px;font-size: 20px;font-weight: bold">{{ExprementName}}</p>
				<p style="text-align: center;line-height: 50px;">
					<span>班级：</span><span style="text-decoration:underline;">&nbsp;{{filters.classname}}&nbsp;</span>&nbsp;&nbsp;&nbsp;
					<span>姓名：</span><span  style="text-decoration:underline;">&nbsp;{{editForm.name}}&nbsp;</span>&nbsp;&nbsp;&nbsp;
					<span>得分:</span>&nbsp;&nbsp;<span  style="text-decoration:underline;">&nbsp;&nbsp;{{editForm.rationscore}} &nbsp;&nbsp;</span>
				</p>
				<div v-for = "item in stuExprement">
					<div style="font-weight: bold;font-size: 15px;padding:10px 15px;">{{item.retitle}}</div>
					<div style="padding: 10px 15px;" v-html="item.recont"></div>
				</div>
				<div class="title">实验思考</div>
				<div v-for = "item in stuExpreport">
					<div style="font-size: 14px;padding:10px 15px;font-weight: bold;">
						{{item.topic}}<span>(总分:{{item.Allscore}}分)</span>
					</div>
					<div v-html="item.content" style="padding-left: 30px;min-height: 140px"></div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="uploadExprement()" :loading="editLoading">下载</el-button>
			</div>
		</el-dialog>

		<!--编辑分数界面-->
		<el-dialog title="实验思考主观题" :visible.sync="editExpreVisible" :close-on-click-modal="false" v-loading = "eldialogscore">
			<div>
				<p style="text-align: center;">
					<span>班级：</span><span class="textspan">{{filters.classname}}</span>&nbsp;&nbsp;&nbsp;
					<span>姓名：</span><span class="textspan">{{editForm.name}}</span>&nbsp;&nbsp;&nbsp;
					<!-- <span>得分:</span><span class="textspan">{{editForm.score}}</span> -->
				</p>
				<div class="title">实验思考</div>
				<div v-for = "(item,index) in stuExpreport">
					<div class="titletopic">
						{{item.topic}}
						<span style="color: red">(总分：{{item.Allscore}}分)</span>
					</div>
					<div v-html="item.content" style="padding-left: 30px"></div>
					<span style="padding-left: 20px;">请输入分数：</span>
					<el-input v-model="item.score" placeholder="请输入分数" type="number" :min="0" :max="item.Allscore" style="width: 300px"></el-input>
					<el-button type="warning" @click="submitscore(index,item.Allscore)">保存</el-button>
				</div>
				<div class="title" style="margin-top: 20px">操作得分</div>
				<span style="padding-left: 20px;">请输入分数：</span>
				<el-input v-model="editForm.operationscore" placeholder="请输入分数" type="number" :min="0" :max="100" style="width: 300px"></el-input>
				<el-button type="warning" @click="updateoperationscore">保存</el-button>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editExpreVisible = false">关闭</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser,getClassInfo,getProjectnameInfo,getStudentProjectInfo,getStuExreportAll,updatescore,htmltowordurl,updateopretion} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					classname: '',
					exid:'',
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editExpreVisible:false,//编辑分数页面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					name : '',//姓名
					score: '',//分数
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				options: [],//课程信息
			    classoption:[
			    ],//班级信息
			    stuExprement:[],//实验目的
			    stuExpreport:[],//实验报告
			    report:[],//主观题分数
			    eldialogscore:false,//加载
			    htmlTitle: '',
			    ExprementName:'',//当前实验的名称
			    downloadFlag:false,//下载显示
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				this.listLoading = true;
				//NProgress.start();
				getStudentProjectInfo(this.filters).then((res) => {
					if(res.data.code == 200){
						this.users = res.data.data;
						this.downloadFlag = true;
					}else{
						this.downloadFlag = false;
						this.users = [];
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
					this.listLoading = false;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				let param = {
					exid : row.exid,
					stuid : row.id
				}
				this.htmlTitle += "-"+row.name+"实验报告";
				getStuExreportAll(param).then(res =>{
					this.stuExprement = Object.assign([],res.data.data);
					this.stuExpreport = Object.assign([],res.data.report);

				})
				// console.log(row);
			},//显示分数编辑页面
			handleExprement(index, row){
				this.editExpreVisible = true;
				this.editForm = Object.assign({}, row);
				let param = {
					exid : row.exid,
					stuid : row.id
				}
				getStuExreportAll(param).then(res =>{
					this.stuExpreport = Object.assign([],res.data.report);
					// console.log(this.stuExpreport);
				})
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {
					this.$message.error("网络故障");
				});
			},
			getClass(){
				getClassInfo().then(res => {
					let classInfo = Object.assign([],res.data.data);
					for (var i = 0; i < classInfo.length; i++) {
						this.classoption.push({
							value : classInfo[i].class,
							label:classInfo[i].class
						})
					}
				}).catch(ret => {
					this.$message.error("网络故障");
				})
			},
			//getProjectInfo获取课程信息
			getProjectInfo(){
				getProjectnameInfo().then(res => {
					// console.log(res.data.data);
					this.options = res.data.data;
				}).catch( ret => {
					this.$message.error("网络故障");
				})
			},
			zeroPadding(num,digit){
				var zero = '';
			    for(var i = 0; i < digit; i++) {
			        zero += '0';
			    }
			    return (zero + num).slice(-digit);
			},
			//下载实验报告
			uploadExprement(){
				const template  =this.$refs.resume.innerHTML;
				let html = `<!DOCTYPE html>
				<html>
				<head>
					<title></title>
					<meta charset="utf-8">
				</head>
				<body>
					${template}
				</body>
				</html>`;
				var a = document.createElement('a');
			    var url = window.URL.createObjectURL(new Blob([html],
			        { type: "text/html" + ";charset=" + 'utf-8' }));
			    a.href = url;
			    a.download = this.htmlTitle || 'file';
			    a.click();
			    window.URL.revokeObjectURL(url);
			},
			//保存分数
			submitscore(index,Allscore){
				if(Number(this.stuExpreport[index].score) > Number(Allscore)){
					this.$message.error('得分不能大于题目总分！');
					return false;
				}
				updatescore(this.stuExpreport[index]).then(res => {
					if(res.data.code == 200){
						this.$message({
				          message: res.data.msg,
				          type: 'success'
				        });
					}else{
						this.$message.error(res.data.msg);
					}
				}).catch(ret => {
					this.$message.error("网络故障");
				})
			},
			//选择
			changeSelect(value){
				for (var i = 0; i < this.options.length; i++) {
					if(this.options[i].id == value){
						this.ExprementName = this.options[i].ename;
						this.htmlTitle = this.options[i].ename;
					}
				}
			},
			//修改操作得分
			updateoperationscore(){
				// console.log(this.editForm);
				if(this.editForm.operationscore > 100){
					this.$message.error("操作得分不得大于100");
					return false;
				}
				updateopretion(this.editForm).then(res => {
					if(res.data.code == 200){
						this.$message({
				          message: res.data.msg,
				          type: 'success'
				        });
					}else{
						this.$message.error(res.data.msg);
					}
				}).catch(ret => {
					this.$message.error("网络故障");
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},
			//下载学生信息
			UploadCourse(){
				console.log(this.users);
				const { export_json_to_excel } = require('../../vendor/Export2Excel');
				const tHeader = ['学生学号','学生姓名','学生预习成绩','学生操作成绩','学生报告成绩','学生总分'];
				const filterVal = ['num','name','stuChoice','stuOperation','stuReport','stuAllScore'];
				const list = this.users;
				const data = this.formatJson(filterVal,list);
				var classname = this.filters.classname;
				var course = '';
				for (var i = 0; i < this.options.length; i++) {
					if(this.options[i].id == this.filters.exid){
						course = this.options[i].coname;
					}
				}
				var title = course+"—成绩总计("+classname+")";
				export_json_to_excel(tHeader, data, title);
			}

		},
		mounted() {
			// this.getUsers();
			this.getClass();
			this.getProjectInfo();
		}
	}

</script>

<style scoped>
	.textspan{
		text-decoration:underline;
	}
	.title{
		font-weight: bold;
		font-size: 15px;
		padding:10px 15px;
	}
	.content{
		padding: 10px 15px;
	}
	.titletopic{
		font-size: 14px;
		padding:10px 15px;
		font-weight: bold;
	}
</style>