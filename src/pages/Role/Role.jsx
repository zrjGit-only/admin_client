import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Card, Button, Table, Modal, Form, Input, Tree, message} from 'antd';
import roleAction from "../../store/actions/role";
import menuList from '../../config/menuConfig'
import {upDataRoleInfo, addRoleInfo} from '../../api/http'


const {Column} = Table;

function Role(props) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])  //table内选中项 只有id
    const [selectedRows, setSelectedRows] = useState([])        //table内选中项 有详细的内容
    const [isDisabled, setIsDisabled] = useState(true)          //控制设置角色权限按钮是否禁用
    const [isModalVisible, setIsModalVisible] = useState(0) //控制model是否显示
    const [selectedKeys, setSelectedKeys] = useState([]) //defaultCheckedKeys
    const [roleName, setRoleName] = useState('') //收集增加角色的信息

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
    const handleOk = async (flag) => {
        if(!roleName){
            message.warn('请输入正确内容')
            return
        }
        let res
        if (flag === 1) {
            //保存选中的权限 发送请求
            let roleInfo = {
                _id: selectedRows[0]._id,
                menus: selectedKeys,
                auth_time: "111",
                auth_name: 'admin'
            }
            res = await upDataRoleInfo(roleInfo)
        }
        if (flag === 2) {
            if (!roleName) {
                message.warning('请输入用户名称')
                return
            } else {
                res = await addRoleInfo(roleName)
                console.log(res.msg);
            }
        }
        if (res.status === 0) {
            message.success('成功')
        } else {
            message.error('网络抖动')
            return
        }
        //关闭复选框
        setIsModalVisible(0)
        setRefresh(!refresh)
        setRoleName('')


    }
    //点击model内的取消按钮
    const handleCancel = () => {
        setIsModalVisible(0)
        setRoleName('')
    }
    //点击model内的复选框时触发
    const onCheck = (checkedKeys) => {
        setSelectedKeys(checkedKeys);
    }

    const title = (
        <div>
            <Button type="primary" style={{marginRight: 10}} onClick={() => {
                //打开创建角色复选框
                setIsModalVisible(2)
            }}>创建角色</Button>
            <Button type="primary" disabled={isDisabled} onClick={() => {
                //设置选中项的menus
                setSelectedKeys(() => selectedRows[0].menus)
                //打开修改角色复选框
                setIsModalVisible(1)
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
            <Modal title="设置角色权限" visible={isModalVisible === 1} onOk={() => handleOk(1)} onCancel={handleCancel}>
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
            <Modal title="创建角色" visible={isModalVisible === 2} onOk={() => handleOk(2)} onCancel={handleCancel}>
                <Form>
                    <Form.Item label='角色名称'
                               name="roleName"
                               rules={[
                                   {required: true, message: '角色名称不能为空'},
                                   {min: 4, message: '角色名称至少4位'},
                                   {max: 12, message: '角色名称最多12位'},
                                   {whitespace: true}]}>
                        <Input  name="roleName" placeholder="请输入角色名称" value={roleName} onChange={e => setRoleName(e.target.value)}/>
                        <br name='br'/>
                    </Form.Item>
                </Form>

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