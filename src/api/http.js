import axiosApi from './axiosApi'
//获取角色列表
export const getRoleInfo = () => axiosApi.get('/manage/role/list')
//修改角色
export const upDataRoleInfo = (roleInfo) => axiosApi.post('/manage/role/update',roleInfo)
//添加角色
export const addRoleInfo = (roleName) => axiosApi.post('/manage/role/add', {roleName})

//获取用户列表
export const getUserInfo = () => axiosApi.get('/manage/user/list')
//删除用户
export const delUserInfo = (userId) => axiosApi.post('/manage/user/delete',{userId})
//添加/修改用户
export const addOrUpDataUserInfo = (userInfo) => axiosApi.post(!userInfo._id?'/manage/user/add':'/manage/user/update',userInfo)

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => axiosApi.get('/manage/category/list', {parentId})

