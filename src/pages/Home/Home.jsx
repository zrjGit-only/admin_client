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
        city: "A",
        temperature: 7
    },
    {
        month: "Jan",
        city: "B",
        temperature: 3.9
    },
    {
        month: "Feb",
        city: "A",
        temperature: 6.9
    },
    {
        month: "Feb",
        city: "B",
        temperature: 4.2
    },
    {
        month: "Mar",
        city: "A",
        temperature: 9.5
    },
    {
        month: "Mar",
        city: "B",
        temperature: 5.7
    },
    {
        month: "Apr",
        city: "A",
        temperature: 14.5
    },
    {
        month: "Apr",
        city: "B",
        temperature: 8.5
    },
    {
        month: "May",
        city: "A",
        temperature: 18.4
    },
    {
        month: "May",
        city: "B",
        temperature: 11.9
    },
    {
        month: "Jun",
        city: "A",
        temperature: 21.5
    },
    {
        month: "Jun",
        city: "B",
        temperature: 15.2
    },
    {
        month: "Jul",
        city: "A",
        temperature: 25.2
    },
    {
        month: "Jul",
        city: "B",
        temperature: 17
    },
    {
        month: "Aug",
        city: "A",
        temperature: 26.5
    },
    {
        month: "Aug",
        city: "B",
        temperature: 16.6
    },
    {
        month: "Sep",
        city: "A",
        temperature: 23.3
    },
    {
        month: "Sep",
        city: "B",
        temperature: 14.2
    },
    {
        month: "Oct",
        city: "A",
        temperature: 18.3
    },
    {
        month: "Oct",
        city: "B",
        temperature: 10.3
    },
    {
        month: "Nov",
        city: "A",
        temperature: 13.9
    },
    {
        month: "Nov",
        city: "B",
        temperature: 6.6
    },
    {
        month: "Dec",
        city: "A",
        temperature: 9.6
    },
    {
        month: "Dec",
        city: "B",
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
