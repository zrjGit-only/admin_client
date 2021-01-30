import {GET_USER_INFO} from '../../actions-type/user'
import {getUserInfo} from '../../../api/http'
import dayjs from 'dayjs'

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
    }
}
