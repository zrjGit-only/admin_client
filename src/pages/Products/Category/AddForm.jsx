import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Input, Select} from "antd";
import PubSub from 'pubsub-js'


const {Option} = Select;
const {Item} = Form;

class AddFrom extends Component {
    constructor(props) {
        super(props);
        //订阅事件,因为所有修改的操作公用一个输入框
        //如果不清空,下次还是会显示上次的数据,且显示的数据没有被收集
        PubSub.subscribe('addChild', () => {
            this.setState({value: ''})
        })
    }
    state = {
        value: ''
    }

    //收集表单的数据
    async onFormChange(e) {
        this.props.onFormChange(e)
        if (e.target) {
            this.setState({value: e.target.value})
        }
    }

    render() {
        const {value} = this.state
        const {parentId} = this.props
        return (
            <Form>
                <Item label="所属分类" rules={[{required: true, message: '请选择属性分类'}]}>
                    <Select placeholder="请选择分类"
                            onChange={this.onFormChange.bind(this)}
                            name="categoryId">
                        {
                            parentId === '0'
                                ? (<Option value="0">一级分类</Option>)
                                : this.props.category1.map(item => (
                                    <Option value={item._id} key={item._id}>{item.name}</Option>
                                ))
                        }
                    </Select>
                </Item>
                <br/>
                <Item label="分类名称" rules={[{required: true, message: '请输入分类名称'}]}>
                    <Input onChange={this.onFormChange.bind(this)} name="categoryName" value={value} />
                </Item>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
        category1: state.category.category1,
    }
}

export default connect(mapStateToProps, null)(AddFrom)