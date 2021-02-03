import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import roleAction from '../../../store/actions/role'
import {Input, Form, Select, Modal, message} from "antd";
// import {addOrUpDataUserInfo} from '../../../api/http'
import {postUserInfo,patchUserInfo} from '../../../api/httpMock'

const {Option} = Select;

function AddOrUpDataUser(props) {

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
    }, [props.user])

    //确认增加用户
    const handleOk = async (e) => {
        console.log('1',username,'2', password,'3', phone, '4',email,'5',roleId);
        if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4-12}$/.test(username)|| /^\d{4-12}$/.test(password)|| /^1[3456789]d{9}$/.test(phone) || /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))){
            message.warn('请输入正确内容')
            return
        }
        if (!(username && password && phone && email && roleId)) {
            message.warn('请不要输入空内容')
            return
        }

        let userInfo = {username, password, phone, email, role_id: roleId}
        userInfo.create_time = Date.now()
        if(props.user.id){
            userInfo = JSON.parse(JSON.stringify(userInfo))
            await patchUserInfo(props.user.id,userInfo)
        }else{
            userInfo.id = props.user.id
            await postUserInfo(userInfo)
        }
        message.success(props.user._id ? '修改成功' : '添加成功')
        props.refresh()
        /*userInfo._id = props.user._id ? props.user._id : null
        const {status} = await addOrUpDataUserInfo(userInfo)
        if (status !== 0) {
            message.error('网络抖动')
        } else {
            message.success(props.user._id ? '修改成功' : '添加成功')
            props.refresh()
        }*/


    }
    //确认取消添加
    const handleCancel = () => {
        props.closeModal()
    }
    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    console.log(props.roleInfo);
    return (
        <Modal title={props.isAddOrUpData === 1 ? '添加用户' : '修改用户'}
               visible={props.isAddOrUpData !== 0}
               onOk={handleOk}
               onCancel={handleCancel}>
            <Form {...layout}>
                <Form.Item
                    label="用户名"
                    name='username'
                    rules={[
                        {required: true, message: '用户名不能为空'},
                        {min: 4, message: '用户名至少4位'},
                        {max: 12, message: '用户名最多12位'},
                        {pattern: /^[A-z0-9_]+$/, message: '用户名必须是英文、数字或者下划线组成'},
                        {whitespace: true}]} >
                        <Input name='username' placeholder="请输入用户名" onChange={(e) => setUsername(e.target.value)} value={username}/>
                        <br name="br"/>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入密码'},
                        {min: 4, message: '用户名至少4位'},
                        {max: 12, message: '用户名最多12位'},]}>
                    <Input.Password placeholder="请输入密码" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <br name="br"/>
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[{required: true, message: '请输入手机号'},
                        {pattern: /^1[3456789]d{9}$/, message: '请输入正确手机号'},]}>
                    <Input name="password" placeholder="请输入密码" onChange={(e) => setPhone(e.target.value)} value={phone}/>
                    <br name="br"/>
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{required: true, message: '请输入邮箱'},
                        {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确手机号'}]}>
                    <Input name="email" placeholder="请输入邮箱" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <br name="br"/>
                </Form.Item>
                <Form.Item name="role_id" label="角色" rules={[{required: true}]}>
                    <Select
                        placeholder="请选择角色"
                        value={roleId}
                        onSelect={(v) => {
                            setRoleId(v)
                        }}>
                        {
                            props.roleInfo.map(item => (
                                // <Option value={item._id} key={item._id}>{item.name}</Option>
                                 <Option value={item.id} key={item.id}>{item.name}</Option>
                            ))
                        }
                    </Select>
                    <br name="br"/>
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
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpDataUser);