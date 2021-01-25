import React, {Component} from 'react';
import {Input, Button,Form,Checkbox} from "antd"
// import Icon from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import './Login.less';
class Login extends Component {
   render() {
       return (
           <div className="login">
               <header className="login-header">
                   <h1>React 后台管理系统</h1>
               </header>
               <section className="login-content">
                   <h2>用户登陆</h2>
                   <Form className="login-form">
                       <Form.Item>
                           <Input  prefix={<UserOutlined />} placeholder="用户名"/>
                       </Form.Item>

                       <Form.Item>
                           <Input.Password
                               prefix={<UserOutlined />} placeholder="密码"/>
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
}

export default Login
