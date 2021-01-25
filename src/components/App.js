import React, {Component, lazy, Suspense} from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'

const Admin = lazy(() => import(/*webpackChunkName:"Admin"*/"../pages/Admin/Admin"));
const Login = lazy(() => import(/*webpackChunkName:"Login"*/"../pages/Login/Login"));

class App extends Component {
    render() {
        return (
            <>
                <NavLink to='/home'/>
                <NavLink to='/login'/>

                <Suspense fallback={<h1>加载中……</h1>}>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/' component={Admin}/>
                    </Switch>
                </Suspense>
            </>
        )
    }
}

export default App;
