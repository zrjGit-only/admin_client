import React,{useState} from 'react'
import {Card, Button} from 'antd';
import ReactEcharts from 'echarts-for-react'
import './Bar.less'

export default function Bar() {

    const update = () => {

    }
    const getOption = () => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
    }
    return (
        <>
            <Card  style={{width: "100%"}}>
                <Button type='primary' onClick={update}>更新</Button>
            </Card>
            <Card title='柱状图一'>
                <ReactEcharts option={getOption()} />
            </Card>
        </>
    )
}