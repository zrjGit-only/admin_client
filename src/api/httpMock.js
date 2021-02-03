import axiosMock from './axiosMock'

// mockjs
export const getChart = (categoryId) => axiosMock.get(`/charts`)