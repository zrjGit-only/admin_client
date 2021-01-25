import React,{useState} from 'react'
import {formateDate} from '../../utils/dateUtils'
import {Button} from 'antd'
import './HHeader.less'

export default function HHeader() {
    const [currentTime,setCurrentTime] = useState(formateDate(Date.now()))//当前时间
    const [weather_icon,setWeatherIcon] = useState('')//天气图标
    const [weather_curr,setWeatherCurr] = useState('')//天气

    const confirm=()=>{

    }
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
                <div className="left">title</div>
                <div className="right">
                    <span className="time">{currentTime}</span>
                    <img src={weather_icon} alt=""/>
                    <span>{weather_curr}</span>
                </div>
            </div>
            <span className="iconfont icon-jiantou-drop-down-kuai jiantou"> </span>
        </div>
    )
}