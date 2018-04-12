import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, InputNumber,message} from 'antd';
import React, {Component} from 'react';
import moment from 'moment';
import './Invest.css';
import NavHeader from 'components/Nav/Nav';

const FormItem = Form.Item;

class Invest extends React.Component {
    state = {
    }
    componentDidMount() {
        var that = this;
        const investValue=sessionStorage.getItem("investValue");
        console.log(investValue);
        that.setState({
            investValue:investValue
        })
        const pid=sessionStorage.getItem("pid");
        const formData = new FormData();
        formData.append('pid', pid);
        // sessionStorage.removeItem("investValue");
        sessionStorage.removeItem("pid");
        fetch('/v1/product/getProductByPId', {//获取首页展示产品列表
            method: 'POST',
            headers: {
            },
            body:formData
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
    handleValueChange = (value) => {
        this.setState({
            investValue:value 
        })
        console.log('changed', value);
      }
    investProduct=(pid,investValue)=>{
        const accountId = sessionStorage.getItem("accountId");
        const token = sessionStorage.getItem("token");
        const formData = new FormData();
        formData.append('pid', pid);
        formData.append('accountId', accountId);
        formData.append('money', investValue);
        formData.append('tpwd', "");
        formData.append('token', token);
        var that = this;
        fetch('/v1/product/investmentProduct', {//获取首页展示产品列表
            method: 'POST',
            headers: {
            },
            body:formData
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
    choice = () => {

    }
   
    render() {
        const {investValue, productDetails } = this.state;
        const { getFieldDecorator} = this.props.form;
        console.log(investValue);
        const formItemLayout = {
            labelCol: {
              xs: { span:4,offset:0},
              sm: { span: 4,offset:0 }
            },
            wrapperCol: {
              xs: { span:  18, offset:1},
              sm: { span: 18, offset:1 }
            }
          };
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
                                <div className="info">
                                    <div className="upInfo">2019年10月09日</div>
                                    <div className="downInfo">到期时间</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail">
                <Form onSubmit={this.handleSubmit} hideRequiredMark style={{width: '50%'}}>
                <FormItem
                  {...formItemLayout}
                  label="购买金额"
                  colon={false}
                >
                  {getFieldDecorator('buyPrice', {
                  initialValue: investValue || '0',
                  rules: [{
                    required: true
                  }]
                })(
                    <InputNumber min={10000} max={20000} onChange={this.handleValueChange} />
                )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="预计到期收益"
                  colon={false}
                >
                  {getFieldDecorator('propal', {
                      initialValue: investValue * productDetails.yield || '0',
                  })(
                    <Input defaultValue={investValue * productDetails.yield} />
                )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="到期时间"
                  colon={false}
                >
                  {getFieldDecorator('expireDate', {
                  initialValue: "2019年10月09日" || '0',
                  rules: [{
                    required: true
                  }, { validator: this.validateAmount }]
                })(
                    <Input defaultValue= "2019年10月09日" />
                )}
                </FormItem>
                <FormItem style={{ textAlign: 'center' }}>
                {getFieldDecorator('agreement',
                { rules: [{ required: true, message: '请勾选按钮' }] })(
                <Checkbox onChange={this.choice}>请您阅读 <a href="">《风险揭示书》</a></Checkbox>
                )}
          </FormItem>
                <FormItem style={{ textAlign: 'center'}}>
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: 93 }}
                    htmlType="submit"
                  >立即支付
                  </Button>
                </FormItem>
              </Form>
                    {/* <div>
                        购买金额：
                        <span><InputNumber min={1000000} max={2000000} defaultValue={investValue}  onChange={this.onChange} /></span>元
                    </div>
                    <div>
                        预计到期收益:
                        <span><InputNumber min={1000000} max={2000000} defaultValue={investValue * productDetails.yield} /></span>元
                    </div>
                    <div>
                        到期时间
                        <span><Input defaultValue= "2019年10月09日" /></span>
                    </div>
                    <div>
                    <Button type="primary" onClick={this.investProduct.bind(this,productDetails.id,investValue)}>立即投资</Button>
                    </div> */}
                </div>
                </div>
            </div>
        )
    }
}
const InvestDemo = Form.create()(Invest);
export default InvestDemo;