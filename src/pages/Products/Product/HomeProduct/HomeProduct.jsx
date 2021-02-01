import React, {Component} from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../../../components/LinkButton/LinkButton'
import {getProductLimit} from "../../../../api/http"
import productAction from "../../../../store/actions/product";
import {connect} from "react-redux";
const Option = Select.Option

/*
Product的默认子路由组件
 */
class HomeProduct extends Component {

    state = {
        total: 0, // 商品的总数量
        products: [], // 商品 的数组
        loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'productName', // 根据哪个字段搜索
    };

    /*
    初始化 table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 100,
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                    const {status, _id} = product
                    const newStatus = status===1 ? 2 : 1
                    return (
                        <span>
                            <Button type='primary'>{status===1 ? '下架' : '上架'}</Button>
                            <span>{status===1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
              {/*将product对象使用state传递给目标路由组件*/}
                            <LinkButton >详情</LinkButton>
                            <LinkButton >修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    //获取分页列表
    async getProduct() {
        const {pageNum, pageSize} = this.state
        await this.props.getProductStore(pageNum, pageSize)
    }

    componentWillMount () {
        this.initColumns()
    }

    componentDidMount () {
        this.getProduct(1)
    }

    render() {

        // 取出状态数据
        const {products, total, loading, searchType, searchName} = this.state

        const title = (
            <span>
                <Select
                    value= {searchType}
                    style={{width: 150}}
                    onChange={value => this.setState({searchType:value})}>
                  <Option value='productName'>按名称搜索</Option>
                  <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{width: 150, margin: '0 15px'}}
                    value={searchName}
                    onChange={event => this.setState({searchName:event.target.value})}/>
                <Button type='primary' >搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' >
                <PlusOutlined/>
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        total,
                        showQuickJumper: true,
                    }}
                />
            </Card>
        )
    }
}
function mapStateToProps(state) {
    return {
        productList: state.product.productInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        async getProductStore(pageNum, pageSize) {
            await dispatch(productAction.addProduct(pageNum, pageSize))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeProduct);