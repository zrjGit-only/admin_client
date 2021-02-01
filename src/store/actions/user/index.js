import {GET_USER_INFO} from '../../actions-type/user'
import {getUserInfo} from '../../../api/http'
import dayjs from 'dayjs'
import {LOGIN} from '../../actions-type/user'
import {login} from '../../../api/http'
import {SPH_ADMIN_LOGIN} from '../../../utils/localStorageType'

export const get_user_info = function (payload) {
    return {
        type: GET_USER_INFO,
        payload
    }
}

export const user_info = function (payload) {
    return {
        type: LOGIN,
        payload
    }
}

//eslint-disable-next-line
export default {
    //获取用户信息
    getUserInfo() {
        //因为要传参所以返回需要的函数,外部函数用来接收参数
        return async (dispatch) => {
            const userInfo = await getUserInfo()
            const res = userInfo.data.users.map(item => {
                const role = userInfo.data.roles.find(i => i._id === item.role_id)
                return {
                    ...item,
                    create_time: dayjs().format("YYYY-MM-DD, HH:mm:ss"),
                    role: role ? role.name : ''
                }
            })
            dispatch(get_user_info(res))
        }
    },

    //登录
    userLogin(username, password) {
        //因为要传参所以返回需要的函数,外部函数用来接收参数
        return async (dispatch) =>{
            try {
                const loginInfo = await login(username, password)
                dispatch(user_info(loginInfo))
                //下次可以自动登录
                localStorage.setItem(SPH_ADMIN_LOGIN,JSON.stringify(loginInfo))
                return loginInfo
            } catch (e) {
                console.log('请求失败', e);
            }
        }
    },
}
