import React from 'react';
import {Card} from 'antd';
import {
    QuestionCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import './Home.less'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts"

const data = [
    {
        month: "Jan",
        city: "北京",
        temperature: 7
    },
    {
        month: "Jan",
        city: "上海",
        temperature: 3.9
    },
    {
        month: "Feb",
        city: "北京",
        temperature: 6.9
    },
    {
        month: "Feb",
        city: "上海",
        temperature: 4.2
    },
    {
        month: "Mar",
        city: "北京",
        temperature: 9.5
    },
    {
        month: "Mar",
        city: "上海",
        temperature: 5.7
    },
    {
        month: "Apr",
        city: "北京",
        temperature: 14.5
    },
    {
        month: "Apr",
        city: "上海",
        temperature: 8.5
    },
    {
        month: "May",
        city: "北京",
        temperature: 18.4
    },
    {
        month: "May",
        city: "上海",
        temperature: 11.9
    },
    {
        month: "Jun",
        city: "北京",
        temperature: 21.5
    },
    {
        month: "Jun",
        city: "上海",
        temperature: 15.2
    },
    {
        month: "Jul",
        city: "北京",
        temperature: 25.2
    },
    {
        month: "Jul",
        city: "上海",
        temperature: 17
    },
    {
        month: "Aug",
        city: "北京",
        temperature: 26.5
    },
    {
        month: "Aug",
        city: "上海",
        temperature: 16.6
    },
    {
        month: "Sep",
        city: "北京",
        temperature: 23.3
    },
    {
        month: "Sep",
        city: "上海",
        temperature: 14.2
    },
    {
        month: "Oct",
        city: "北京",
        temperature: 18.3
    },
    {
        month: "Oct",
        city: "上海",
        temperature: 10.3
    },
    {
        month: "Nov",
        city: "北京",
        temperature: 13.9
    },
    {
        month: "Nov",
        city: "上海",
        temperature: 6.6
    },
    {
        month: "Dec",
        city: "北京",
        temperature: 9.6
    },
    {
        month: "Dec",
        city: "上海",
        temperature: 4.8
    }
];
export default function Home() {
    const cols = {
        //month:字段名
        month: {
            range: [0, 1]
        }
    }
    return (
        <div className="home">
            <Card title="商品总量" extra={<QuestionCircleOutlined/>} className="card1">
                <h1>1,128,163&nbsp;<span>个</span></h1>
                <span>周同比 15%</span>&nbsp;<ArrowUpOutlined style={{color: 'red'}}/><br/>
                <span>日同比 10%</span>&nbsp;<ArrowDownOutlined style={{color: 'green'}}/>
            </Card>
            {/*scale : 配置图标的比例 autoFit : 图表大小自适应，对外层容器的宽和高都会适应*/}
            <Chart className="chart" data={data} scale={cols} autoFit>
                {/*分类图例适用，图例项的 marker 图标的配置*/}
                <Legend marker={{
                    symbol: (x, y, radius) => {
                        const r = radius / 2;
                        return [
                            ['M', x - radius, y],
                            ['A', r, r, 0, 0, 1, x, y],
                            ['A', r, r, 0, 0, 0, x + radius, y],
                        ]
                    }
                }}/>
                <Axis name="month"/>
                <Axis
                    name="temperature"
                    label={{
                        formatter: val => `${val}万个`
                    }}
                />
                {/*crosshairs : 类型`x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助项*/}
                <Tooltip
                    g2-tooltip={{
                        boxShadow: 'none',
                        color: '#fff',
                        backgroundColor: '#222'
                    }}
                    crosshairs={{
                        type: "xy"
                    }}
                    style={{
                        color: 'red'
                    }}
                />
                {/*几何标记对象，决定创建图表的类型*/}
                {/*shape : 将数据值映射到图形的形状上的方法*/}
                {/*position : 确定 x 轴和 y 轴的数据字段*/}
                <Geom
                    type="line"
                    position="month*temperature"
                    size={2}
                    color={"city"}
                    shape={"smooth"}
                />
                <Geom
                    type="point"
                    position="month*temperature"
                    size={4}
                    shape={"circle"}
                    color={"city"}
                    style={{
                        stroke: "#fff",
                        lineWidth: 1
                    }}
                />
            </Chart>
        </div>
    )
}
