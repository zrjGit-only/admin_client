// export default {
//     userInfo: []
// }
import {SPH_ADMIN_LOGIN} from '../../../utils/localStorageType'
export default {
    //读取登录信息
    userInfo: JSON.parse(localStorage.getItem(SPH_ADMIN_LOGIN)) || {}
}
