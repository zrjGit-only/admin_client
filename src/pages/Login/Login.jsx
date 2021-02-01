import React, {Component} from 'react';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'

import userAction from '../../store/actions/user'
import {SPH_ADMIN_LOGIN} from '../../utils/localStorageType'

import './Login.less'
import {Form, Input, Button, message} from 'antd';
//必须在所有import之后
const Item = Form.Item

class Login extends Component {
    componentWillMount() {
        // 判断是否已登录
        if (localStorage.getItem(SPH_ADMIN_LOGIN)) {
            this.props.history.replace('/');
        }
    }

    async login(values) {
        const {username, password} = values
        const {status, msg} = await this.props.userLoginStore(username, password)
        if (status === 0) {
            message.success('登陆成功');
            this.props.history.replace('/');
        } else {
            message.error(msg);
        }
    }

    render() {
        return (
            <div className='login'>
                <header className='login-header'>
                    <h1>后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h3>用户登陆</h3><br/>
                    <Form className='login-form'
                          onFinish={this.login.bind(this)}
                          initialValues={{'username': 'admin', 'password': 'admin'}}>
                        <Item rules={[
                            //前端验证
                            {required: true, message: '用户名不能为空'},
                            {min: 4, message: '用户名至少4位'},
                            {max: 12, message: '用户名最多12位'},
                            {pattern: /^[A-z0-9_]+$/, message: '用户名必须是英文、数字或者下划线组成'},
                            {whitespace: true}]} name='username'>
                            <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder='用户名' size='middle' name='username'/>
                        </Item>
                        <Item rules={[
                            {required: true, message: '密码不能为空'},
                            {min: 4, message: '用户名至少4位'},
                            {max: 12, message: '用户名最多12位'},
                            {whitespace: true}]} name='password'>
                            <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   type='password' placeholder='密码' size='middle'/>
                        </Item><br/>
                        <Item>
                            <Button type='primary' htmlType='submit' className='login-form-button'
                                    size='large'> 登录 </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async userLoginStore(username, password) {
            return await dispatch(userAction.userLogin(username, password))
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)
