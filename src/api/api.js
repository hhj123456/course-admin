import axios from 'axios';

let base = '';
//获取课程名
export const getCourseName = params => {return axios.get(`${base}/course/project`, { params: params })};
//获取章节名
export const getChapterName = params =>{return axios.get(`${base}/chapter/project`, { params: params })};
//获取实验数据
export const getProject = params =>{return axios.get(`${base}/exprement/project`, { params: params })};



export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
