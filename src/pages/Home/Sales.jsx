import React, {useEffect} from 'react'
import {Card, Timeline} from 'antd';
import {
    ReloadOutlined
} from '@ant-design/icons';
import {Chart, Interval, Tooltip} from 'bizcharts';
import homeAction from "../../store/actions/home";
import {connect} from "react-redux";

function Sales(props) {
    useEffect(() => {
        const getBizChartBarSales = async () => {
            await props.getBizChartBarSalesStore()
        }
        getBizChartBarSales()
    }, [])
    return (
        <>
            <Card title="访问趋势" extra={<ReloadOutlined onClick={props.getBizChartBarSalesStore}/>}
                  style={{width: '48%', float: 'left'}}>
                <Chart height={400} autoFit data={props.bizPieAccessInfo} interactions={['active-region']}
                       padding={[30, 30, 30, 50]}>
                    <Interval position="month*sales"/>
                    <Tooltip shared/>
                </Chart>
            </Card>
            <Card title="任务" extra={<ReloadOutlined/>} style={{width: '48%', float: 'right'}}>
                <Timeline>
                    <Timeline.Item color="green">图表管理 用户管理 角色管理模拟数据(json-server) 2021.02.03</Timeline.Item>
                    <Timeline.Item color="green">
                        <p>图片上传 2021.02.02</p>
                        <p>富文本编辑器</p>
                        <p>echarts图标</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <p>完成品类管理 2021.02.01</p>
                        <p>商品管理异步请求获取</p>
                        <p>配置404</p>
                        <p>完成保存登录信息模块</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <p>完成角色管理 2021.01.30</p>
                        <p>品类管理异步请求获取</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <p>搭建仓库 2021.01.29</p>
                        <p>天气接口</p>
                        <p>设置角色权限</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">完成项目整体组件框架及路由设计 2021.01.25</Timeline.Item>
                </Timeline>
            </Card>
        </>
    )
}

function mapStateToProps(state) {
    return {
        bizPieAccessInfo: state.home.bizPieAccessInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {

        async getBizChartBarSalesStore() {
            await dispatch(homeAction.getBizChartBarSales())
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sales);