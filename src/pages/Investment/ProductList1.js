import React, { Component } from 'react';
import { Table, Icon, Divider } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import Nav from  'components/Nav/Nav';

const columns = [{
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '预计年化收益',
    dataIndex: 'expectAmount',
    key: 'expectAmount',
}, {
    title: '产品期限',
    dataIndex: 'commitDate',
    key: 'commitDate',
},{
    title:'起投金额',
    dataIndex:'miniInvestment',
    key:'miniInvestment',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="#">立即投资</a>
        </span>
    ),
}];


export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
        };
    }
    componentDidMount() {
        var self = this;
        axios({
            method: 'get',
            url: '/v1/product/getRecommendProductList',
        }).then(function (response) {
            console.log('成功!', response);
            if (response.status == 200) {
                self.setState({
                    productList: response.data.data,
                });
            }
        }).catch(function (err) {
        });
    }


    render() {
        console.log(this.state.productList);
        return (
            <div>
                <Nav/>
                <Table
                    columns={columns}
                    size="middle"
                    dataSource={this.state.productList} />
            </div>
        )
    }
}
