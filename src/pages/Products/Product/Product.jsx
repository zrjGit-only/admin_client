import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './home'

export default function Product() {
    return (
        <Switch>
            <Route path='/product' component={ProductHome} exact/> {/*路径完全匹配*/}
            <Redirect to='/product'/>
        </Switch>

    )
}