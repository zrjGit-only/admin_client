import category from '../../state/product'
import {GET_PRODUCT,GET_SEARCH_PRODUCT} from '../../actions-type/product'

export default function (prevState = category, action) {
    prevState = JSON.parse(JSON.stringify(prevState));
    switch (action.type) {
        case GET_PRODUCT:
            prevState.productInfo = action.payload;
            break;
        case GET_SEARCH_PRODUCT:
            prevState.productInfo = action.payload;
            break;
    }
    return prevState
}
