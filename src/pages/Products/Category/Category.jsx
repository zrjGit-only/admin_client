import React, {Component} from 'react';
import {connect} from "react-redux";
import PubSub from 'pubsub-js'
import AddFrom from './AddForm'
import UpDataFrom from './UpdateForm'
import categoryAction from '../../../store/actions/category'

import {Card, Table, Button, Space, Modal,message} from 'antd';
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';

const {Column} = Table;


class Category extends Component {

    state = {
        isLoading: false,
        ShowModal: 0, //1: 添加分类 2:更新分类
        text: null,//保存当前修改的内容
        category: [],//保存渲染的是以及列表还是二级列表
        parentId: '0',//当前列表的内容是一级列表还是二级列表
        c1Name: '',//一级列表的名称
        form: {     //收集foem表单的数据
            categoryId: '0',//收集select的数据
            categoryName: '', //收集input的数据
        },
        flag: false
    }

    //添加一二级分类
    async addCategory() {
        this.setState({
            ShowModal: 1,
        })
    }

    //AddFrom收集的数据
    async onFormChange(e) {
        if (e.target) {
            await this.setState({form: {...this.state.form, categoryName: e.target.value}})
        } else {
            await this.setState({form: {...this.state.form, categoryId: e}})
        }
    }

    //更新一二级分类
    async upDataCategory(text) {
        this.setState({
            ShowModal: 2,
            text,
            form: {
                ...this.state.form,
                categoryName: text.name
            }
        })

    }

    //确认添加 / 确认更新
    async OK(flag) {
        if (!this.state.form.categoryName) {
            message.warning('请不要输入空信息');
            return
        }
        const {parentId} = this.state

        if (flag === 'add') { //添加操作
            console.log(1)
            const {categoryId, categoryName} = this.state.form
            //添加一级分类
            await this.props.addCategoryStore(categoryId, categoryName)
        } else {  //更新操作
            const {text: {_id}, form: {categoryName}} = this.state
            await this.props.upDataCategoryStore(_id, categoryName)
        }
        //关闭确认框
        const category = parentId === '0' ? this.props.category1 : this.props.category2
        await this.getCategoryFn()
        await this.setState({
            ShowModal: 0,
            category,
            form: {     //重置收集到的数据
                categoryId: '0',
                categoryName: '',
            }
        })
        PubSub.publish('upDataChild')
        PubSub.publish('addChild')
    }

    //判断是查看一级分类还是二级子分类
    async getCategory(text) {
        if (text) { //获取二级分类
            await this.setState({
                parentId: text._id,
                c1Name: text.name
            })
            await this.getCategoryFn()
            this.setState({
                category: this.props.category2
            })
        } else {//获取一级分类
            this.setState({
                parentId: '0',
                c1Name: '',
                category: this.props.category1
            })
        }

    }

    //获取一二级分类的公共函数
    async getCategoryFn() {
        const {parentId} = this.state
        this.setState({
            isLoading: true
        })
        //获取一级/二级分类列表
        await this.props.getCategoryStore(parentId)
        this.setState({
            isLoading: false
        })
    }

    render() {
        let {category, ShowModal, isLoading, c1Name, form, parentId} = this.state
        let title = c1Name ? (<span>
                                    <Button type="link" style={{fontSize: 16}}
                                            onClick={this.getCategory.bind(this)}>一级分类列表
                                    </Button><ArrowRightOutlined/>&nbsp;&nbsp;{c1Name}
                              </span>)
            : '一级分类列表'
        return (
            <Card title={title} className="card"
                  extra={<Button type="primary" icon={<PlusOutlined/>}
                                 onClick={this.addCategory.bind(this)}> 添加</Button>}>
                <Modal title="添加分类"
                       centered
                       visible={ShowModal === 1}
                       onOk={this.OK.bind(this, 'add')}
                       onCancel={() => this.setState({ShowModal: 0})}>
                    <AddFrom onFormChange={this.onFormChange.bind(this)} parentId={parentId}/>
                </Modal>
                <Modal title="更新分类"
                       centered
                       visible={ShowModal === 2}
                       onOk={this.OK.bind(this, 'upData')}
                       onCancel={() => this.setState({ShowModal: 0})}>
                    <UpDataFrom onFormChange={this.onFormChange.bind(this)} currentUpdataInfo={form.categoryName}/>
                </Modal>
                <Table dataSource={category} bordered rowKey="_id" loading={isLoading}
                       pagination={{defaultPageSize: 5, showQuickJumper: true}}>
                    <Column title="分类名称" dataIndex="name" key="address"/>
                    <Column
                        title="操作"
                        key="action"
                        width="40%"
                        render={(text, record, index) => (
                            <Space size="middle">
                                <Button type="link" onClick={this.upDataCategory.bind(this, text)}>修改分类</Button>
                                <Button type="link" onClick={this.getCategory.bind(this, text)}
                                        style={{display: c1Name ? 'none' : 'block'}}>查看子分类</Button>
                            </Space>
                        )}
                    />
                </Table>
            </Card>
        );
    }

    async componentDidMount() {
        //获取一级分类
        await this.getCategoryFn()
        this.setState({
            category: this.props.category1
        })
    }
}

function mapStateToProps(state) {
    return {
        category1: state.category.category1,
        category2: state.category.category2,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getCategoryStore(parentId) {
            await dispatch(categoryAction.getCategory(parentId))
        },
        async addCategoryStore(categoryId, categoryName) {
            await dispatch(categoryAction.addCategory(categoryId, categoryName))
        },
        async upDataCategoryStore(categoryId, categoryName) {
            await dispatch(categoryAction.upDataCategory(categoryId, categoryName))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)