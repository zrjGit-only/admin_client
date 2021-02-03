import charts from '../../state/charts'
import {GET_CHART_INFO} from '../../actions-type/charts'

export default function (prevState = charts, action) {
    prevState = JSON.parse(JSON.stringify(prevState));
    switch (action.type) {
        case GET_CHART_INFO:
            prevState.chartsInfo = action.payload;
            break;
    }
    return prevState
}
