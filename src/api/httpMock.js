import axiosMock from './axiosMock'

// mockjs
//获取首页折线图信息
export const getBizChartLine = () => axiosMock.get(`/bizLine`)
//获取首页饼状图销售信息
export const getBizChartPieAccess = () => axiosMock.get(`/bizPieAccess`)
//获取首页柱状图访问信息
export const getBizChartBarSales = () => axiosMock.get(`/bizBarSales`)

//获取chart数据
export const getChart = () => axiosMock.get(`/charts`)
//修改chart数据
export const patchChart = (id,chart) => axiosMock.patch(`/charts/${id}`,chart)

//获取role数据
export const getRoleInfo = () => axiosMock.get('/role')
//添加role数据
export const postRoleInfo = (roleInfo) => axiosMock.post('/role', roleInfo)
//修改role数据
export const patchRoleInfo = (id,roleInfo) => axiosMock.patch(`/role/${id}`, roleInfo)

//获取user数据
export const getUserInfo = () => axiosMock.get('/user')
//添加user数据
export const postUserInfo = (userInfo) => axiosMock.post('/user', userInfo)
//修改user数据
export const patchUserInfo = (id,roleInfo) => axiosMock.patch(`/user/${id}`, roleInfo)
//删除user数据
export const delUserInfo = (id) => axiosMock.delete(`/user/${id}`)