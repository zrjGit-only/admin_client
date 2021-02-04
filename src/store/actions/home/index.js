import {GET_BIZ_CHART_INFO} from '../../actions-type/home'
import {getBizChart} from '../../../api/httpMock'

export const get_biz_chart = function (payload) {
    return {
        type: GET_BIZ_CHART_INFO,
        payload
    }
}
export default {
    //获取一级或二级分类
    getBizChart() {
        return async (dispatch) => {
            const chart = await getBizChart()
            dispatch(get_biz_chart(chart))
        }
    },

}
