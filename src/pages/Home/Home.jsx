import React from 'react';
import {connect} from 'react-redux'
import {Card} from 'antd';
import {
    QuestionCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import './Home.less'
import homeAction from "../../store/actions/home";
import Line from "./Line";

function Home() {

    return (
        <div className="home">
            {/*商品总量*/}
            <Card title="商品总量" extra={<QuestionCircleOutlined/>} className="card1">
                <h1>1,128,163&nbsp;<span>个</span></h1>
                <span>周同比 15%</span>&nbsp;<ArrowUpOutlined style={{color: 'red'}}/><br/>
                <span>日同比 10%</span>&nbsp;<ArrowDownOutlined style={{color: 'green'}}/>
            </Card>
            {/*折线图*/}
            <Line/>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        bizChartInfo: state.home.bizChartInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getBizChartInfoStore(parentId) {
            await dispatch(homeAction.getBizChart())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)