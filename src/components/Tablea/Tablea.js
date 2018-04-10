import React,{Component} from 'react'
import { Table, Icon, Divider } from 'antd';

const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
}, {
    title: '投资人',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '投资金额',
    dataIndex: 'mount',
    key: 'mount',
}, {
    title: '投资时间',
    dataIndex: 'time',
    key: 'time',
}, {
    title: '状态',
    dataIndex: 'action',
    key: 'action',
}];

const data = [{
    key: '1',
    num:'1',
    name: '1*********3',
    mount: '￥50000.00',
    time: '2018-04-10 11:05:53',
    action: '成功',
}, {
    key: '2',
    num:'2',
    name: '1*********9',
    mount: '￥50000.00',
    time: '2018-04-10 10:35:01',
    action: '成功',
}, {
    key: '3',
    num:'3',
    name: '1*********6',
    mount:  '￥70000.00',
    time: '2018-04-10 10:10:48',
    action: '成功',
}];


class Tablea extends Component {
    render() {
        return (
            <Table columns={columns} dataSource={data}/>
        )
    }
}
export default Tablea;
