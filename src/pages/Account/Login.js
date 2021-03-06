import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import history from '../../history';
import { saveState, fetchState } from '../../store';
import './Login.css';
import Nav from 'components/Nav/Nav';


const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: ""
        }
    }
    getBankAccount = () => {
        const formData = new FormData(); 
        formData.append('accountId',sessionStorage.getItem('accountId'));
        formData.append('token',sessionStorage.getItem('token'));
        fetch('/v1/account/getInvTransactionInfo', {//注册功能的url地址
            method: 'POST',
            headers: {
            },
            body: formData//传入参数
        })
            .then(function (response) {
                response.json().then(function (data) {
                    if (data.code == 0) {
                        history.push('/');                                                
                    }
                    else {
                        history.push('/bindbank');
                        
                    }
                });
            })
            .catch(function (error) {
                message.error('未知异常');
            })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.handleClick(values);
            }
        });
    }

    handleClick(values) {
        const that = this;
        const remember=values.remember;
        const accountMobile=values.userName;
        const formData = new FormData();
        formData.append('mobile', accountMobile);
        formData.append('password', values.password);
        fetch('/v1/account/inv/login', {//注册功能的url地址
            method: 'POST',
            headers: {
            },
            body: formData//传入参数
        })
            .then(function (response) {
                response.json().then(function (data) {
                    if (data.code == 0) {
                        sessionStorage.setItem("accountMobile",accountMobile);
                        sessionStorage.setItem("accountId",data.data.accountId);
                        sessionStorage.setItem("token",data.data.token);
                        that.getBankAccount();
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Nav />
                <div className="loginClass3">
                    <div className="wrapper3">
                        <div className="body3">
                            <header className="headerOne3">用户登录界面</header>
                            <section className="form3">
                                <Form onSubmit={this.handleSubmit} className="login-form3">
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="Username" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入您的密码!' }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password" placeholder="请输入密码" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>记住密码</Checkbox>
                                        )}
                                        <a className="login-form-forgot3" href="/forgetpassword">忘记密码</a>
                                        <Button type="primary" htmlType="submit" className="login-form-button3" >
                                            登录
                                    </Button>
                                        Or <a href="/register">立即注册!</a>
                                    </FormItem>
                                </Form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Login = Form.create()(Login);

export default Login;