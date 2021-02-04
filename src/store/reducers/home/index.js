import bizCharts from '../../state/home'
import {GET_BIZ_CHART_LINE_INFO,GET_BIZ_CHART_BAR} from '../../actions-type/home'

export default function (prevState = bizCharts, action) {
    prevState = JSON.parse(JSON.stringify(prevState));
    switch (action.type) {
        case GET_BIZ_CHART_LINE_INFO:
            prevState.bizLineInfo = action.payload;
            break;
        case GET_BIZ_CHART_BAR:
            prevState.bizBarInfo = action.payload;
            break;
    }
    return prevState
}
