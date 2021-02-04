import React, {Component} from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    message
} from 'antd'
import {
    ArrowLeftOutlined,
} from '@ant-design/icons';
import PicturesWall from '../PicturesWall/PicturesWall'
import RichTextEditor from '../RichTextEditor/RichTextEditor'
import LinkButton from '../../../../components/LinkButton/LinkButton'
import {getCategory, reqAddOrUpdateProduct} from '../../../../api/http'
import memoryUtils from "../../../../utils/memoryUtils";

const {Item} = Form

/*
Product的添加和更新的子路由组件
 */
class AddupdateProduct extends Component {
    from=React.createRef()
    state = {
        options: [],
    }

    constructor (props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        this.editor = React.createRef()
    }

    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
        }))

        // 如果是一个二级分类商品的更新
        const {isUpdate, product} = this
        console.log(product)
        const {pCategoryId} = product
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

    /*
    异步获取一级/二级分类列表, 并显示
    async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
     */
    getCategorys = async (parentId) => {
        const result = await getCategory(parentId)   // {status: 0, data: categorys}
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


    /*
    验证价格的自定义验证函数
     */
    //验证价格的自定义验证
    validator = () => ({
        validator(_, value) {
            if (value > 0) {
                return Promise.resolve();
            }
            return Promise.reject('价格不能小于0');
        },
    })
    /*
    用加载下一级列表的回调函数
     */
    loadData = async selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[0]
        // 显示loading
        targetOption.loading = true

        // 根据选中的分类, 请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        // 隐藏loading
        targetOption.loading = false
        // 二级分类数组有数据
        if (subCategorys && subCategorys.length>0) {
            // 生成一个二级列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            // 关联到当前option上
            targetOption.children = childOptions
        } else { // 当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }

        // 更新options状态
        this.setState({
            options: [...this.state.options],
        })
    }

    onFinish  =  () => {
         this.from.current.validateFields().then(values => {
            // 1. 收集数据, 并封装成product对象
            const {name, desc, price, categoryIds} = values
            // console.log(values)
            let pCategoryId, categoryId
            // console.log(categoryIds)
            if (categoryIds.length===1) {
                pCategoryId = '0'
                categoryId = categoryIds[0]
            } else {
                pCategoryId = categoryIds[0]
                categoryId = categoryIds[1]
            }

            const imgs = this.pw.current.getImgs()
            const detail = this.editor.current.getDetail()

            const product = {name, desc, price, imgs, detail, pCategoryId,categoryId}

            // 如果是更新, 需要添加_id
            if(this.isUpdate) {
                product._id = this.product._id
            }
            console.log(this.isUpdate)
            // 2. 调用接口请求函数去添加/更新
            const result =  reqAddOrUpdateProduct(product)

            // 3. 根据结果提示
            if (result) {
                message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
                this.props.history.goBack()
            } else {
                message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
            }
        });

    }

    componentDidMount () {
        this.getCategorys('0')
    }

    componentWillMount () {
        // 取出携带的state
        const product = memoryUtils.product  // 如果是添加没值, 否则有值
        // 保存是否是更新的标识
        this.isUpdate = !!product._id
        // 保存商品(如果没有, 保存是{})
        this.product = product || {}
    }

    /*
    在卸载之前清除保存的数据
    */
    componentWillUnmount () {
        memoryUtils.product = {}
    }

    render() {

        const {isUpdate, product} = this
        const {pCategoryId, categoryId, imgs, detail} = product
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

        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        }

        // 头部左侧标题
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                  <ArrowLeftOutlined type='arrow-left' style={{fontSize: 20}}/>
                  <span>{isUpdate ? '修改商品' : '添加商品'}</span>
                </LinkButton>
            </span>
        )

        return (
            <Card title={title}>
                <Form {...formItemLayout} onFinish={this.onFinish.bind(this)} ref={this.from}
                      initialValues={{categoryIds:categoryIds,name:product.name,desc:product.desc,price:product.price}}>
                    <Item label="商品名称"  rules={[{required: true, message: '商品名称不能为空'}]} name='name'>
                        <Input placeholder='请输入商品名称' value={ product.name} name="name"/>
                    </Item>
                    <Item label="商品描述" rules={[{required: true, message: '商品描述不能为空'}]} name="desc">
                        <Input.TextArea placeholder="请输入商品描述"  value={ product.desc} autoSize={{minRows: 2, maxRows: 6}} name="desc"/>
                    </Item>
                    <Item label="商品价格" rules={[{required: true, message: '请填写商品价格'}, this.validator]} name="price">
                        <Input type="number" addonAfter="元" placeholder="请输入商品价格" value={ product.price} name="price"/>
                    </Item>
                    <Item label="商品分类"
                          rules={[{required: true, message: '请选择商品分类'}]} name="categoryIds">
                        <Cascader options={this.state.options} loadData={this.loadData} onChange={this.onChange} changeOnSelect
                                  name="categoryId"/>
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={this.pw} imgs={imgs}/>
                    </Item>
                    <Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20}}>
                        <RichTextEditor ref={this.editor} detail={detail}/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.onFinish}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default(AddupdateProduct)


