import React,{useEffect} from 'react';
import {connect} from 'react-redux'
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
import homeAction from "../../store/actions/home";

function Home(props) {
    useEffect(()=>{
        props.getBizChartInfoStore()
    },[])
    const cols = {
        //month:字段名
        month: {
            range: [0, 1]
        }
    }
    console.log(props.bizChartInfo);
    return (
        <div className="home">
            <Card title="商品总量" extra={<QuestionCircleOutlined/>} className="card1">
                <h1>1,128,163&nbsp;<span>个</span></h1>
                <span>周同比 15%</span>&nbsp;<ArrowUpOutlined style={{color: 'red'}}/><br/>
                <span>日同比 10%</span>&nbsp;<ArrowDownOutlined style={{color: 'green'}}/>
            </Card>
            {/*scale : 配置图标的比例 autoFit : 图表大小自适应，对外层容器的宽和高都会适应*/}
            <Chart className="chart" data={props.bizChartInfo} scale={cols} autoFit>
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
function mapStateToProps(state) {
    return {
        bizChartInfo: state.home.bizChartInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getBizChartInfoStore(parentId) {
            await dispatch(homeAction.getBizChart())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)