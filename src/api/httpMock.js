import axiosMock from './axiosMock'

// mockjs
//获取chart数据
export const getChart = () => axiosMock.get(`/charts`)
//修改chart数据
export const patchChart = (id,chart) => axiosMock.patch(`/charts/${id}`,chart)