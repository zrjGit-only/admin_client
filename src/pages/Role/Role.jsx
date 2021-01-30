import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Card, Button, Table, Modal, Form, Input, Tree} from 'antd';
import roleAction from "../../store/actions/role";
import menuList from '../../config/menuConfig'
import {updateRoleInfo} from '../../api/http'
import dayjs from 'dayjs'


const {Column} = Table;

function Role(props) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])  //table内选中项 只有id
    const [selectedRows, setSelectedRows] = useState([])        //table内选中项 有详细的内容
    const [isDisabled, setIsDisabled] = useState(true)          //控制设置角色权限按钮是否禁用
    const [isModalVisible, setIsModalVisible] = useState(false) //控制model是否显示
    const [selectedKeys, setSelectedKeys] = useState([]) //defaultCheckedKeys

    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        const getRoleInfo = async () => {
            await props.getRoleInfoStore()
        }
        getRoleInfo()
    }, [refresh])
    //收集选中的表格项
    const rowSelection = {
        selectedRowKeys,
        onChange(selectedRowKeys, selectedRows) {
            setSelectedRowKeys(selectedRowKeys);//只有id的数组
            setSelectedRows(selectedRows);//有详细的内容的数组,因为后面要取menus
            if (selectedRows.length === 1) {
                setIsDisabled(false)
            } else {
                setIsDisabled(true)
            }
        },
    };
    //点击model确认按钮
    const handleOk = async () => {
        //关闭复选框
        setIsModalVisible(false)
        const auth_time =dayjs().format("YYYY-MM-DD, HH:mm:ss").toString();
        //保存选中的权限 发送请求
        let roleInfo = {
            _id: selectedRows[0]._id,
            menus: selectedKeys,
            auth_time:"111",
            auth_name: 'admin'
        }
        await updateRoleInfo(roleInfo)
        console.log(handleOk);
        setRefresh(!refresh)

    }
    //点击model内的取消按钮
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    //点击model内的复选框时触发
    const onCheck = (checkedKeys) => {
        setSelectedKeys(checkedKeys);
    }

    const title = (
        <div>
            <Button type="primary" style={{marginRight: 10}}>创建角色</Button>
            <Button type="primary" disabled={isDisabled} onClick={() => {
                //设置选中项的menus
                setSelectedKeys(() => selectedRows[0].menus)
                //打开复选框
                setIsModalVisible(true)
            }}>设置角色权限</Button>
        </div>
    )
    return (
        <Card title={title} style={{width: '100%'}}>
            <Table rowSelection={rowSelection} dataSource={props.roleInfo}>
                <Column title="角色名称" dataIndex="name" key="name"/>
                <Column title="创建时间" dataIndex="create_time" key="create_time"/>
                <Column title="授权时间" dataIndex="auth_time" key="auth_time"/>
                <Column title="授权人" dataIndex="auth_name" key="auth_name"/>
            </Table>
            <Modal title="设置角色权限" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form.Item label='角色名称'>
                    <Input value={selectedRows.length === 1 && selectedRows[0].name} disabled/>
                </Form.Item>
                <Tree
                    checkable
                    autoExpandParent
                    defaultExpandAll
                    onCheck={onCheck}
                    treeData={menuList}
                    checkedKeys={selectedKeys}
                />
            </Modal>
        </Card>

    )
}

function mapStateToProps(state) {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Role)