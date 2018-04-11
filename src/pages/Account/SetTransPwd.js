import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import history from '../../history';
import { saveState, fetchState } from '../../store';
import './Login.css';
import Nav from 'components/Nav/Nav';


const FormItem = Form.Item;

class SetTransPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            password: ""
        }
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
        const remember=values.remember;
        const formData = new FormData();
        formData.append('account', values.userName);
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
                        sessionStorage.setItem("accountId",data.data.accountId);
                        sessionStorage.setItem("token",data.data.token);
                        history.push('/');
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
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 }
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 }
            }
          };
        return (
            <div>
                <Nav />
                <div className="loginClass">
                    <div className="wrapper">
                        <div className="body">
                            <header className="headerOne">设置交易密码界面</header>
                            <section className="form">
                            <Form onSubmit={this.handleSubmit} >
                            <FormItem
                            {...formItemLayout}
                            label="手机号码"
                            >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入手机号码!' }]
                            })(
                                <Input placeholder="请输入手机号码" />
                            )}
                            </FormItem>
                            <FormItem
                            {...formItemLayout}
                            label="交易密码"
                            >
                            {getFieldDecorator('transPwd', {
                                rules: [{ required: true, message: '请输入交易密码!' }]
                            })(
                                <Input placeholder="请填写交易密码" />
                            )}
                            </FormItem>
                            <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            >
                            {getFieldDecorator('transConfirmPwd', {
                                rules: [{ required: true, message: '请输入确认密码!' }]
                            })(
                                <Input placeholder="请再次填写密码" />
                            )}
                            </FormItem>
                            <FormItem style={{ textAlign: 'center' }}>
                                <Button
                                type="primary"
                                size="large"
                                style={{ width: 79 }}
                                onClick={this.handleSubmit}
                                style={{background:'red'}}
                                >提交
                                </Button>
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

SetTransPwd = Form.create()(SetTransPwd);

export default SetTransPwd;