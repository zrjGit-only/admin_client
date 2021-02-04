import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {Card, Statistic,DatePicker,} from 'antd';
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
const {RangePicker} = DatePicker

function Home(props) {
    const [store, setStore] = useState(0)
    const [noTitleKey, setNoTitleKey] = useState('Sales')
    useEffect(() => {
        const getCharts = async () => {
            await props.getChartsStore()
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
            key: 'Sales',
            tab: '销售量',
        },
        {
            key: 'access',
            tab: '访问量',
        }
    ];
    const contentListNoTitle = {
        Sales: <p>销售量</p>,
        access: <p>访问量</p>,
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
                    format={dateFormat}
                />}
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
        bizChartInfo: state.home.bizChartInfo,
        chart: state.charts.chartsInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getBizChartInfoStore() {
            await dispatch(homeAction.getBizChart())
        },
        async getChartsStore() {
            await dispatch(chartsAction.getChart())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)