import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducers from './reducers'

export default createStore(rootReducers,
    process.env.NODE_ENV === "development"?
        composeWithDevTools(applyMiddleware(thunk)):applyMiddleware(thunk));

