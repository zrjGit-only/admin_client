import React, {Component} from 'react';
import {Form, Input} from "antd";

class UpDataFrom extends Component {
  state = {
    value: ''
  }

  onFormChange(e) {
    console.log(11);
    this.props.onFormChange(e)
    this.setState({value: e.target.value})
  }

  static getDerivedStateFromProps(prevProps, prevState)  {
    return {
      value:prevProps.currentUpdataInfo
    }
  }

  render() {
    const {value} = this.state
    return (
        <Form>
          <Form.Item label="修改分类"  rules={[{ required: true, message: '请输入分类名称' }]}>
            <Input onChange={this.onFormChange.bind(this)} name="categoryName" value={value}/>
          </Form.Item>
        </Form>
    );
  }
}

export default UpDataFrom;
