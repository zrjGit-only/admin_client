import React from 'react'
import './NotFound.less'

function NotFound(props) {
    const goHome = () => {
        props.history.replace('/home')
    }
    return (
        <div className='not-found'>
            <img src="./404.jpg" className="img"/>
        </div>
    )

}

export default NotFound;