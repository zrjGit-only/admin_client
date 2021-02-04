import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {Card, Statistic, DatePicker,} from 'antd';
import {
    QuestionCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import './Home.less'
import homeAction from "../../store/actions/home";
import chartsAction from "../../store/actions/charts";
import Line from "./Line";
import dayjs from "dayjs";
import Sales from "./Sales";
import Access from "./Access";

const {RangePicker} = DatePicker

function Home(props) {
    const [store, setStore] = useState(0)
    const [noTitleKey, setNoTitleKey] = useState('Access')
    useEffect(() => {
        const getCharts = async () => {
            await props.getChartsStore()
            await props.getBizChartPieAccessStore()
        }
        getCharts().then(() => {
            console.log(props.chart);
            const store = props.chart.reduce((pre, item) => {
                return pre += item.stores
            }, 0)
            setStore(store)
        })
    }, [])
    const dateFormat = 'YYYY/MM/DD';
    const tabListNoTitle = [
        {
            key: 'Access',
            tab: '访问量',
        },
        {
            key: 'Sales',
            tab: '销售量',
        },
    ];
    const contentListNoTitle = {
        Access: <div><Sales/></div>,
        Sales: <div><Access bizBarSalesInfo={props.bizBarSalesInfo}/></div>,
    };
    const onTabChange = (key, type) => {
        console.log(key, type);
        setNoTitleKey(key)
    };
    return (
        <>
            <div className="home">
                {/*商品总量*/}
                <Card title="商品总量" extra={<QuestionCircleOutlined/>} className="card1">
                    <Statistic suffix="个" value={store}/>
                    <Statistic
                        prefix="周同比"
                        value={15}
                        valueStyle={{fontSize: 15}}
                        suffix={<div>%<ArrowUpOutlined style={{color: 'red'}}/></div>}
                    />
                    <Statistic
                        prefix="日同比"
                        value={10}
                        valueStyle={{fontSize: 15}}
                        suffix={<div>%<ArrowDownOutlined style={{color: 'green'}}/></div>}
                    />
                </Card>
                {/*折线图*/}
                <Line/>
                {/*访问量,销售量*/}
            </div>
            <Card
                className="home-content"
                style={{width: '100%'}}
                tabList={tabListNoTitle}
                activeTabKey={noTitleKey}
                extra={<RangePicker
                    defaultValue={[dayjs('2019/01/01', dateFormat), dayjs('2019/06/01', dateFormat)]}
                    format={dateFormat}/>}
                onTabChange={key => {
                    onTabChange(key, 'noTitleKey');
                }}
            >
                {contentListNoTitle[noTitleKey]}
            </Card>
        </>

    )

}

function mapStateToProps(state) {
    return {
        bizBarSalesInfo: state.home.bizBarSalesInfo,
        chart: state.charts.chartsInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getChartsStore() {
            await dispatch(chartsAction.getChart())
        },
        async getBizChartPieAccessStore() {
            await dispatch(homeAction.getBizChartPieAccess())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)