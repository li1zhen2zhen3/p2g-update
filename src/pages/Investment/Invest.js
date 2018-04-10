import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber} from 'antd';
import React, {Component} from 'react';
import './Invest.css';
import NavHeader from 'components/NavHeader/NavHeader';

function onChange(value) {
    console.log('changed', value);
  }

export default class Invest extends React.Component {
    render() {
        return (
            <div>
                <NavHeader/>
                <div className="content">
                <div className="product">
                    <div className="products-box">
                        <div className="product-box">
                            <div className="name-box">普定城投-006 贵州安顺</div>
                            <div className="info-box">
                                <div className="info">
                                    <div className="upInfo">8.5<span className="up-percent">%</span></div>
                                    <div className="downInfo">预期年化收益率</div>
                                </div>
                                <div className="info">
                                    <div className="upInfo">24 <span className="up-percent">个月</span></div>
                                    <div className="downInfo">产品期限</div>
                                </div>
                                <div className="info">
                                    <div className="upInfo">100 <span className="up-percent">万元</span></div>
                                    <div className="downInfo">起投金额</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail">
                    <div>
                        购买金额：
                        <span><InputNumber min={1000000} max={2000000} defaultValue={1000000}  onChange={onChange} /></span>元
                    </div>
                    <div>
                    <Button type="primary">立即投资</Button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}