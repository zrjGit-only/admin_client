import React,{Suspense,lazy} from 'react';
import {Route,Switch,Redirect} from "react-router-dom"
import './Admin.less'
import { Layout} from 'antd';
import SSider from '../../components/SSider/SSider'
import HHeader from '../../components/HHeader/HHeader'

const { Content, Footer} = Layout;


const Home = lazy(() => import(/*webpackChunkName:"Home"*/"../Home/Home"));
const Category = lazy(() => import(/*webpackChunkName:"Category"*/"../Products/Category/Category"));
const Product = lazy(() => import(/*webpackChunkName:"Product"*/"../Products/Product/Product"));
const User = lazy(() => import(/*webpackChunkName:"User"*/"../User/User"));
const Role = lazy(() => import(/*webpackChunkName:"Role"*/"../Role/Role"));
const Bar = lazy(() => import(/*webpackChunkName:"Bar"*/"../Charts/Bar/Bar"));
const Line = lazy(() => import(/*webpackChunkName:"Line"*/"../Charts/Line/Line"));
const Pie = lazy(() => import(/*webpackChunkName:"Pie"*/"../Charts/Pie/Pie"));
const NotFound = lazy(() => import(/*webpackChunkName:"NotFound"*/"../NotFound/NotFound"));

export default function Admin() {
        return (
            <Layout style={{height:'100%'}}>
                <SSider />
                <Layout>
                    <HHeader/>
                    <Content style={{ margin: '24px 16px 0' ,background:'#fff'}}>
                        <Suspense fallback={<h1>加载中……</h1>}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/user' component={User}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Suspense>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )

}


