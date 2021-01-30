import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Input, Form, Select} from "antd";

const {Option} = Select;

function AddOrUpDataUser(props) {
    const onGenderChange = () => {
    }
    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    console.log(props.user, 'props.userInfo');
    return (
        <Form {...layout}
              initialValues={{
                  'password': props.user.password,
                  'username': props.user.username,
                  'phone': props.user.phone,
                  'email': props.user.email
              }}>
            <Form.Item
                label="用户名"
                name="username"
                rules={[{required: true, message: '请输入用户名'}]}>
                <Input placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item
                label="密码"
                name="password"
                rules={[{required: true, message: '请输入密码'}]}>
                <Input.Password placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item
                label="手机号"
                name="phone"
                rules={[{required: true, message: '请输入手机号'}]}>
                <Input placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item
                label="邮箱"
                name="email"
                rules={[{required: true, message: '请输入邮箱'}]}>
                <Input placeholder="请输入邮箱"/>
            </Form.Item>
            <Form.Item name="role_id" label="角色" rules={[{required: true}]}>
                <Select
                    placeholder="请选择角色"
                    onChange={onGenderChange}
                    allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
        </Form>
    )
}

function mapStateToProps(state) {
    return {
        userInfo: state.user.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getUserInfoStore(parentId) {
            // await dispatch(userAction.getUserInfo(parentId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpDataUser);