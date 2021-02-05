import {GET_ORDER_LIST} from '../../actions-type/order'
import {getOrderList} from '../../../api/httpMock'

export const get_order_list = function (payload) {
    return {
        type: GET_ORDER_LIST,
        payload
    }
}
export default {
    //获取一级或二级分类
    getOrderList() {
        return async (dispatch) => {
            const order = await getOrderList()
            dispatch(get_order_list(order))
        }
    },

}
