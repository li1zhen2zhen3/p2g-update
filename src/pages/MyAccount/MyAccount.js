import React, { Component } from 'react';
import { Tabs, Layout, Button, Calendar, DatePicker, Table, Row, Col, Modal,message } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.css';
import Nav from '../../components/Nav/Nav';
import history from '../../history';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const { Header, Footer, Sider, Content } = Layout;
const RangePicker = DatePicker.RangePicker;
const columns = [{
  title: '交易时间',
  dataIndex: 'transTime',
  render: text => <a href="#">{text}</a>,
}, {
  title: '交易名称',
  dataIndex: 'transName',
}, {
  title: '交易金额',
  dataIndex: 'transPrice',
}, {
  title: '状态',
  dataIndex: 'transStatus',
}, {
  title: '操作',
  dataIndex: 'transOperator',
}];
const data = [{
  key: '1',
  transTime: '2018-01-02',
  transName: '李珍珍',
  transPrice: 32,
  transStatus: '已成交',
  transOperator: '交易成功'
}, {
  key: '2',
  transTime: '2018-03-28',
  transName: '谢悦芸',
  transPrice: 1000,
  transStatus: '交易中',
  transOperator: '交易'
}, {
  key: '3',
  transTime: '2018-04-02',
  transName: '刘明美',
  transPrice: 800,
  transStatus: '待成交',
  transOperator: '审核中'
}];

