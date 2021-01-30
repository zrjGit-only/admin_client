import {GET_ROLE_INFO} from '../../actions-type/role'
import {getRoleInfo} from '../../../api/http'
import {message} from 'antd';
import dayjs from 'dayjs'

export const get_role_info = function (payload) {
    return {
        type: GET_ROLE_INFO,
        payload
    }
}


export default {
    getRoleInfo() {
        //因为要传参所以返回需要的函数,外部函数用来接收参数
        return async (dispatch) => {
            const productInfo = await getRoleInfo()
            if(productInfo.status!==0){
                message.error('网络抖动')
                return
            }
            productInfo.data = productInfo.data.map(item=>({
                ...item,
                create_time:dayjs(item.create_time).format("YYYY-MM-DD, HH:mm:ss"),
                auth_time:item.auth_time?dayjs(item.auth_time).format("YYYY-MM-DD, HH:mm:ss"):null,
                key:item._id
            }))
            dispatch(get_role_info(productInfo.data))
        }
    }
}
