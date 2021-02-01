import {SPH_ADMIN_LOGIN} from '../../../utils/localStorageType'
//eslint-disable-next-line
export default {
    //读取登录信息
    userInfo: JSON.parse(localStorage.getItem(SPH_ADMIN_LOGIN)) || {},
    //保存用户管理里的用户信息
    user:[]
}
