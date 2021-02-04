import {combineReducers} from 'redux'
import category from './category'
import user from './user'
import product from './product'
import charts from './charts'
import role from './role'
import home from './home'

export default combineReducers({
    user,
    category,
    product,
    charts,
    role,
    home
})
