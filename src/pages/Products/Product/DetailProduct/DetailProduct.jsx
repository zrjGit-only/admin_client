import React, {Component} from 'react';
import {Card, List} from "antd";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

import {ArrowLeftOutlined} from "@ant-design/icons";
import './DetailProduct.less'
import {BASE_IMG_URL} from '../../../../utils/constants'
import productAction from "../../../../store/actions/product";
import {getCategoryInfo} from '../../../../api/http'

class DetailProduct extends Component {
    state = {
        productInfo: {},
        c1Name:'',// 一级分类名称
        c2Name:'',// 二级分类名称
    }

     componentDidMount() {
        //获取路由传过来的数据
        this.setState({
            productInfo: this.props.location.state
        },async ()=>{
            const {pCategoryId,categoryId }=this.state.productInfo

            if(pCategoryId === '0'){ //说明当前就是一级分类
                const {data} = await getCategoryInfo(categoryId);
                this.setState({c1Name: data.name});
            }else{
                //同时发送两个请求 减少请求发送的次数 都成功后才成功 否则都失败
               const res =  await Promise.all([getCategoryInfo(pCategoryId),getCategoryInfo(categoryId)])
                this.setState({
                    c1Name: res[0].data.name,
                    c2Name: res[1].data.name
                })
            }
        })
    }

    render() {
        let {desc, imgs, name, price, detail} = this.state.productInfo
        const {c1Name,c2Name} = this.state
        // console.log(this.state.productInfo);
        const title = (<NavLink to="/product">
            <ArrowLeftOutlined style={{color: "#1DA57A", fontSize: "20px"}}/>
            &nbsp;&nbsp;商品详情</NavLink>)
        return (
            <Card title={title} extra={<a href="#">More</a>} style={{width: '100%'}}>
                <List className="list">
                    <List.Item className="listItem">
                        <span className="title"> 商品名称 : </span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item className="listItem">
                        <span className="title"> 商品描述 : </span>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item className="listItem">
                        <span className="title"> 商品价格 : </span>
                        <span>{price}元</span>
                    </List.Item>
                    <List.Item className="listItem">
                        <span className="title"> 所属分类 : </span>
                        <span>{c2Name? `${c1Name} --> ${c2Name}` : c1Name}</span>
                    </List.Item>
                    <List.Item className="listItem">
                        <span className="title"> 商品图片 : </span>
                        <span>{
                            imgs && imgs.map(img => (
                                <img src={BASE_IMG_URL + img} alt="" key={img} className="img"/>
                            ))
                        }</span>
                    </List.Item>
                    <List.Item style={{display: "flex"}} className="listItem">
                        <span className="title"> 商品描述 : </span>
                        <span dangerouslySetInnerHTML={{__html: `${detail}`}}>
                        </span>
                    </List.Item>

                </List>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        productList: state.product.productInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        async getSearchProductStore(pageNum, pageSize, content, search) {
            await dispatch(productAction.getSearchProduct(pageNum, pageSize, content, search))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
