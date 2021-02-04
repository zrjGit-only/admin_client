import {GET_CHART_INFO} from '../../actions-type/charts'
import {getChart} from '../../../api/httpMock'

export const get_chart = function (payload) {
    return {
        type: GET_CHART_INFO,
        payload
    }
}
export default {
    //获取一级或二级分类
    getChart() {
        return async (dispatch) => {
            const chart = await getChart()
            dispatch(get_chart(chart))
        }
    },

}
