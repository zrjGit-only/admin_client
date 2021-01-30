import React, {Component} from 'react'
import {
    Card,
    Table,
    Button,
    message,
    Modal,
} from 'antd'
import { PlusOutlined ,ArrowRightOutlined} from '@ant-design/icons';

import LinkButton from "../../../components/LinkButton/LinkButton"
import {reqCategorys} from "../../../api/http"
import AddForm from './AddForm'
// import UpdateForm from './UpdateForm'
export default class Category extends Component {
    state={
        loading: false, // 是否正在获取数据中
        categorys:[],//一级分类列表
        subCategorys: [], // 二级分类列表
        parentId: '0', // 当前需要显示的分类列表的父分类ID
        parentName: '', // 当前需要显示的分类列表的父分类名称
        showStatus:0,
    }


    /*初始化Table所有列的数组*/
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name', // 显示数据对应的属性名
            },
            {
                title: '操作',
                width: 300,
                render: (category) => ( // 返回需要显示的界面标签
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {this.state.parentId==="0"?<LinkButton onClick={this.showsubCategorys(category)}>查看子分类</LinkButton>:null}
                    </span>
                )
            }
        ]
    }

    /*显示指定一级分类对象的二子列表*/
    showSubCategorys = (category) => {
        // 更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => { // 在状态更新且重新render()后执行
            console.log('parentId', this.state.parentId) // '0'
            // 获取二级分类列表显示
            this.getCategorys()
        })
    }

    /*显示一级分类列表*/
    showCategorys=()=>{
        //更新显示一级分类列表
        this.setState({
            parentId:"0",
            parentName: "",
            subCategorys: []
        })
    }

    //隐藏确定框
    handleCancel=()=>{
        this.setState({
            showStatus:0
        })
    }
    //添加分类
    addCategory=()=>{

    }
    //更新分类
    updateCategory=()=>{

    }
    /*
  显示添加的确认框
   */
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }
    /*
  显示修改的确认框
   */
    showUpdate = (category) => {
        // 保存分类对象
        this.category = category
        // 更新状态
        this.setState({
            showStatus: 2
        })
    }

    /* 异步获取一级分类列表*/
    getCategorys= async()=>{
        // 在发请求前, 显示loading
        this.setState({loading: true})
        const {parentId}=this.state
        //发送请求获取数据
        const result=await reqCategorys(parentId)
        // 在请求完成后, 隐藏loading
        this.setState({loading: false})
        if (result.status===0){
            //取出分类数组(一级或者二级)
            const categorys = result.data
            if (parentId===0){
                this.setState({categorys})// 更新一级分类状态
            }else{this.setState({subCategorys: categorys})}// 更新二级分类状态
        }else{
            message.error("获取分类列表失败")
        }
    }

    /*为第一次render准备数据*/
    componentDidMount() {
        this.initColumns()
    }

    componentDidMount () {
        // 获取一级分类列表显示
        this.getCategorys()
    }

    render(){
        const {categorys,loading,subCategorys, parentId,parentName,showStatus,handleCancel} =this.state
        // card的左侧
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{marginRight: 5}}/>
                <span>{parentName}</span>
            </span>
        )
        const extra=(
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined/>
                添加
            </Button>
        )




        return (
            <Card title={title} extra={extra}>
                <Table
                    rowkey="_id"
                    loading={loading}
                    dataSource={parentId==='0' ? categorys : subCategorys}
                    columns={this.columns}
                    bordered={true}></Table>
                <Modal
                    title="添加分类"
                    visible={showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}>
                    <AddForm/>
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}>
                    {/*<UpdateForm*/}

                    {/*    setForm={(form) => {this.form = form}}*/}
                    {/*/>*/}
                </Modal>
            </Card>


        )
    }

}