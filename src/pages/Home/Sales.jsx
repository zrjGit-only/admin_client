import React from 'react'
import {Card} from 'antd';
import {
    ReloadOutlined
} from '@ant-design/icons';
import {Chart, Interval, Tooltip} from 'bizcharts';

export default function Sales() {
    const data = [
        {
            year: "1951 年",
            sales: 38
        },
        {
            year: "1952 年",
            sales: 52
        },
        {
            year: "1956 年",
            sales: 61
        },
        {
            year: "1957 年",
            sales: 145
        },
        {
            year: "1958 年",
            sales: 48
        },
        {
            year: "1959 年",
            sales: 38
        },
        {
            year: "1960 年",
            sales: 38
        },
        {
            year: "1962 年",
            sales: 38
        }
    ];
    return (
        <Card title="访问趋势" extra={<ReloadOutlined/>} style={{width: '50%', marginRight: 30}}>
            <Chart height={400} autoFit data={data} interactions={['active-region']} padding={[30, 30, 30, 50]}>
                <Interval position="year*sales"/>
                <Tooltip shared/>
            </Chart>
        </Card>
    )
}