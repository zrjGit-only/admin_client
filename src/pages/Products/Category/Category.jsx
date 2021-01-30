import React, {Component} from 'react'
import {
    Card,
    Table,
    Button,
    message,
    Modal,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import LinkButton from "../../../components/LinkButton/LinkButton"
import {reqCategorys} from "../../../api/http"
export default class Category extends Component {
    state={
        categorys:[]//一级分类列表
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
                        <LinkButton >修改分类</LinkButton>
                        <LinkButton >查看子分类</LinkButton>
                    </span>
                )
            }
        ]
    }

    /* 异步获取一级分类列表*/
    getCategorys= async()=>{
        //发送请求获取数据
        const result=await reqCategorys("0")
        if (result.status===0){
            const categorys = result.data
            this.setState({categorys})//更新状态
        }else{
            message.error("获取分类列表失败")
        }
    }

    /*为第一次render准备数据*/
    componentDidMount() {
        this.initColumns()
    }

    render(){
        const title="一级分类列表"
        const extra=(
            <Button type='primary'>
                <PlusOutlined/>
                添加
            </Button>
        )


        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];


        return (
            <Card title={title} extra={extra}>
                <Table
                    rowkey="_id"
                    dataSource={dataSource}
                    columns={this.columns}
                    bordered={true}></Table>
            </Card>
        )
    }

}