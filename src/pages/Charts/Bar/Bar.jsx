import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'antd';
import ReactEcharts from 'echarts-for-react'
import chartsAction from "../../../store/actions/charts";
import {patchChart} from '../../../api/httpMock'

function Bar(props) {
    const [sales, setSales] = useState([])//销售
    const [stores, setStores] = useState([])//库存
    const [name, setName] = useState([])//商品名
    const [isRefresh, setRefresh] = useState(false)
    useEffect(() => {
        const getChar = async () => {
            await props.getChartStore()
        }
        getChar().then(() => {
            setName(props.chart.map(item => item.name))
            setSales(props.chart.map(item => item.sales))
            setStores(props.chart.map(item => item.stores))
        })
    }, [isRefresh])
    //更新库存
    const update = () => {
        sales.forEach((item, index) => {
            const num = Math.floor(Math.random() * 30 + 20)
            console.log(item, num);
            setTimeout(async () => {
                await patchChart(index + 1, {sales: item + num, stores: stores[index] - num})
                setRefresh(!isRefresh)
            }, 500)
        })
    }
    const getOption = (sales, stores, name) => {
        return {
            tooltip: {//提示框组件
                trigger: 'item'//数据项图形触发
            },
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: name
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales,
                itemStyle: {
                    color: '#91CC75'
                }
            }, {
                name: '库存',
                type: 'bar',
                data: stores,
                itemStyle: {
                    color: '#FAC858'
                }
            }]
        }
    }
    return (
        <>
            <Card style={{width: "100%"}}>
                <Button type='primary' onClick={update}>更新</Button>
            </Card>
            <Card title='销量-库存'>
                <ReactEcharts option={getOption(sales, stores, name)}/>
            </Card>
        </>
    )
};

function mapStateToProps(state) {
    return {
        chart: state.charts.chartsInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getChartStore() {
            await dispatch(chartsAction.getChart())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bar)