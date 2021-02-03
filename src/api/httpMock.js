import axiosMock from './axiosMock'

// mockjs

//获取chart数据
export const getChart = () => axiosMock.get(`/charts`)
//修改chart数据
export const patchChart = (id,chart) => axiosMock.patch(`/charts/${id}`,chart)

//获取role数据
export const getRoleInfo = () => axiosMock.get('/role')
//添加role数据
export const postRoleInfo = (roleInfo) => axiosMock.post('/role', {roleInfo})
//修改role数据
export const patchRoleInfo = (id,roleInfo) => axiosMock.patch(`/role/${id}`, roleInfo)