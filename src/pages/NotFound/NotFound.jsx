import React from 'react'
import {Button} from 'antd'
import './NotFound.less'

function NotFound(props) {
    const goHome = () => {
        props.history.replace('/home')
    }
    return (
        <div className='not-found'>
            <img src="./404.jpg" className="img"/>
            <div>
                <Button type='primary' onClick={goHome}> 回到首页 </Button>
            </div>
        </div>
    )

}

export default NotFound;