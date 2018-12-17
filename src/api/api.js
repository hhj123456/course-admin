import axios from 'axios';
const Qs = require('qs');

let base = 'api';
// let base ='http://111.230.237.84/exserver/index.php?';
export let baseImge = "http://111.230.237.84/exserver/";//图片读取地址
export let imgUploadUrl = `${base}/Addcourse/imgupload`;//图片上传路劲

//教师登录接口
export const requestTeacherLogin = params => { 
	return axios.post(
		`${base}/TeaLogin/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取实验数据
export const getProject = params => { 
	return axios.post(
		`${base}/Cce/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//新增课程
export const imgUpload = params => { return axios.post(`${base}/Addcourse/index`, params)};

//删除课程
export const removeCourse = params => { 
	return axios.post(
		`${base}/Addcourse/delete`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//更新课程
export const updateCourse = params =>{ return axios.post(`${base}/Addcourse/update`, params)};

//新增章节
export const Addcourse = params => { 
	return axios.post(
		`${base}/Addchapter/insert`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//删除章节
export const removeChapter = params => { 
	return axios.post(
		`${base}/Addchapter/delete`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//更新章节
export const updateChapter = params => { 
	return axios.post(
		`${base}/Addchapter/update`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//新增实验
export const Addexperiment = params => { 
	return axios.post(
		`${base}/Addexperiment/insert`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//更新实验
export const UpdateExperiment = params => { 
	return axios.post(
		`${base}/Addexperiment/update`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//删除实验
export const removeExperiment = params => { 
	return axios.post(
		`${base}/Addexperiment/delete`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取实验内容
export const getExperiment = params => { 
	return axios.post(
		`${base}/Addexperiment/search`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};


//新增实验中的每章节的标题
export const AddExperimentTitle = params => { 
	return axios.post(
		`${base}/Addexreport/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//新增实验中的内容
export const AddExperimentContent = params => { 
	return axios.post(
		`${base}/Addexreport/update`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//获取实验中的内容
export const getExperimentContent = params => { 
	return axios.post(
		`${base}/Addexreport/search`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//删除实验报告的中的内容
export const deleteExperimentContent = params => { 
	return axios.post(
		`${base}/Addexreport/delete`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//新增实验中的实验总结
export const AddExperimentConclusion = params => { 
	return axios.post(
		`${base}/Exconclusion/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取实验与总结中的主观题
export const getExperimentConclusion = params => { 
	return axios.post(
		`${base}/Exconclusion/search`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//删除实验与总结中的主观题
export const deleteExperimentConclusion = params => { 
	return axios.post(
		`${base}/Exconclusion/delete`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//更新实验与总结中的主观题
export const updateExperimentConclusion = params => { 
	return axios.post(
		`${base}/Exconclusion/update`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//添加实验总结
export const AddExpConclusion = params => { 
	return axios.post(
		`${base}/Exconclusion/addConclusion`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//添加选择题
export const AddExamSelect = params => { 
	return axios.post(
		`${base}/TestSelect/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//显示所有选择题
export const getAllExamSelect = params => { 
	return axios.post(
		`${base}/TestSelect/search`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//更新选择题
export const updateExamSelect = params => { 
	return axios.post(
		`${base}/TestSelect/update`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//删除选择题
export const deleteExamSelect = params => { 
	return axios.post(
		`${base}/TestSelect/delete`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//开始实验
export const startExamSelect = params => { 
	return axios.post(
		`${base}/Addexperiment/start`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取学生信息
export const getUserListPage = params => { 
	return axios.post(
		`${base}/Import/search`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//学生信息导入地址
export const ImportStudentInfo = params => { return axios.post(`${base}/Import/index`, params)};

//添加学生信息
export const addUser = params => { 
	return axios.post(
		`${base}/Import/adduser`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//修改学生信息
export const editUser = params => { 
	return axios.post(
		`${base}/Import/update`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//删除学生信息
export const removeUser = params => { 
	return axios.post(
		`${base}/Import/remove`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//批量删除学生信息
export const batchRemoveUser = params => { 
	return axios.post(
		`${base}/Import/batchremove`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取目前学生的班级信息
export const getClassInfo = params => { 
	return axios.post(
		`${base}/Import/getclass`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取目前实验数据
export const getExperimentnameInfo = params => { 
	return axios.post(
		`${base}/expSelect/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
//获取学生报告
export const getStuExreportAll = params => { 
    return axios.post(
        `${base}/Expinfo/index`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//获取目前实验以及班级的签到情况
export const getStudentAllInfo = params => { 
	return axios.post(
		`${base}/Allinfo/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//修改分数
export const updatescore = params => { 
	return axios.post(
		`${base}/Expinfo/score`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//导出文档地址
export const htmltowordurl = params => { 
    return axios.post(
        `${base}/HtmlToWord/index`,
        params,
        {
        	responseType: 'blob'
        }
    ); 
};

//获取实验比例
export const rationSelect = params => { 
	return axios.post(
		`${base}/Addexperiment/rationSelect`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//更新实验比例
export const updateratio = params => { 
	return axios.post(
		`${base}/Addexperiment/updateratio`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//更新操作成绩
export const updateopretion = params => { 
	return axios.post(
		`${base}/Expinfo/updateoperationscore`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
// //获取课程名
// export const getCourseName = params => {return axios.get(`${base}/course/project`, { params: params })};
// //获取章节名
// export const getChapterName = params =>{return axios.get(`${base}/chapter/project`, { params: params })};
// //获取实验数据
// // export const getProject = params =>{return axios.get(`${base}/exprement/project`, { params: params })};



// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
