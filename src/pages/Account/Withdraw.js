import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import React, {Component} from 'react';
import style from './BindBank.css';
import Nav from 'components/Nav/Nav';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class Withdraw extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    }

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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <div>
                <Nav/>
                <div>
                    <div className="subnav">
                        提现
                    </div>
                    <div className="big">
                        <div className="wrapper">
                            <div className="body">
                                <header className="header">提现</header>
                                <section className="form">
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="可用余额"
                                        >
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="银行卡号"
                                        >
                                            {getFieldDecorator('password', {
                                                rules: [{
                                                    required: true, message: '请输入您的银行卡号!',
                                                }, {
                                                    validator: this.checkConfirm,
                                                }],
                                            })(
                                                <Input type="password" placeholder="请输入储蓄卡卡号"/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="充值金额"
                                        >
                                            {getFieldDecorator('captcha', {
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

const WrappedRegistrationForm = Form.create()(Withdraw);

export default WrappedRegistrationForm;