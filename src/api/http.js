import axiosApi from './axiosApi'
//获取角色列表
export const getRoleInfo = () => axiosApi.get('/manage/role/list')
//修改角色
export const updateRoleInfo = (roleInfo) => axiosApi.post('/manage/role/update',roleInfo)
//添加角色
export const addRoleInfo = (roleName) => axiosApi.post('/manage/role/add', {roleName})

//获取用户列表
export const getUserInfo = () => axiosApi.get('/manage/user/list')
//删除用户
export const delUserInfo = (userId) => axiosApi.post('/manage/user/delete',{userId})

//登录
export const login = (username, password) => axiosApi.post('/login', {username, password})

//获取一二级列表
export const getCategory = (parentId) => axiosApi.get(' /manage/category/list', {params: {parentId}})
//添加一级/二级分类
export const addCategory = (parentId, categoryName) => axiosApi.post('/manage/category/add', {parentId, categoryName})
//更新一级/二级分类
export const upDataCategory = (categoryId, categoryName) => axiosApi.post('/manage/category/update', {categoryId, categoryName})
