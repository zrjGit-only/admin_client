import React, {useState, useEffect} from 'react';
import './HHeader.less'
import {Button, Form,message,Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import {SPH_ADMIN_LOGIN} from '../../utils/localStorageType'
import {formateDate} from '../../utils/dateUtils'
import CitySelect from "../CitySelect/CitySelect";
import menuList from '../../config/menuConfig'
import getWeather from '../../api/weather'

const FormItem = Form.Item;

function HHeader(props) {
    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))//当前时间
    const [weather_curr, setWeatherCurr] = useState('')//天气
    const [weather_temp, setWeatherTemp] = useState('')//气温
    const [selectedValues, setSelectedValues] = useState('')//天气


    const confirm = () => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined/>,
            content: '是否退出登录?',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                console.log(this)
                localStorage.removeItem(SPH_ADMIN_LOGIN)
                message.success('退出成功');
                props.history.replace('/login')
            }
        });
    }
    //获取头部信息
    const getTitle = () => {
        const path = props.location.pathname
        // console.log(path);
        let title = ''
        menuList.forEach(item => {
            if (item.children) {
                const has = item.children.find(i => i.key === path)
                if (has) {
                    title = has.title
                }
            } else {
                if (item.key === path) {
                    title = item.title
                }
            }
        })
        return title
    }
    // 获取选择值
    const getSelectedValues = selectedValues => {
        setSelectedValues(selectedValues)
    };
    //获取天气情况
    const handleSubmit = async value => {
        console.log(value, "formData");
        const data = {
            ...value,
            selectedValues: selectedValues
        };
        const city = data.selectedValues[0].label.slice(0,-1)
        const result = await getWeather(city)
        console.log(result,'result');
        setWeatherTemp(result.today.temperature)
        setWeatherCurr(result.today.wind)
    };

    useEffect(() => {
        //使用定时器 更新时间
        const inter = setInterval(() => {
            setCurrentTime(formateDate(Date.now()))
        }, 1000)
        return () => {
            clearInterval(inter)
        }
    }, [])
    console.log(JSON.parse(localStorage.getItem(SPH_ADMIN_LOGIN)));
    const username=JSON.parse(localStorage.getItem(SPH_ADMIN_LOGIN))[0].item.username
    return (
        <div className='container'>
            <div className="admin">
                <p>
                    <span>欢迎 {username ? username : '请登录'}</span>
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
                        <FormItem label="选择城市查看天气："
                                  rules={[{required: true, message: "请选择城市"}]}>
                            <CitySelect getSelectedValues={getSelectedValues}/>
                        </FormItem>
                        <FormItem style={{paddingBottom: 0}}>
                            <Button type="primary" htmlType="submit">
                                查看
                            </Button>
                        </FormItem>
                    </Form>
                    <div style={{float: 'right', paddingTop: 30}}>
                        <span className="time">{currentTime}</span>&nbsp;&nbsp;
                        <span >{weather_curr}</span>&nbsp;&nbsp;
                        <span >{weather_temp}</span>&nbsp;&nbsp;
                        <span>{weather_curr}</span>
                    </div>
                </div>
            </div>
            <span className="iconfont icon-jiantou-drop-down-kuai jiantou"> </span>
        </div>
    )
}

export default withRouter(HHeader)