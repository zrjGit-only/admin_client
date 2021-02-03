import React, {Component} from 'react';
import {Card, Form, Input, Upload,  Cascader, Button,message} from "antd";
import {
    ArrowLeftOutlined, LoadingOutlined, PlusOutlined
} from '@ant-design/icons';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import LinkButton from "../../../../components/LinkButton/LinkButton";
import categoryAction from "../../../../store/actions/category";
import './AddupdateProduct.less'
import PicturesWall  from "../PicturesWall/PicturesWall";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import {getCategoryInfo, reqAddOrUpdateProduct} from "../../../../api/http"
import memoryUtils from "../../../../utils/memoryUtils"
/*|categoryId    |Y       |string   |分类ID
  |pCategoryId   |Y       |string   |父分类ID
  |name          |Y       |string   |商品名称
  |desc          |N       |string   |商品描述
  |price         |N       |string   |商品价格
  |detail        |N       |string   |商品详情
  |imgs          |N       |array   |商品图片名数组*/

class AddupdateProduct extends Component {
    state = {
        //productInfo: {},
        category: [],//二级商品分类
        options: [],
    }
    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
        }))

        // 如果是一个二级分类商品的更新
        const {isUpdate, productInfo} = this
        const {pCategoryId} = productInfo
        if(isUpdate && pCategoryId!=='0') {
            // 获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            // 生成二级下拉列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))

            // 找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value===pCategoryId)

            // 关联对应的一级option上
            targetOption.children = childOptions
        }


        // 更新options状态
        this.setState({
            options
        })
    }
    constructor (props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        this.editor = React.createRef()
    }
    componentWillMount () {
        // 取出携带的state
        const productInfo = memoryUtils.productInfo  // 如果是添加没值, 否则有值
        // 保存是否是更新的标识
        this.isUpdate = !!productInfo._id
        // 保存商品(如果没有, 保存是{})
        this.productInfo = productInfo || {}
    }


    async componentDidMount() {
        //获取路由传过来的数据

        //获取路由传过来的数据
        if (this.props.location.state) {

            this.setState({
                productInfo: this.props.location.state
            },async ()=>{
                const {pCategoryId,categoryId }=this.state.productInfo

                if(pCategoryId === '0'){ //说明当前就是一级分类
                    const {data} = await getCategoryInfo(categoryId);
                    this.setState({c1Name: data.name});
                }else{
                    //同时发送两个请求 减少请求发送的次数 都成功后才成功 否则都失败
                    const res =  await Promise.all([getCategoryInfo(pCategoryId),getCategoryInfo(categoryId)])
                    this.setState({
                        c1Name: res[0].data.name,
                        c2Name: res[1].data.name
                    })
                }
            })
        }
        await this.props.getCategoryStore('0')
        let {category1} = this.props
        //加工获取到的一级列表
        this.setState({
            category: category1.map(item => ({
                label: item.name,
                value: item._id,
                isLeaf: false
            }))
        })
    }
    /*
   在卸载之前清除保存的数据
   */
    componentWillUnmount () {
        memoryUtils.productInfo = {}
    }

    getCategorys = async (parentId) => {
        const result = await reqAddOrUpdateProduct(parentId)   // {status: 0, data: categorys}
        if (result.status===0) {
            const categorys = result.data
            // 如果是一级分类列表
            if (parentId==='0') {
                this.initOptions(categorys)
            } else { // 二级列表
                return categorys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }
        }
    }
    //验证价格的自定义验证
    validator = () => ({
        validator(_, value) {
            if (value > 0) {
                return Promise.resolve();
            }
            return Promise.reject('价格不能小于0');
        },
    })
    //获取商品一二级列表
    loadData = async (value) => {
        //点击一级分类获取二级分类
        value[0].loading = true
        await this.props.getCategoryStore(value[0].value)
        value[0].loading = false
        //获取请求到的二级分类
        const {category2} = this.props
        const {category} = this.state
        let arr = category
        //判断请求到的二级分类是否有数据
        const parentId = this.props.category2.length>0 ? this.props.category2[0].parentId : ''
        //有的话加工
        for (let item of arr) {
            if(parentId === ''){
                item.isLeaf = true
            }else{
                if(item.value === parentId){
                    item.isLeaf = false
                    item.children = category2.map(i=>({
                        label: i.name,
                        value:i._id,
                        isLeaf:true
                    }))
                }
            }

        }
        this.setState({
            category: arr
        })
    }

    onChange = (a,b) => {
        console.log(a, b);
    }
    // 表单验证成功后的回调
    onFinish = async(values) => {

        // 进行表单验证, 如果通过了, 才发送请求
        // this.props.form.validateFields(async (error, values) => {
        //     if (!error) {

        // 1. 收集数据, 并封装成product对象
        const {name, desc, price, categoryIds} = values
        //let pCategoryId, categoryId
        // if (categoryIds.length===1) {
        //     pCategoryId = '0'
        //     categoryId = categoryIds[0]
        // } else {
        //     pCategoryId = categoryIds[0]
        //     categoryId = categoryIds[1]
        // }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()

        const product = {name, desc, price, imgs, detail,}

        // 如果是更新, 需要添加_id
        if(this.isUpdate) {
            product._id = this.product._id
        }

        // 2. 调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product)

        // 3. 根据结果提示
        if (result.status===0) {
            message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
            this.props.history.goBack()
        } else {
            message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
        }
        //     }
        // })
    }


    handleChange = () => {

    }


    render() {
        const {isUpdate, productInfo} = this
        const {category} = this.state

        const {pCategoryId, categoryId, imgs, detail,name, price,desc} = productInfo
        // if (this.props.location.state) {
        //     var {desc, imgs, name, price, detail,pCategoryId, categoryId} = this.state.productInfo
        // }
        //const {pCategoryId, categoryId} = product
        // 用来接收级联分类ID的数组
        const categoryIds = []
        if(isUpdate) {
            // 商品是一个一级分类的商品
            if(pCategoryId==='0') {
                categoryIds.push(categoryId)
            } else {
                // 商品是一个二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

        //头部添加商品

        const title = (
            <span>
                <LinkButton onClick={() => {
                    this.props.history.goBack()
                }}>
                    <ArrowLeftOutlined type='arrow-left' style={{fontSize: 20}}/>
                    <span>{this.isUpdate ? '修改商品' : '添加商品'}</span>
                </LinkButton>

           </span>
        )

        //控制form表单的栅格化
        const formItemLayout = {
            labelCol: {span: 1.5},
            wrapperCol: {span: 8},
        };

        return (
            <Card title={title} extra={<a href="#">More</a>}>
                <Form {...formItemLayout} onFinish={this.onFinish}>
                    <Form.Item label="商品名称" rules={[{required: true, message: '商品名称不能为空'}]} name='name'>
                        <Input placeholder="请输入商品名称" value={name && name} name="name"/>
                    </Form.Item>
                    <Form.Item label="商品描述" rules={[{required: true, message: '商品描述不能为空'}]} name="desc">
                        <Input.TextArea placeholder="请输入商品描述" value={desc && desc} autoSize={{minRows: 2, maxRows: 6}}
                                        name="desc"/>
                    </Form.Item>
                    <Form.Item label="商品价格" rules={[
                        {required: true, message: '请填写商品价格'}, this.validator]} name="price">
                        <Input type="number" addonAfter="元" placeholder="请输入商品价格" value={price && price} name="price"/>
                    </Form.Item>
                    <Form.Item label="商品分类"   rules={[{required: true, message: '请选择商品分类'}]} name="categoryId" >
                        <Cascader options={category} loadData={this.loadData} onChange={this.onChange} changeOnSelect
                                  name="categoryId"/>
                    </Form.Item>
                    <Form.Item label="上传图片">
                        <PicturesWall ref={this.pw} imgs={imgs}/>
                    </Form.Item>
                    <Form.Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20}}>
                        <RichTextEditor ref={this.editor} detail={detail}/>
                    </Form.Item>
                    <Button type="primary" htmlType='submit'>提交</Button>
                </Form>
            </Card>
        );
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
        // async getCategoryAllStore() {
        //     await dispatch(categoryAction.getCategoryAll())
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddupdateProduct)
