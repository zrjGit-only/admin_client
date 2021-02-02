import React, {Component} from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message,
    Pagination,
    Space
} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../../../components/LinkButton/LinkButton'
import productAction from "../../../../store/actions/product";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
const Option = Select.Option
const {Column,} = Table;

/*
Product的默认子路由组件
 */
class HomeProduct extends Component {
    state = {
        pageNum: 1,
        pageSize: 3,
        search: '',
        content: ''
    }
    // state = {
    //     total: 0, // 商品的总数量
    //     products: [], // 商品 的数组
    //     loading: false, // 是否正在加载中
    //     searchName: '', // 搜索的关键字
    //     searchType: 'productName', // 根据哪个字段搜索
    // };

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
    //页码改变的回调，参数是改变后的页码及每页条数
    onChange(pageNum, pageSize) {
        this.setState({pageNum: pageNum}, async () => {
            await this.getProduct()
        })
    }
    //pageSize 变化的回调
    onShowSizeChange(current, size) {
        this.setState({pageSize: size}, async () => {
            await this.getProduct()
        })
    }

    //按条件搜索
    async getSearchProduct() {
        const {search, content, pageNum, pageSize} = this.state
        if (!content) {
            message.warning('搜索值不能为空');
            return
        }
        await this.props.getSearchProductStore(pageNum, pageSize, content, search)
        //搜索数据重置
        this.setState({
            search: '',
            content: ''
        })
    }

    async componentWillMount() {
        await this.getProduct()
    }



    render() {

        // 取出状态数据
        //const {products, total, loading, searchType, searchName,pageSize,pageNum,list} = this.state

        const {list, total, pageSize, pageNum, content} = this.props.productList
        if (!pageSize) return null
        const goTOAddUpData = (
            <NavLink to="/product/addupdate">
                <Button type="primary" icon={<PlusOutlined/>}>
                    添加商品
                </Button>
            </NavLink>
        )
        const title = (<>
            <Select placeholder="请选择搜索条件" style={{width: 150}}
                    onChange={(value) => this.setState({search: value})}>
                <Option value="1">按名称搜索</Option>
                <Option value="2">按描述搜索</Option>
            </Select>
            <Input placeholder="关键字" style={{width: 150, marginLeft: 15}} value={content}
                   onChange={(e) => this.setState({content: e.target.value})}/>
            <Button type="primary" style={{marginLeft: 15}}
                    onClick={this.getSearchProduct.bind(this)}>搜索</Button>
        </>)


        return (
            <Card title={title} extra={goTOAddUpData}>
                <Table dataSource={list} bordered pagination={false}>
                    <Column title="商品名称" dataIndex="name" key="name"/>
                    <Column title="商品描述" dataIndex="desc" key="desc"/>
                    <Column title="价格"
                            dataIndex="price"
                            key="price"
                            render={(text, record) => `￥ ${text}`}/>
                    <Column
                        title="状态"
                        width="50px"
                        key="status"
                        render={(text, record) => {
                            return (<Space size="middle" style={{display: 'block'}}>
                                <Button type="primary" onClick={this.ProductUpOrDown.bind(this, text)}>{
                                    text.status === 0 ? '下架' : '上架'
                                }</Button>
                                <div>{
                                    text.status === 0 ? '在售' : '已下架'
                                }</div>
                            </Space>)
                        }}/>
                    <Column
                        title="操作"
                        width="50px"
                        key="operating"
                        render={(text, record) => (
                            <Space size="middle">
                                <Button type="link" onClick={()=>this.props.history.push('/product/detail',text)} >详情</Button>
                                <Button type="link" onClick={()=>this.props.history.push('/product/addupdate',text)}>修改</Button>
                            </Space>
                        )}
                    />
                </Table>
                <Pagination
                    defaultCurrent={1}
                    current={pageNum}
                    total={total}
                    pageSize={pageSize}
                    pageSizeOptions={[3, 5, 8]}
                    style={{marginTop: 20, float: "right"}}
                    onChange={this.onChange.bind(this)}
                    onShowSizeChange={this.onShowSizeChange.bind(this)}
                    showSizeChanger
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
        async getSearchProductStore(pageNum, pageSize, content, search) {
            await dispatch(productAction.getSearchProduct(pageNum, pageSize, content, search))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeProduct);