import React, {useState} from 'react'
import {Button, Card} from "antd";
import ReactEcharts from "echarts-for-react";

export default function Line() {
    const [sales, setSales] = useState([500, 200, 360, 100, 100, 200])//销售
    const [stores, setStores] = useState([1000, 2000, 2500, 2000, 1500, 1000])//库存

    //更新库存
    const update = () => {
        setSales(sales.map(item => item + 30))
        setStores(stores.map(item => item - 30))
    }
    const getOption = (sales, stores) => {
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
                type: 'line',
                data: sales,
                itemStyle: {
                    color: '#91CC75'
                }
            }, {
                name: '库存',
                type: 'line',
                data: stores,
                itemStyle: {
                    color: '#FAC858'
                }
            }]
        }
    }
    const getOption2 = () => {
        return {
            legend: {
                data: ['销售量']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {type: 'value'},
            series: [{
                name:'销售量',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
    }

    return (
        <>
            <Card style={{width: "100%"}}>
                <Button type='primary' onClick={update}>更新</Button>
            </Card>
            <Card title='销量及库存'>
                <ReactEcharts option={getOption(sales, stores)}/>
            </Card>
            <Card title='销售情况'>
                <ReactEcharts option={getOption2()}/>
            </Card>
        </>
    )
}