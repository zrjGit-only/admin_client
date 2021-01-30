import {GET_USER_INFO} from '../../actions-type/user'
import {getUserInfo} from '../../../api/http'

export const get_user_info = function (payload) {
    return {
        type: GET_USER_INFO,
        payload
    }
}


export default {
    //获取商品分页列表
    getUserInfo() {
        //因为要传参所以返回需要的函数,外部函数用来接收参数
        return async (dispatch) => {
           const userInfo =  await getUserInfo()
            dispatch(get_user_info(userInfo.data.users))
        }
    }
}
