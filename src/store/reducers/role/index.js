import role from '../../state/role'
import {GET_ROLE_INFO} from '../../actions-type/role'
//eslint-disable-next-line
export default function (prevState = role, action) {
    prevState = JSON.parse(JSON.stringify(prevState));
    //eslint-disable-next-line
    switch (action.type) {
        case GET_ROLE_INFO:
            prevState.roleInfo = action.payload;
            break;
    }
    // console.log(prevState,'prevState');
    return prevState
}