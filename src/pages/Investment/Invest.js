import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber,message} from 'antd';
import React, {Component} from 'react';
import './Invest.css';
import NavHeader from 'components/NavHeader/NavHeader';

function onChange(value) {
    this.setState({
        investValue:value 
    })
    console.log('changed', value);
  }

export default class Invest extends React.Component {
    state = {
        investValue: 10000,
    }
    componentDidMount() {
        var that = this;
        fetch('/v1/product/getProductByPId?pid=25', {//获取首页展示产品列表
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        if (data.code == 0) {
                            that.setState({
                                productDetails: data.data,
                            });
                            console.log(data.data);
                        }
                        else {
                            message.error(data.message);
                        }
                    });
                }
            })
            .catch((res) => {
                message.error(res.status);
            })           
    }
    investProduct(pid,investValue){
        const accountId = sessionStorage.getItem("accountId");
        const token = sessionStorage.getItem("token");
        var that = this;
        fetch('/v1/product/investmentProduct', {//获取首页展示产品列表
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:{
                pid:pid,
                accountId:accountId,
                money:investValue,
                tpwd:'',
                token:token
            }
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        if (data.code == 0) {                           
                            console.log(data.data);
                            message.success("投资成功");
                        }
                        else {
                            message.error(data.message);
                        }
                    });
                }
            })
            .catch((res) => {
                message.error(res.status);
            })  
    }
    render() {
        const {investValue, productDetails } = this.state;
        if (productDetails === undefined) return null;
        return (
            <div>
                <NavHeader/>
                <div className="content">
                <div className="product">
                    <div className="products-box">
                        <div className="product-box">
                            <div className="name-box">{productDetails.project.name}    {productDetails.name}</div>
                            <div className="info-box">
                                <div className="info">
                                    <div className="upInfo">{productDetails.yield}<span className="up-percent">%</span></div>
                                    <div className="downInfo">预期年化收益率</div>
                                </div>
                                <div className="info">
                                    <div className="upInfo">{productDetails.duration} <span className="up-percent">个月</span></div>
                                    <div className="downInfo">产品期限</div>
                                </div>
                                <div className="info">
                                    <div className="upInfo">{productDetails.miniInvestment} <span className="up-percent">万元</span></div>
                                    <div className="downInfo">起投金额</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail">
                    <div>
                        购买金额：
                        <span><InputNumber min={1000000} max={2000000} defaultValue={investValue}  onChange={onChange} /></span>元
                    </div>
                    <div>
                    <Button type="primary" onClick={this.investProduct.bind(this,productDetails.id,investValue)}>立即投资</Button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}