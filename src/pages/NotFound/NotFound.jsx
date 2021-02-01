import React, {useState, useEffect} from 'react'
import {Button} from 'antd'
import './NotFound.less'

function NotFound(props) {
    const [num, setNum] = useState(5)
    useEffect(() => {
        setInterval(() => {
            setNum(preState => {
                return preState - 1
            })
        }, 1000)
    }, [])

    useEffect(() => {
        if (num === 0) {
            props.history.replace('/home')
        }
    }, [num])
    const goHome = () => {

    }
    return (
        <div className='not-found'>
            <img src="./404.jpg" className="img"/>
            <div>
                <span>{num} &nbsp;秒后跳转至<Button type='link' onClick={goHome} size="large"> 首页 </Button></span>

            </div>
        </div>
    )

}

export default NotFound;