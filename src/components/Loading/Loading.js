import React,{Component} from 'react';
import {message } from 'antd';
export default class Loading extends Component{
    render(){
        return (
            message.loading("正在加载中",1)
        )
    }
}