import React from 'react'
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

export default function Pie() {
    const getOption = () => {
        return {
            tooltip: {//提示框组件
                trigger: 'item'//数据项图形触发
            },
            legend: {
                orient: 'vertical',//垂直
                left: 'left',//图例组件离容器左侧的距离
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
    const getOption2 = () => {
        return {
            backgroundColor: '#2c343c',//背景颜色
            // 提示框组件        //提示框字符串模板
            tooltip: {trigger: 'item', formatter: "{a} <br/>{b} : {c} ({d}%)"},
            //将数据映射到视觉元素        //视觉效果作用域  //在选中范围中的视觉元素 //颜色的明暗度
            visualMap: {show: false, min: 80, max: 600, inRange: {colorLightness: [0, 1], color: "red"}},
            series: [{
                name: '访问来源',
                type: 'pie',//类型
                radius: '90%',  //大小
                center: ['50%', '50%'],//位置
                data: [ //数据
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 274, name: '联盟广告'},
                    {value: 235, name: '视频广告'},
                    {value: 400, name: '搜索引擎'}].sort(function (a, b) {//按从小到大顺序排列
                    return a.value - b.value;
                }),
                roseType: 'radius',//扇区圆心角展现数据的百分比，半径展现数据的大小
                label: {
                    normal: {
                        color: 'rgba(255, 255, 255, 0.4)'  //文字颜色
                    }
                },
                labelLine: {//标签的视觉引导线配置
                    normal: {
                        lineStyle: {color: 'rgba(255, 255, 255, 0.3)'},
                        smooth: 0.2,//是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示，也可以设置为 0 到 1 的值，表示平滑程度。
                        length: 10,//视觉引导线第一段的长度
                        length2: 20//视觉引导线第一段的长度
                    }
                },
                itemStyle: {//图形样式
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,//图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                        shadowColor: 'rgba(0, 0, 0, 0.5)'//阴影颜色
                    }
                },
                animationType: 'scale',//初始动画效果 缩放效果
                animationEasing: 'elasticOut',//初始动画的缓动效果
                animationDelay: function (idx) {//初始动画的延迟
                    return Math.random() * 200;
                }
            }]
        }
    }
    return (<div>
        <Card title='访问量'>
            <ReactEcharts option={getOption()} style={{height: 300}}/> </Card>
        <Card title='访问量加强版'>
            <ReactEcharts option={getOption2()} style={{height: 300}}/> </Card>
    </div>)
}