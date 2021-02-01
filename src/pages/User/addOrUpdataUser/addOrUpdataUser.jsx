import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import roleAction from '../../../store/actions/role'
import {Input, Form, Select, Modal, message} from "antd";

const {Option} = Select;

function AddOrUpDataUser(props) {
    console.log(props.user);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [roleId, setRoleId] = useState('')
    //获取角色
    useEffect(() => {
        const getRoleInfo = async () => {
            await props.getRoleInfoStore()
        }
        getRoleInfo()
    }, [])
    //获取回显的内容
    useEffect(() => {
        setUsername(props.user.username)
        setPassword(props.user.password)
        setPhone(props.user.phone)
        setEmail(props.user.email)
        setRoleId(props.user.roleId)
        console.log(2);
    }, [props.user])
    const onGenderChange = () => {
    }
    //确认增加用户
    const handleOk = (e) => {
        if (!(username && password && phone && email && roleId)){
            message.warn('请不要输入空内容')
        }
            }
    //确认取消添加
    const handleCancel = () => {
        props.handleCancel()
    }
    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    return (
        <Modal title={props.isAddOrUpData === 1 ? '添加用户' : '修改用户'}
               visible={props.isAddOrUpData !== 0}
               onOk={handleOk}
               onCancel={handleCancel}>
            <Form {...layout}>
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{required: true, message: '请输入用户名'}]}>
                    <Input placeholder="请输入用户名" onChange={(v) => setUsername(v)} value={username}/><br/>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入密码'}]}>
                    <Input.Password placeholder="请输入密码" onChange={(v) => setPassword(v)} value={password}/><br/>
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[{required: true, message: '请输入手机号'}]}>
                    <Input placeholder="请输入密码" onChange={(v) => setPhone(v)} value={phone}/><br/>
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{required: true, message: '请输入邮箱'}]}>
                    <Input placeholder="请输入邮箱" onChange={(v) => setEmail(v)} value={email}/><br/>
                </Form.Item>
                <Form.Item name="role_id" label="角色" rules={[{required: true}]}>
                    <Select
                        placeholder="请选择角色"
                        onChange={onGenderChange}
                        allowClear
                        value={roleId}
                        onSelect={(v) => {
                            setRoleId(v)
                        }}>
                        {
                            props.roleInfo.map(item => (
                                <Option value={item._id} key={item._id}>{item.name}</Option>
                            ))
                        }
                    </Select><br/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

function mapStateToProps(state) {
    return {
        userInfo: state.user.userInfo,
        roleInfo: state.role.roleInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getRoleInfoStore() {
            await dispatch(roleAction.getRoleInfo())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpDataUser);