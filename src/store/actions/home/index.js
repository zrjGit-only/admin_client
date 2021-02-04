import {GET_BIZ_CHART_LINE_INFO,GET_BIZ_CHART_BAR} from '../../actions-type/home'
import {getBizChartLine,getBizChartBar} from '../../../api/httpMock'

export const get_biz_chart_line = function (payload) {
    return {
        type: GET_BIZ_CHART_LINE_INFO,
        payload
    }
}
export const get_biz_chart_bar = function (payload) {
    return {
        type: GET_BIZ_CHART_BAR,
        payload
    }
}
export default {
    //获取一级或二级分类
    getBizChartLine() {
        return async (dispatch) => {
            const chart = await getBizChartLine()
            dispatch(get_biz_chart_line(chart))
        }
    },
    getBizChartBar() {
        return async (dispatch) => {
            const chart = await getBizChartBar()
            dispatch(get_biz_chart_bar(chart))
        }
    },

}
