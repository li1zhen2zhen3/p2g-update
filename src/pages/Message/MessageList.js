import React, { Component } from 'react';
import { Card, Collapse, Pagination, Badge, Icon } from 'antd';
import styles from './style.css';
import NavHeader from 'components/Nav/Nav';


const Panel = Collapse.Panel;

export default class List extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount() {
    var that = this;
    const accountId = sessionStorage.getItem("accountId");
    const token = sessionStorage.getItem("token");
    // fetch(`/v1/message/messageList`, {//注册功能的url地址
    //   method: 'GET',
    //   headers: {
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     if (response.ok) {
    //       response.json().then(function (data) {
    //         console.log(data);
    //         if (data.code == 0) {
    //           that.setState({
    //             AccountBasicInfo:data.data
    //           })                
    //           console.log(data.data);
    //         }
    //         else {
    //           that.setState({
    //             AccountBasicInfo:{}
    //           }) 
    //         }
    //       })
    //       .catch(function (error) {
    //         message.error('未知异常');
    //       })
    //     }
    //   }
    // }
  }
  // 标记已读状态
  callback = (key) => {
    console.log(key);
  }
  render() {
    return (
      <div>
        <NavHeader/>
        <div className="big">
        <Card title="消息中心" bordered={false}>
            <React.Fragment>
            <Collapse onChange={this.callback}>
              
              <Panel header="优惠券即将失效" key="2">
                <p>您好，您账户内的一张300.00元现金券即将失效（有效期至：2018年01月24日）,请您尽快使用。感谢您对我们的关注与支持。</p>
              </Panel>
              <Panel header="提现成功" key="3">
                <p>您于2017年12月02日 20:45:38提交的5,041.67元提现申请已汇款成功，请您注意查收。感谢您对我们的关注和支持！</p>
              </Panel>
              <Panel header="充值成功" key="4">
                <p>您于2017年11月04日 12:44:45提交的1000000元充值成功，请您查看您的账户。感谢您对我们的关注和支持！</p>
              </Panel>
              <Panel header="交易成功" key="5">
                <p>您已成功投资德清湿地项目！</p>
              </Panel>
              <Panel header="系统维护通知" key="6">
                <p>很抱歉，本平台需要进行紧急维护，充值和提现功能现已暂停。预计维护时间 4 小时，预计恢复时刻，北京时间 2017 年 9 月 5日 11:00。维护完成后将恢复充值提现服务。</p>
              </Panel>
              <Panel header="欢迎加入完美伙伴投资平台" key="1">
                <p>恭喜您注册成功，加入完美伙伴。完美伙伴投资平台将为您提供安全稳健的产品，和诚挚的服务。</p>
              </Panel>
              
            </Collapse>
            </React.Fragment>
            <Pagination
              className="page"
              defaultCurrent={1}
              pageSize={10}
              total={10}
            />
        </Card>
        </div>
      </div>
    );
  }
}
