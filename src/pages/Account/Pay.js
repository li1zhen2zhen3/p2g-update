import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import React, {Component} from 'react';
import style from './BindBank.css';
import Nav from 'components/Nav/Nav';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Pay extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.handleClick(values);
            }
        });
    }
    handleClick(values){
        let data = {
            uid:values.bankcard,
            money:values.money
        }
        fetch('/v1/account/recharge',{//注册功能的url地址
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)//传入参数
        })
            .then(function(data){
                console.log('request succeesed with json response',data)
            })
            .catch(function(error){
                console.log('request failed',error)
            })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                //输入框距离左边的距离
                sm: {span: 9},
            },
            wrapperCol: {
                xs: {span: 24},
                //输入框的长度
                sm: {span: 15},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
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
                    <div className="big">
                        <div className="wrapper">
                            <div className="body">
                                <header className="header">充值</header>
                                <section className="form">
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="银行卡号"
                                        >
                                            {getFieldDecorator('bankcard', {
                                                rules: [{
                                                    required: true, message: '请输入您的银行卡号!',
                                                }],
                                            })(
                                                <Input type="password" placeholder="请输入储蓄卡卡号"/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="充值金额"
                                        >
                                            {getFieldDecorator('money', {
                                                rules: [{required: true, message: '请输入您需要充值的金额!'}],
                                            })(
                                                <Input placeholder="请输入充值金额"/>
                                            )}
                                        </FormItem>
                                        <FormItem {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit">充值</Button>
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

const WrappedRegistrationForm = Form.create()(Pay);

export default WrappedRegistrationForm;