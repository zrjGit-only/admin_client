import user from '../../state/user'
import {GET_USER_INFO} from '../../actions-type/user'
//eslint-disable-next-line
export default function (prevState = user, action) {
    prevState = JSON.parse(JSON.stringify(prevState));
    //eslint-disable-next-line
    switch (action.type) {
        case GET_USER_INFO:
            prevState.user = action.payload;
            break;
    }
    // console.log(prevState,'prevState');
    return prevState
}
