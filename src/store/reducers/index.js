import {combineReducers} from 'redux'
import role from './role'
import user from './user'
import category from './category'


export default combineReducers({
    role,
    user,
    category
})


