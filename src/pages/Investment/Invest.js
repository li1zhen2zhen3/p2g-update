import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import React, {Component} from 'react';
import style from './Invest.css';
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
            pid:values.pid,
            money:values.money
        }
        fetch('/v1/product/investmentProduct',{
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
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
                    <div className="subnav">
                        投资
                    </div>
                    <div className="big">
                        <div className="wrapper">
                            <div className="body">
                                <section className="form">
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormItem {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit">确认投资</Button>
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