import {GET_ROLE_INFO} from '../../actions-type/role'
import {getRoleInfo} from '../../../api/http'
import dayjs from 'dayjs'

export const get_role_info = function (payload) {
    return {
        type: GET_ROLE_INFO,
        payload
    }
}


export default {
    //获取商品分页列表
    getRoleInfo() {
        //因为要传参所以返回需要的函数,外部函数用来接收参数
        return async (dispatch) => {
            const productInfo = await getRoleInfo()
            productInfo.data = productInfo.data.map(item=>({
                ...item,
                auth_time:item.auth_time?dayjs().format("YYYY-MM-DD, HH:mm:ss"):null,
                key:item._id
            }))
            dispatch(get_role_info(productInfo.data))
        }
    }
}
