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
				<el-select v-model="filters.exid" filterable placeholder="请选择实验">
				    <el-option
				      v-for="item in options"
				      :key="item.id"
				      :label="item.ename"
				      :value="item.id">
				    </el-option>
				</el-select>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="num" label="学号" width="120" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="score" label="测试得分" width="120" show-overflow-tooltip  align="center" sortable>
				<template slot-scope="scope">
					{{scope.row.score}}
				</template>
			</el-table-column>
			<el-table-column prop="stime" label="签到时间" width="200" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="etime" label="签退时间"  width="200" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="duration" label="实验时长" width="200" show-overflow-tooltip sortable align="center">
			</el-table-column>
			<el-table-column label="操作" width="150">
				 <template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">全部数据</el-button>
			<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination> -->
		</el-col>

		<!--编辑界面-->
		<el-dialog title="实验报告" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<div>
				<p style="text-align: center;">
					<span>班级：</span><span class="textspan">{{filters.classname}}</span>&nbsp;&nbsp;&nbsp;
					<span>姓名：</span><span class="textspan">{{editForm.name}}</span>&nbsp;&nbsp;&nbsp;
					<span>得分:</span><span class="textspan">{{editForm.score}}</span>
				</p>
				<div v-for = "item in stuExprement">
					<div class="title">{{item.retitle}}</div>
					<div class="content" v-html="item.recont"></div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
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
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser,getClassInfo,getExperimentnameInfo,getStudentAllInfo,getStuExreportAll} from '../../api/api';

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
				options: [],//实验信息
			    classoption:[
			    ],//班级信息
			    stuExprement:[],//实验目的
			    stuExpreport:[],//实验报告
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
				getStudentAllInfo(this.filters).then((res) => {
					this.users = res.data.data;
					// console.log(this.users);
					this.listLoading = false;
					//NProgress.done();
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
				getStuExreportAll(param).then(res =>{
					this.stuExprement = Object.assign([],res.data.data);
					this.stuExpreport = Object.assign([],res.data.report);
				})
				// console.log(row);
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
			//getExperimentnameInfo获取实验信息
			getExperimentname(){
				getExperimentnameInfo().then(res => {
					// console.log(res.data.data);
					this.options = res.data.data
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

		},
		mounted() {
			// this.getUsers();
			this.getClass();
			this.getExperimentname();
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
</style>