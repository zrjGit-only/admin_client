import axiosApi from './axiosApi'
//获取角色列表
export const getRoleInfo = () => axiosApi.get('/manage/role/list')
export const updateRoleInfo = (RoleInfo) => axiosApi.post('/manage/role/update',RoleInfo)