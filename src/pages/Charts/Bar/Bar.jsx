import React, {useState} from 'react'
import {Card, Button} from 'antd';
import ReactEcharts from 'echarts-for-react'
import './Bar.less'

export default function Bar() {
    const [sales, setSales] = useState([500, 200, 360, 100, 100, 200])//销售
    const [stores, setStores] = useState([1000, 2000, 2500, 2000, 1500, 1000])//库存

    //更新库存
    const update = () => {
        setSales(sales.map(item => item + 30))
        setStores(stores.map(item => item - 30))
    }
    const getOption = (sales,stores) => {
        return {
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
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
            <Card title='柱状图一'>
                <ReactEcharts option={getOption(sales,stores)}/>
            </Card>
        </>
    )
}