import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message} from 'antd';
import React, {Component} from 'react';
import history from '../../history';
import style from './Widthdraw.css';
import Nav from 'components/Nav/Nav';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Withdraw extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.handleClick(values);
            }
        });
    }
    handleClick(values){
        const formData = new FormData();
        formData.append('uid',sessionStorage.getItem('accountId'));
        formData.append('transaction-password',values.transPwd);
        formData.append('money', values.money);
        formData.append('token',sessionStorage.getItem('token'));
        fetch('/v1/account/withdrawDeposit',{//注册功能的url地址
            method:'POST',
            headers: {
            },
            body:formData//传入参数
        })
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                if (data.code == 0) {
                    message.success("提现成功");
                    history.push('/myaccount');
                }
                else {
                    message.error(data.message);
                }
            });
        })
        .catch(function (error) {
            message.error('未知异常');
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                //输入框距离左边的距离
                sm: {span: 4,offset:6},
            },
            wrapperCol: {
                xs: {span: 24},
                //输入框的长度
                sm: {span: 6},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 21,
                    offset: 3,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div>
                <Nav/>
                <div>
                    {/* <div className="subnav">
                        充值
                    </div> */}
                    <div className="big6">
                        <div className="wrapper6">
                            <div className="body6">
                                <header className="headerOne6">提现</header>
                                <section className="form6">
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="用户交易密码"
                                        >
                                            {getFieldDecorator('transPwd', {
                                                rules: [{
                                                    required: true, message: '请输入交易密码!',
                                                }],
                                            })(
                                                <Input type="password" placeholder="请输入交易密码"/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="提现金额"
                                        >
                                            {getFieldDecorator('money', {
                                                rules: [{required: true, message: '请输入您需要提现的金额!'}],
                                            })(
                                                <Input placeholder="请输入提现金额（精确到分"/>
                                            )}
                                        </FormItem>
                                        <FormItem {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit" className="login-form-button6" style={{marginLeft:'90px'}}>提现</Button>
                                        </FormItem>
                                    </Form>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(Withdraw);

export default WrappedRegistrationForm;