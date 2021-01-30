import axiosApi from './axiosApi'
//获取角色列表
export const getRoleInfo = () => axiosApi.get('/manage/role/list')
//修改角色
export const updateRoleInfo = (roleInfo) => axiosApi.post('/manage/role/update',roleInfo)
//添加角色
export const addRoleInfo = (roleName) => axiosApi.post('/manage/role/add', {roleName})