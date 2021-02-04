import {GET_BIZ_CHART_LINE_INFO,GET_BIZ_CHART_PIE_ACCESS,GET_BIZ_CHART_BAR_SALES} from '../../actions-type/home'
import {getBizChartLine,getBizChartPieAccess,getBizChartBarSales} from '../../../api/httpMock'

export const get_biz_chart_line = function (payload) {
    return {
        type: GET_BIZ_CHART_LINE_INFO,
        payload
    }
}
export const get_biz_chart_pie_access = function (payload) {
    return {
        type: GET_BIZ_CHART_PIE_ACCESS,
        payload
    }
}
export const get_biz_chart_bar_sales = function (payload) {
    return {
        type: GET_BIZ_CHART_BAR_SALES,
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
    getBizChartPieAccess() {
        return async (dispatch) => {
            const chart = await getBizChartPieAccess()
            dispatch(get_biz_chart_pie_access(chart))
        }
    },
    getBizChartBarSales() {
        return async (dispatch) => {
            const chart = await getBizChartBarSales()
            dispatch(get_biz_chart_bar_sales(chart))
        }
    },

}
