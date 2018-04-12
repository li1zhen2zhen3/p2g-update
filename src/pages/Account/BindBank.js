import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message} from 'antd';
import React, {Component} from 'react';
import history from '../../history';
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

class ForgetPassword extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const formData = new FormData();
                formData.append('uid', sessionStorage.getItem('accountId'));
                formData.append('bankAccount', values.bankCard);
                formData.append('bankDeposit', values.openBank);
                formData.append('reservedTelephone', values.phone);
                formData.append('realName', values.realName);
                formData.append('idCard', values.idCard);
                formData.append('token', sessionStorage.getItem('token'));
                fetch('/v1/account/cardBinding', {
                    method: 'POST',
                    headers: {
                    },
                    body: formData//传入参数
                })
                    .then(function (response) {
                        response.json().then(function (data) {
                            if (data.code == 0) {
                               message.success("绑定银行卡成功");
                                history.push('/setPwd'); 
                            }
                            else {
                                message.error(data.message);
                            }
                        });
                    })
                    .catch(function (error) {
                        message.error('绑定银行卡失败');
                    })
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
                    offset:  8,
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
                <div className="big1">
                    <div className="wrapper1">
                        <div className="body1">
                            <header className="header1">绑定银行卡</header>
                            <section className="form1">
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="真实姓名"
                                    >
                                        {getFieldDecorator('realName', {
                                            rules: [{required: true, message: '请输入您的真实姓名!'}],
                                        })(
                                            <Input  placeholder="请输入您的真实姓名"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="身份证号"
                                    >
                                        {getFieldDecorator('idCard', {
                                            rules: [{
                                                required: true, message: '请输入您的身份证号码!',
                                            }],
                                        })(
                                            <Input  onBlur={this.handleConfirmBlur} placeholder="请输入您的身份证号码"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="预留手机号码"
                                    >
                                        {getFieldDecorator('phone', {
                                            rules: [{required: true, message: '请输入您的手机号码!'}],
                                        })(
                                            <Input  placeholder="请输入您的手机号码"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="银行卡号"
                                    >
                                        {getFieldDecorator('bankCard', {
                                            rules: [{
                                                required: true, message: '请输入您的银行卡号!',
                                            }],
                                        })(
                                            <Input placeholder="请输入储蓄卡卡号"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="开户行"
                                    >
                                        {getFieldDecorator('openBank', {
                                            rules: [{
                                                required: true, message: '请输入开户行!',
                                            }],
                                        })(
                                            <Input  placeholder="请输入开户行"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">确认绑定</Button>
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

const WrappedRegistrationForm = Form.create()(ForgetPassword);

export default WrappedRegistrationForm;