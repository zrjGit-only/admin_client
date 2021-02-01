import React, {Component} from 'react';
import {
    Form,
    Input,
    Button,
} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './Login.less';
import bg from '../../config/bgConfig'

class Login extends Component {
    state = {
        bgUrl: '/images/1.jpg'
    }

    componentDidMount() {
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

    handleSubmit = (e) => {
        console.log(e);
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
                    <Form className="login-form" onFinish={this.handleSubmit.bind(this)}
                          initialValues={{"username": "admin", "password": "admin"}}>
                        <Form.Item rules={[
                            {required: true, message: '用户名不能为空'},
                            {min: 4, message: '用户名至少4位'},
                            {max: 12, message: '用户名最多12位'},
                            {pattern: /^[A-z0-9_]+$/, message: '用户名必须是英文、数字或者下划线组成'},
                            {whitespace: true}]} name='username'>
                            <Input prefix={<UserOutlined/>} placeholder="用户名"/>
                        </Form.Item>

                        <Form.Item rules={[
                            {required: true, message: '密码不能为空'},
                            {min: 4, message: '用户名至少4位'},
                            {max: 12, message: '用户名最多12位'},
                            {whitespace: true}]} name='password'>
                            <Input.Password prefix={<LockOutlined/>} placeholder="密码"/>
                        </Form.Item>

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

export default Login