import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import userAction from '../../store/actions/user'
import {SPH_ADMIN_LOGIN} from '../../utils/localStorageType'
import './Login.less';
import bg from '../../config/bgConfig'
//必须在所有import之后
const Item = Form.Item

class Login extends Component {
    state = {
        bgUrl: '/images/1.jpg'
    }

    componentWillMount() {
        // 判断是否已登录
        if (localStorage.getItem(SPH_ADMIN_LOGIN)) {
            this.props.history.replace('/');
        }
        let i = 0
        this.timer = setInterval(() => {
            i++
            if (i >= bg.length) {
                i = 0
            }
            this.setState({
                bgUrl: bg[i]
            })

        }, 5000)
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
        const {bgUrl} = this.state
        return (
            <div className="login">
                <header className="login-header">
                    <h1>React后台管理系统</h1>
                </header>
                <div className="bg-slides-item" ref="bg" style={{backgroundImage: `url(${bgUrl})`}}/>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form className="login-form" onFinish={this.login.bind(this)}
                          initialValues={{"username": "admin", "password": "admin"}}>
                        <Item rules={[
                            //前端验证
                            {required: true, message: '用户名不能为空'},
                            {min: 4, message: '用户名至少4位'},
                            {max: 12, message: '用户名最多12位'},
                            {pattern: /^[A-z0-9_]+$/, message: '用户名必须是英文、数字或者下划线组成'},
                            {whitespace: true}]} name='username'>
                            <Input prefix={<UserOutlined/>} placeholder="用户名"/>
                        </Item>

                        <Item rules={[
                            {required: true, message: '密码不能为空'},
                            {min: 4, message: '用户名至少4位'},
                            {max: 12, message: '用户名最多12位'},
                            {whitespace: true}]} name='password'>
                            <Input.Password prefix={<LockOutlined/>} placeholder="密码"/>
                        </Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

    componentWillUnmount() {
        clearInterval(this.timer)
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
