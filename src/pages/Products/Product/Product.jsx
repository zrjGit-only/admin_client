
import React, {Component} from 'react';
import {Route, Switch,Redirect} from "react-router-dom";
import AddupdateProduct from "./AddupdateProduct/AddupdateProduct";
import HomeProduct from "./HomeProduct/HomeProduct";
import DetailProduct from "./DetailProduct/DetailProduct";

export default function Product() {
    return (
        <Switch>
            <Route path='/product' exact component={HomeProduct}/>
            <Route path='/product/addupdate' component={AddupdateProduct}/>
            <Route path='/product/detail' component={DetailProduct}/>
            <Redirect to='/product'/>
        </Switch>

    )
}