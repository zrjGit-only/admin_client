import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import userAction from '../../store/actions/user'
import {Button, Card, Form, Input, Modal, Table, Space} from "antd";

const {Column} = Table;

function User(props) {
    useEffect(() => {
        const getUserInfo = async () => {
            await props.getUserInfoStore()
        }
        getUserInfo()
    }, [])
    console.log(props);
    const title = <Button type="primary">创建用户</Button>
    return (
        <Card title={title} style={{width: '100%'}}>
            <Table dataSource={props.userInfo}>
                <Column title="用户名" dataIndex="username" key="username"/>
                <Column title="邮箱" dataIndex="email" key="email"/>
                <Column title="电话" dataIndex="phone" key="phone"/>
                <Column title="注册时间" dataIndex="create_time" key="create_time"/>
                <Column title="所属角色" dataIndex="role" key="role"/>
                <Column
                    title="操作"
                    key="caozuo"
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

function mapStateToProps(state) {
    console.log(state);
    return {
        userInfo: state.user.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getUserInfoStore(parentId) {
            await dispatch(userAction.getUserInfo(parentId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);