import React, {Component} from 'react';
import {Card, Form, Input, Upload,  Cascader, Button} from "antd";
import {
    ArrowLeftOutlined, LoadingOutlined, PlusOutlined
} from '@ant-design/icons';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import categoryAction from "../../../../store/actions/category";
import './AddupdateProduct.less'
/*|categoryId    |Y       |string   |分类ID
  |pCategoryId   |Y       |string   |父分类ID
  |name          |Y       |string   |商品名称
  |desc          |N       |string   |商品描述
  |price         |N       |string   |商品价格
  |detail        |N       |string   |商品详情
  |imgs          |N       |array   |商品图片名数组*/
class AddupdateProduct extends Component {
    state = {
        productInfo: {},
        category: [],//二级商品分类
    }

    async componentDidMount() {
        //获取路由传过来的数据
        if (this.props.location.state) {
            this.setState({
                productInfo: this.props.location.state || {}
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
    onFinish = () => {

    }
    handleCancel = () => {

    }

    handleChange = () => {

    }


    render() {
        const {category} = this.state
        if (this.props.location.state) {
            var {desc, imgs, name, price, detail} = this.state.productInfo
        }
        //头部添加商品
        const title = (<NavLink to="/product"><ArrowLeftOutlined/>
            &nbsp;&nbsp;添加商品</NavLink>)
        //控制form表单的栅格化
        const formItemLayout = {
            labelCol: {span: 1.5},
            wrapperCol: {span: 8},
        };
        //上传按钮
        const uploadButton = (
            <div className="LoadingOutlined">
                {0 ? <LoadingOutlined/> : <PlusOutlined/>}
                <div style={{marginTop: 8}}>Upload</div>
            </div>
        );
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
                    <Form.Item label="商品分类" rules={[{required: true, message: '请选择商品分类'}]} name="categoryId">
                        <Cascader options={category} loadData={this.loadData} onChange={this.onChange} changeOnSelect
                                  name="categoryId"/>
                    </Form.Item>
                    <Form.Item label="上传图片">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://localhost:5000/manage/img/upload"
                            onChange={this.handleChange}
                        >
                            {imgs ? <img src={imgs} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                        </Upload>
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
