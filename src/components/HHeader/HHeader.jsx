import React, {useState, useEffect} from 'react';
import './HHeader.less'
import {Button, Form} from 'antd';
import {withRouter} from 'react-router-dom'

import {formateDate} from '../../utils/dateUtils'
import CitySelect from "../CitySelect/CitySelect";
import menuList from '../../config/menuConfig'

const FormItem = Form.Item;

function HHeader(props) {
    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))//当前时间
    const [weather_icon, setWeatherIcon] = useState('')//天气图标
    const [weather_curr, setWeatherCurr] = useState('')//天气

    const confirm = () => {

    }
    //获取头部信息
    const getTitle = () => {
        const path = props.location.pathname
        // console.log(path);
        let title=''
        menuList.forEach(item => {
            if (item.children) {
                const has = item.children.find(i => i.key === path)
                if (has) {
                    title = has.title
                }
            } else {
                if(item.key === path){
                    title = item.title
                }
            }
        })
        return title
    }
    // 获取选择值
    const getSelectedValues = selectedValues => {
        this.setState({
            selectedValues
        });
    };
    const handleSubmit = value => {
        console.log(value, "formData");
        const data = {
            ...value,
            selectedValues: this.state.selectedValues
        };
        console.log(data, "data");

    };

    useEffect(() => {
        console.log(props);
        // //获取天气信息
        // const {weather_icon, weather_curr} = await gerWeather(1)
        //setWeatherIcon(weather_icon)
        //setWeatherCurr(weather_curr)
        //使用定时器 更新时间
        const inter = setInterval(() => {
            setCurrentTime(formateDate(Date.now()))
        }, 1000)
        return () => {
            clearInterval(inter)
        }
    }, [])

    return (
        <div className='container'>
            <div className="admin">
                <p>
                    <span>欢迎 data.username</span>
                    <Button
                        type="link"
                        onClick={confirm}
                        className="btn"> 退出
                    </Button>
                </p>

            </div>
            <div className="weather">
                <div className="left">{getTitle()}</div>
                <div className="right">
                    <Form
                        className="custom-form custom-vertical-hotel-form"
                        layout="inline"
                        labelAlign="left"
                        onFinish={handleSubmit}
                        style={{padding: 24, float: 'right'}}
                    >
                        {/* 数据绑定 拿到的city字段是城市编码  getSelectedValues监听可以拿到选择的数据对象 */}
                        <FormItem label="城市选择："
                                  rules={[{required: true, message: "请选择城市选择"}]}>
                            <CitySelect getSelectedValues={getSelectedValues}/>
                        </FormItem>
                        {/*<FormItem style={{paddingBottom: 0}}>*/}
                        {/*    <Button type="primary" htmlType="submit">*/}
                        {/*        <Icon type="arrow-up"/>*/}
                        {/*        保存*/}
                        {/*    </Button>*/}
                        {/*</FormItem>*/}
                    </Form>
                    <div style={{float: 'right', paddingTop: 30}}>
                        <span className="time">{currentTime}</span>
                        <img src={weather_icon} alt=""/>
                        <span>{weather_curr}</span>
                    </div>
                </div>
            </div>
            <span className="iconfont icon-jiantou-drop-down-kuai jiantou"> </span>
        </div>
    )
}

export default withRouter(HHeader)