import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {Card} from 'antd';
import {
    ReloadOutlined
} from '@ant-design/icons';
import {Chart, Interval, Tooltip} from 'bizcharts';
import homeAction from "../../store/actions/home";

function Sales(props) {
    useEffect(() => {
        const getBizChartBar = async () => {
           await props.getBizChartBarStore()
        }
        getBizChartBar()
    }, [])
    console.log(props.bizBarInfo);
    return (
        <Card title="访问趋势" extra={<ReloadOutlined/>} style={{width: '50%', marginRight: 30}}>
            <Chart height={400} autoFit data={props.bizBarInfo} interactions={['active-region']} padding={[30, 30, 30, 50]}>
                <Interval position="month*sales"/>
                <Tooltip shared/>
            </Chart>
        </Card>
    )
}

function mapStateToProps(state) {
    return {
        bizBarInfo: state.home.bizBarInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getBizChartBarStore() {
            await dispatch(homeAction.getBizChartBar())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);