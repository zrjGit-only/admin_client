import category from '../../state/category'
import {GET_CATEGORY1,GET_CATEGORY2,GET_CATEGORY_ALL} from '../../actions-type/category'
export default function (prevState = category, action) {
    prevState = JSON.parse(JSON.stringify(prevState));
    switch (action.type) {
        case GET_CATEGORY1:
            prevState.category1 = action.payload;
            break;
        case GET_CATEGORY2:
            prevState.category2 = action.payload;
            break;
        case GET_CATEGORY_ALL:
            prevState.category = action.payload;
            break;
    }
    return prevState
}
