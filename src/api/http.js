import axiosApi from './axiosApi'
//获取角色列表
export const getRoleInfo = () => axiosApi.get('/manage/role/list')
export const updateRoleInfo = (RoleInfo) => axiosApi.post('/manage/role/update',RoleInfo)

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => axiosApi.get('/manage/category/list', parentId)