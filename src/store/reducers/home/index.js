import bizCharts from '../../state/home'
import {GET_BIZ_CHART_INFO} from '../../actions-type/home'

export default function (prevState = bizCharts, action) {
    prevState = JSON.parse(JSON.stringify(prevState));
    switch (action.type) {
        case GET_BIZ_CHART_INFO:
            prevState.bizChartInfo = action.payload;
            break;
    }
    return prevState
}
