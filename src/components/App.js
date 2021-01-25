import React, {Component, lazy, Suspense} from 'react';
import {NavLink, Switch, BrowserRouter, Route, Redirect,} from "react-router-dom"

const Login = lazy(() => import(/*webpackChunkName:"three"*/"../pages/Login/Login"));
const Admin = lazy(() => import(/*webpackChunkName:"child"*/"../pages/Admin/Admin"));

class App extends Component {
    render() {
        return (
            <>
                <NavLink to='/login'></NavLink>
                <NavLink to='/admin'></NavLink>

                <Switch>
                    <Suspense fallback="<h1>加载中.....</h1>">
                        <Route path='/admin' component={Admin}/>
                        <Route path='/' component={Login}/>
                        <Redirect to="/login"></Redirect>
                    </Suspense>
                </Switch>
            </>
        )
    }
}

export default App;
