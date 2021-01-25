import React, {Component} from 'react';
import './Admin.less'
import { Layout} from 'antd';
import SSider from '../../components/SSider/SSider'
import HHeader from '../../components/HHeader/HHeader'

const { Header, Content, Footer, Sider } = Layout;

class Admin extends Component {

    render() {
        return (
            <Layout >
                <SSider/>
                <Layout>
                    <HHeader></HHeader>
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
