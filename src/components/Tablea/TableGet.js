import React,{Component} from 'react'
import { Table, Icon, Divider } from 'antd';

const columns = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
}, {
    title: '偿付日期',
    dataIndex: 'time',
    key: 'time',
}, {
    title: '应收金额',
    dataIndex: 'ysmount',
    key: 'ysmount',
}, {
    title: '投资金额',
    dataIndex: 'investMount',
    key: 'investMount',
}, {
    title: '预期收益',
    dataIndex: 'exception',
    key: 'exception',
}];

const data = [{
    key: '1',
    num:'1',
    time: '2018-07-20',
    ysmount: '996.16',
    investMount: '0',
    exception: '996.16',
},{
    key: '2',
    num:'2',
    time: '2018-10-20',
    ysmount: '907.4',
    investMount: '0',
    exception: '907.4',
},{
    key: '3',
    num:'3',
    time: '2019-01-20',
    ysmount: '907.4',
    investMount: '0',
    exception: '907.4',
},
{
    key: '4',
    num:'4',
    time: '2019-04-20',
    ysmount: '887.64',
    investMount: '0',
    exception: '887.64',
},{
    key: '5',
    num:'5',
    time: '2019-07-20',
    ysmount: '897.53',
    investMount: '0',
    exception: '897.53',
},{
    key: '6',
    num:'6',
    time: '2019-10-10',
    ysmount: '50808.77',
    investMount: '50000',
    exception: '808.77',
},{
    key: '7',
    num:'',
    time: '合计',
    ysmount: '55404.93',
    investMount: '50000',
    exception: '5404.93',
}];


class Tablea extends Component {
    render() {
        return (
            <Table columns={columns} dataSource={data}/>
        )
    }
}
export default Tablea;
