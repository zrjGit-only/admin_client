import React, {useState} from 'react'
import {Card, Button, Table} from 'antd';

export default function Role() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'age',
        },
        {
            title: '授权时间',
            dataIndex: 'address',
        },
        {
            title: '授权人',
            dataIndex: 'address',
        },
    ];
    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    const title = (
        <div>
            <Button type="primary" style={{marginRight: 10}}>创建角色</Button>
            <Button type="primary" disabled>设置角色权限</Button>
        </div>
    )
    const rowSelection = {
        selectedRowKeys,
        onChange(selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            setSelectedRowKeys(selectedRowKeys);
        },
    };
    return (
        <Card title={title} style={{width: '100%'}}>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
        </Card>

    )
}