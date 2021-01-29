import Axios from 'axios'
//引入加载效果(js)
import NProgress from 'nprogress'

const axios = Axios.create({
    // baseURL: '/api',
    timeout: 8000
})
axios.interceptors.request.use(function (config) {
    //发送请求前,开启
    NProgress.start()
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    //发送请求成功后,关闭
    NProgress.done()
    return response.data;
}, function (error) {
    //发送请求失败后,关闭
    NProgress.done()
    return Promise.reject(error);
});
export default axios
