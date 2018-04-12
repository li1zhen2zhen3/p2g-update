import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import history from '../../history';
import { saveState, fetchState } from '../../store';
import './SetTransPwd.css';
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
        formData.append('uid',sessionStorage.getItem('accountId'));
        formData.append('transactionPassword', values.transPwd);
        formData.append('token', sessionStorage.getItem('token'));
        fetch('/v1/account/setTransPWD', {//注册功能的url地址
            method: 'POST',
            headers: {
            },
            body: formData//传入参数
        })
            .then(function (response) {
                response.json().then(function (data) {
                    if (data.code == 0) {
                        message.success('交易密码设置成功');
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
                <div className="loginClass4">
                    <div className="wrapper4">
                        <div className="body4">
                            <header className="headerOne4">设置交易密码界面</header>
                            <section className="form4">
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
                                <Input type="password" placeholder="请填写交易密码" />
                            )}
                            </FormItem>
                            <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            >
                            {getFieldDecorator('transConfirmPwd', {
                                rules: [{ required: true, message: '请输入确认密码!' }]
                            })(
                                <Input type="password" placeholder="请再次填写密码" />
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