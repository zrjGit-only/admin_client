import React, {useState} from 'react'
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

export default function Pie() {
    const getOption = () => {
        return {
            tooltip: {//提示框组件
                trigger: 'item'//数据项图形触发
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '80%',//大小
                    data: [
                        {
                            value: 1048, name: '搜索引擎',
                            itemStyle: {//饼的样式
                                color: "#5470C6"
                            }
                        },
                        {
                            value: 735, name: '直接访问',
                            itemStyle: {
                                color: "#91CC75"
                            }
                        },
                        {
                            value: 580, name: '邮件营销',
                            itemStyle: {
                                color: "#FAC858"
                            }
                        },
                        {
                            value: 484, name: '联盟广告',
                            itemStyle: {
                                color: "#EE6666"
                            }
                        },
                        {
                            value: 300, name: '视频广告',
                            itemStyle: {
                                color: "#73C0DE"
                            }
                        }
                    ],
                    emphasis: {//高亮状态的扇区和标签样式
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        }
                    }
                }
            ]
        }
    }

    return (<div>
        <Card title='访问量'>
            <ReactEcharts option={getOption()} style={{height: 300}}/> </Card>

    </div>)
}