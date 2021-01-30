import React, {useEffect,useState} from 'react'
import {connect} from 'react-redux'
import userAction from '../../store/actions/user'
import {delUserInfo} from '../../api/http'
import {Button, Card, Popconfirm, Input, Modal, Table, Space,message} from "antd";

const {Column} = Table;

function User(props) {
    const [isRefresh,setIsRefresh] = useState(false)
    useEffect(() => {
        const getUserInfo = async () => {
            await props.getUserInfoStore()
        }
        getUserInfo()
    }, [isRefresh])

    const confirm=async (text)=> {
        // console.log(text);
        await delUserInfo(text._id)
        message.success('删除成功');
        setIsRefresh(!isRefresh)
    }
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
                            <Popconfirm
                                title="确定删除此用户吗？"
                                onConfirm={()=>confirm(text)}
                                okText="Yes"
                                cancelText="No">
                                <a href="#">删除</a>
                            </Popconfirm>
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