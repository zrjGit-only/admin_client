import React from 'react'
import {Button, Card, Form, Input, Modal, Table, Space } from "antd";
const {Column} = Table;
export default function  User() {
    const dataSource = [
        {
            key: '1',
            username: '胡彦斌',
            email: '1@qq.com',
            phone:'111',
            create_time: '2021-01-30 10:30:25',
            role:'经理'
        },
        {
            key: '2',
            username: '胡彦祖',
            email: '2@qq.com',
            phone:'222',
            create_time: '2021-01-30 11:52:05',
            role:'测试'
        },
    ];
    const title = <Button type="primary">创建用户</Button>
    return (
        <Card title={title} style={{width: '100%'}}>
            <Table  dataSource={dataSource}>
                <Column title="用户名" dataIndex="username" key="username"/>
                <Column title="邮箱" dataIndex="email" key="email"/>
                <Column title="电话" dataIndex="phone" key="phone"/>
                <Column title="注册时间" dataIndex="create_time" key="create_time"/>
                <Column title="所属角色" dataIndex="role" key="role"/>
                <Column
                    title="操作"
                    render={(text, record) => (
                        <Space size="middle">
                            <a>修改</a>
                            <a>删除</a>
                        </Space>
                    )}
                />
            </Table>
        </Card>

    )
}