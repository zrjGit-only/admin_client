import React from "react"
import {
    Chart,
    Interval,
    Tooltip,
    Axis,
    Coordinate
} from 'bizcharts';

class Access extends React.Component {

    render() {
        return (
            <div style={{width: '100%', marginLeft: -30}}>
                <Chart height={400} data={this.props.bizBarSalesInfo} autoFit>
                    <Coordinate type="polar" innerRadius={0.2}/>
                    <Axis visible={true}/>
                    <Tooltip showTitle={true}/>
                    <Interval
                        position="month*sales"
                        adjust= {[
                            {
                                type: 'stack',
                                // 对于 'stack' 类型，可以额外进行如下属性的配置:
                                reverseOrder: false, // 用于控制是否对数据进行反序操作
                            }
                        ]}
                        color="month"
                        element-highlight
                        style={{
                            lineWidth: 1,//描边宽度
                            stroke: '#fff',//描边
                        }}
                        label={['month', {
                            offset: -15,
                        }]}
                    />
                </Chart></div>)
    }
}


export default Access