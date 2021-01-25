import React, {Component} from 'react';
import './Admin.less'
import { Layout, Menu, Switch } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import SSider from '../../components/SSider/SSider'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Admin extends Component {

    render() {
        return (
            <Layout style={{height:'100%'}}>
                <SSider/>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            content
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin
