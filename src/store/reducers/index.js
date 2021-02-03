import {combineReducers} from 'redux'
import category from './category'
import user from './user'
import product from './product'
import charts from './charts'

export default combineReducers({
    user,
    category,
    product,
    charts
})
