import React from 'react'
import {Card, Button} from 'antd';
import './Bar.less'

export default function Bar() {
    const update = () => {

    }
    return (
        <>
            <Card style={{width: "100%"}}>
                <Button type='primary' onClick={update}>更新</Button>
            </Card>
            <Card title='柱状图一'>
            </Card>
        </>


    )
}