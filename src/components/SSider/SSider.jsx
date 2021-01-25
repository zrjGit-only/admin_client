import React, {useState, useEffect} from 'react'
import {withRouter, NavLink} from "react-router-dom"
import {Layout, Menu, Switch} from 'antd';
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';
import menuList from '../../config/menuConfig'

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

function SSider(props) {

    let openKey
    const path = props.history.location.pathname

    const list = (menuList) => {
        //获取当前url
        // const path =
        return menuList.reduce((pre, item) => {
            if (item.children) {//有children,是嵌套的
                const c = item.children.find(i => i.key === path)
                if (c) {
                    openKey = item.key
                    console.log(c,item.key);
                    // console.log(openKey,path)
                }

                pre.push(
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {list(item.children)}
                    </SubMenu>
                )
            } else {
                pre.push(
                    <Menu.Item key={item.key} icon={item.icon}>
                        <NavLink to={item.key}>
                            {item.title}
                        </NavLink>
                    </Menu.Item>
                )
            }
            return pre
        }, [])
    }

    let menu = list(menuList)
    return (
        <Sider>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}>
                {
                    menu
                }
            </Menu>
        </Sider>
    )
}

export default withRouter(SSider);