export default class MyAccount extends Component {
  state = {
    bindStatus:true
  }
  componentDidMount() {
    var that = this;
    const accountId = sessionStorage.getItem("accountId");
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (accountId == null || token == null) {
      confirm({
        title: '未登录',
        content: '未登录，现在去登陆？',
        onOk() {
          history.push("/login");
        }
      });
    }
    else {
      // const formData = new FormData();
      // formData.append('accountId', accountId);
      // formData.append('token', token);      
      fetch(`/v1/inv_basic?token=${token}&accountId=${accountId}`, {//注册功能的url地址
        method: 'GET',
        headers: {
        },
      })
        .then(function (response) {
          console.log(response);
          if (response.ok) {
            // response.json().then(function (data) {
            //   console.log(data);
            //   if (data.code == 0) {
            //     that.setState({
            //       AccountBasicInfo:data.data
            //     })                
            //     console.log(data.data);
            //   }
            //   else {
            //     that.setState({
            //       AccountBasicInfo:{}
            //     }) 
            //   }
            // })
            // .catch(function (error) {
            //   message.error('未知异常');
            // })

            that.setState({
                    AccountBasicInfo:{}
                  })
          }
        })
        .catch(function (error) {
          message.error('未知异常');
        })
    }
  }
  callback = (key) => {
    if (key == 3) {
      var that = this;
      const formData = new FormData();
      formData.append('uid', accountId);
      formData.append('token', token);
      formData.append('pageNo', 0);
      formData.append('numPerPage', 10);
      fetch('/v1/account/fundRecord', {//注册功能的url地址
        method: 'POST',
        headers: {
        },
        body: formData
      })
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              if (data.code == 0) {
                that.setState({
                  fundRecordList: data.data
                })
                console.log(data.data);
              }
              else {
                message.error(data.message);
              }
            });
          }
        })
        .catch(function (error) {
          message.error('注册失败');
        })
    }
    console.log(key);
  }
  onPanelChange = (value, mode) => {
    console.log(value, mode);
  }
  onChange = (date, dateString) => {
    console.log(date, dateString);
  }
  handleUnBund = () => {
    confirm({
      title: '警告',
      content: '确定解绑吗？',
      onOk() {
        const formData = new FormData();
        const accountId = sessionStorage.getItem("accountId");
        const token = sessionStorage.getItem("token");
        formData.append('uid', accountId);
        formData.append('token', token);
        fetch('/v1/account/unbunding', {//注册功能的url地址
          method: 'POST',
          headers: {
          },
          body: formData
        })
          .then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
                console.log(data);
                if (data.code == 0) {
                  console.log(data.data);
                  message.success("解绑成功");
                  history.push("myaccount");
                }
                else {
                  message.error(data.message);
                }
              });
            }
          })
          .catch(function (error) {
            message.error('未知异常');
          })
      },
      onCancel() { }
    });
  }
  render() {
    const {bindStatus, fundRecordList,AccountBasicInfo } = this.state;
    if (AccountBasicInfo === undefined) return null;
    return (
      <div>
        <Nav />
        <div className="mainLeaf1">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="账户纵览" key="1">
              <div className="layout">
                <div className="myinvestment">
                  <div className="myinvesttop">
                    <span style={{ fontSize: '20px' }}>我的投资</span>
                    <span style={{ marginLeft: '10px' }}>总资产 = 在投资金 + 可用余额 + 待收收益</span>
                    <span style={{ float: 'right' }}> >查看我的投资</span>
                  </div>
                  <div className="content">
                    <span>总资产(元)</span>
                    <span>在投资金(元)</span>
                    <span>已收收益(元)</span>
                    <span>代收收益(元)</span>
                  </div>
                  <div className="content" style={{ fontSize: '25px' }}>
                    <span>{AccountBasicInfo.asset?AccountBasicInfo.asset:0}</span>
                    <span>{AccountBasicInfo.asset?AccountBasicInfo.asset:0}</span>
                    <span>{AccountBasicInfo.asset?AccountBasicInfo.asset:0}</span>
                    <span>{AccountBasicInfo.asset?AccountBasicInfo.asset:0}</span>
                  </div>
                </div>               
              </div>
              <div className="myinvestment">
                <div className="myinvesttop">
                  <span style={{ fontSize: '20px' }}>账户资金</span>
                  <span style={{ float: 'right' }}> >查看资金记录</span>
                </div>
                <div className="contentTwo">
                  <div>
                    <div>可用余额(元)</div>
                    <div style={{ fontSize: '25px' }}>{AccountBasicInfo.asset-AccountBasicInfo.totalInvestment}</div>
                  </div>
                  <div>
                    <Button type="primary" size="large" style={{ width: '100px' }}>充值</Button>
                    <Button type="default" size="large" style={{ marginLeft: '20px', width: '100px' }}>提现</Button>
                  </div>
                </div>
              </div>
              <div className="myinvestment" style={{ height: '500px' }}>
                <div className="myinvesttop">
                  <span style={{ fontSize: '20px' }}>回款计划</span>
                  <span style={{ marginLeft: '10px' }}>下次回款日期无，回款金额0元</span>
                </div>
                <div className="content">
                  <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
                  </div>
                </div>
              </div>
              <div className="myinvestment">
                <div className="myinvesttop">
                  <span style={{ fontSize: '20px' }}>专享推荐 | 特惠推荐</span>
                  <span style={{ float: 'right' }}> >更多</span>
                </div>
                <div className="content" style={{ fontSize: '20px' }}>
                  <span>华坪改造-010</span>
                  <span>8.5%</span>
                  <span>20 万元</span>
                  <span>731天</span>
                  <span>国企(AA)担保</span>
                </div>
                <div className="content">
                  <span>剩余金额： 300万</span>
                  <span>预期年化收益率</span>
                  <span>最低投资金额</span>
                  <span>产品期限</span>
                  <span>增信措施</span>
                </div>
              </div>
            </TabPane>
            <TabPane tab="我的投资" key="2">
              <div className="layout">
                <div className="partOne">我的投资</div>
                <div className="myinvestment">
                  <div className="myinvesttop">
                    <span style={{ fontSize: '20px' }}>投资概况</span>
                  </div>
                  <div className="content">
                    <span>投资金额(元)</span>
                    <span>已收收益(元)</span>                    
                  </div>
                  <div className="content" style={{ fontSize: '25px' }}>
                    <span>{AccountBasicInfo.totalInvestment}</span>
                    <span>{AccountBasicInfo.totalProfit}</span>                   
                  </div>
                </div>
                <div className="myinvestment" style={{ height: '500px' }}>
                  <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="持有中" key="1">选项卡一内容</TabPane>
                    <TabPane tab="募集中" key="2">选项卡二内容</TabPane>
                    <TabPane tab="已结清" key="3">选项卡三内容</TabPane>
                    <TabPane tab="已转让" key="4">选项卡三内容</TabPane>
                    <TabPane tab="未完成" key="5">选项卡三内容</TabPane>
                  </Tabs>
                </div>
              </div>
            </TabPane>
            <TabPane tab="资金管理" key="3">
              <div className="layout">
                <div className="partOne">资金管理</div>
                <div className="myinvestment">
                  <div className="myinvesttop">
                    <span style={{ fontSize: '20px' }}>我的账户</span>
                  </div>
                  <div className="contentTwo">
                    <div>
                      <div>总资产(元)</div>
                      <div style={{ fontSize: '25px' }}>2.00</div>
                    </div>
                    <div>
                      <div>可用余额(元)</div>
                      <div style={{ fontSize: '25px' }}>2.00</div>
                    </div>
                    <div>
                      <Button type="primary" size="large" style={{ width: '100px' }}><Link to="/pay">充值</Link></Button>
                      <Button type="default" size="large" style={{ marginLeft: '20px', width: '100px' }}><Link to="/withdraw">提现</Link></Button>
                    </div>
                  </div>
                </div>
                <div className="myinvestment" style={{ height: '500px' }}>
                  <div className="searchInvest">
                    <label>交易时间：</label>
                    <RangePicker onChange={this.onChange} />
                    <Button>最近一周</Button>
                    <Button>最近一月</Button>
                    <Button>本年内</Button>
                  </div>
                  <div className="searchInvest">
                    <label>交易类型：</label>
                    <Button>所有记录</Button>
                    <Button>充值记录</Button>
                    <Button>提现记录</Button>
                    <Button>购买记录</Button>
                    <Button>收益记录</Button>
                  </div>
                  <Table columns={columns} dataSource={data} style={{ marginTop: '30px' }} />
                </div>
              </div>
            </TabPane>
            <TabPane tab="消息中心" key="4">资金管理</TabPane>
            <TabPane tab="账户设置" key="5">
              <div className="myinvesttop">
                <span style={{ fontSize: '20px' }}>我的账户</span>
                <Tabs defaultActiveKey="11">
                  <TabPane tab="身份认证" key="11">
                    <div className="layout">
                      <div className="myinvestment">
                        <div className="myinvesttop">
                          <span style={{ fontSize: '18px' }}>银行存管账户</span>
                          <span style={{ marginLeft: '10px' }}>(资金第三方保全认证，保障您的资金安全，核实您的有效身份。)</span>
                          <span style={{ float: 'right' }}> {bindStatus?"已开通":"未开通"}</span>
                        </div>

                        <div style={{display:bindStatus?'':'none'}}>
                          <Row>
                            <Col span={12}>银行卡号：</Col>
                            <Col span={12}>62284783898202885171</Col>
                          </Row>
                          <Row>
                            <Col span={12}>持卡人：</Col>
                            <Col span={12}>李珍珍</Col>
                          </Row>
                          <Row>
                            <Col span={12}>证件号码：</Col>
                            <Col span={12}>411627199402017655</Col>
                          </Row>
                          <Row>
                            <Col span={12}>银行卡状态：</Col>
                            <Col span={12}>已绑定 <a onClick={this.handleUnBund}>解绑</a></Col>
                          </Row>
                        </div>
                        <div style={{marginTop:'50px',marginLeft:'15px',display:bindStatus?'none':''}}>
                        <Button type="primary" size="large" style={{ width: '200px' }}><Link to="/pay">绑定银行卡</Link></Button>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="密码管理" key="22">
                  </TabPane>
                </Tabs>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div >
    );
  }
}