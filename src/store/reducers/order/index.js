import order from '../../state/order'
import {GET_ORDER_LIST} from '../../actions-type/order'

export default function (prevState = order, action) {
    prevState = JSON.parse(JSON.stringify(prevState));
    switch (action.type) {
        case GET_ORDER_LIST:
            prevState.orderList = action.payload;
            break;
    }
    return prevState
}
