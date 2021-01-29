import {GET_ROLE_INFO} from '../../actions-type/role'
import {getRoleInfo} from '../../../api/http'

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
            dispatch(get_role_info(productInfo.data))
        }
    }
}
