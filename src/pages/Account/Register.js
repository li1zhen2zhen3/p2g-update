import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
import React, { Component } from 'react';
import history from '../../history';
import style from './Register.css';
import Nav from 'components/Nav/Nav';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
            password: "",
            mobile: "",
            roleCode: 0,
            verifyCode: '',
            validatationCodeToken: ''
        }
    }
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
                this.setState({
                    mobile: values.phone
                });
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    getVerifyCode = () => {
        const { mobile } = this.state;
        const data = {
            mobile: mobile
        };
        fetch('/v1/account/sendMessage', {//注册功能的url地址
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)//传入参数
        })
            .then(function (data) {
                console.log('验证码获取成功', data)
            })
            .catch(function (error) {
                message.error('获取验证码失败');
                console.log('request failed', error)
            })
    }

    handleClick(values) {
        let that = this;
        const { roleCode, validatationCodeToken } = this.state;
        const formData = new FormData();
        formData.append('accountName', values.accountName);
        formData.append('password', values.password);
        formData.append('mobile', values.mobile);
        formData.append('roleCode', 0);
        formData.append('varifyCode', values.captcha);
        formData.append('validatationCodeToken', validatationCodeToken);
        // let data = {
        //     "accountName":values.nickname,
        //     "password":values.password,
        //     "mobile":values.phone,//注册时传入的参数
        //     "roleCode": roleCode,
        //     "varifyCode": values.captcha,
        //     "validatationCodeToken":validatationCodeToken 
        // }

        fetch('/v1/account/inv/register', {//注册功能的url地址
            method: 'POST',
            headers: {
                // 'Accept ':'application/json',
                // 'Content-Type':'application/json'
            },
            // body:JSON.stringify(data)//传入参数
            body: formData
        })
            .then(function (response) {
                response.json().then(function (data) {
                    console.log(data);
                    if (data.code == 0) {
                        history.push('/login');
                    }
                    else {
                        message.error(data.message);
                    }
                });
            })
            .catch(function (error) {
                message.error('注册失败');
            })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                //输入框距离左边的距离
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                //输入框的长度
                sm: { span: 15 },
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
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );


        return (
            <div>
                <Nav />
                <div className="wrapperBox">
                    <div className="bodyBox">
                        <header className="headerOneBox">注册</header>
                        <section className="formBox">
                            <Form onSubmit={this.handleSubmit}>

                                <FormItem
                                    {...formItemLayout}
                                    label={(
                                        <span>
                                            用户名&nbsp;
                                        <Tooltip title="你想要别人如何称呼你?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator('nickname', {
                                        rules: [{ required: true, message: '请输入您的用户名!', whitespace: true }],
                                    })(
                                        <Input name="accountName" placeholder="3-9个字符，可使用字母、数字、下划线" />
                                    )}
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="手机号码"
                                >
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: '请输入您的手机号码!' }],
                                    })(
                                        <Input name="phone" placeholder="请输入11位手机号码" />
                                    )}
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="验证码"
                                >
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            {getFieldDecorator('captcha', {
                                                rules: [{ required: true, message: '请输入您收到的验证码!' }],
                                            })(
                                                <Input name="verifyCode" placeholder="请输入验证码" />
                                            )}
                                        </Col>
                                        <Col span={12}>
                                            <Button onClick={this.getVerifyCode}>发送验证码</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="设置密码"
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: '请输入您的密码!',
                                        }, {
                                            validator: this.checkConfirm,
                                        }],
                                    })(
                                        <Input type="password" name="password" placeholder="8-20位，必须含有字母，数字" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="确认密码"
                                >
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: '请再次输入您的密码!',
                                        }, {
                                            validator: this.checkPassword,
                                        }],
                                    })(
                                        <Input type="password" onBlur={this.handleConfirmBlur} placeholder="再输入一次密码" />
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    {getFieldDecorator('agreement', {
                                        valuePropName: 'checked',
                                    })(
                                        <Checkbox>我已阅读并同意 <a href="">《用户协议》</a></Checkbox>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">立即注册</Button>
                                </FormItem>
                            </Form>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(Register);

export default WrappedRegistrationForm;