import React, { Component } from 'react';
import { Tabs, Layout, Button, Calendar, DatePicker, Table, Row, Col, Modal, message, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.css';
import Nav from '../../components/Nav/Nav';
import history from '../../history';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const { Header, Footer, Sider, Content } = Layout;
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

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

class MyAccount extends Component {
  state = {
    bindStatus: false,
    accountId: sessionStorage.getItem("accountId"),
    token: sessionStorage.getItem("token"),
    visible: false,
    price: 0
  }
  componentDidMount() {
    var that = this;
    const accountId = that.state.accountId;
    const token = that.state.token;
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
      this.getRecord();
      let url = "/v1/account/accountInfo";
      let params = {
        "token": token,
        "uid": accountId
      }
      if (params) {
        let paramsArray = [];
        //拼接参数  
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
        } else {
          url += '&' + paramsArray.join('&')
        }
      }
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      fetch(url, {//注册功能的url地址
        method: 'GET',
        headers: myHeaders,
      })
        .then(function (response) {
          console.log(response);
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              if (data.code == 0) {
                that.setState({
                  AccountBasicInfo: data.data
                })
                console.log(data.data);
              }
              else {
                that.setState({
                  AccountBasicInfo: {}
                })
              }
            })
              .catch(function (error) {
                message.error('未知异常');
              })
          }
        })
        .catch(function (error) {
          message.error('未知异常');
        })
    }
  }
  check = (record) => {
    this.showModal();
    const rid = record.id;
    console.log(rid);
    this.setState({
      rid: rid
    })
  }
  changePrice = (e) => {
    console.log(e.target.value);
    this.setState({
      price: e.target.value
    })
  }
  immediateApply = () => {
    var that = this;
    const accountId = this.state.accountId;
    const token = this.state.token;
    const formData = new FormData();
    formData.append('accountId', accountId);
    formData.append('token', token);
    formData.append('rid', that.state.rid);
    formData.append('price', that.state.price);
    fetch('/v1/transfer/initTransfer', {//注册功能的url地址
      method: 'POST',
      headers: {
      },
      body: formData
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            if (data.code == 0) {
              message.success("发起转让成功");
              history.push("/myaccount");
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
  }
  getRecord=()=>{
    const accountId = this.state.accountId;
    const token = this.state.token;
    var that = this;
      let url = "/v1/inv_record/list";
      let params = {
        "token": token,
        "accountId": accountId
      }
      if (params) {
        let paramsArray = [];
        //拼接参数  
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
        } else {
          url += '&' + paramsArray.join('&')
        }
      }
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      fetch(url, {//注册功能的url地址
        method: 'GET',
        headers: myHeaders,
      })
        .then(function (response) {
          console.log(response);
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              if (data.code == 0) {
                let dataTemp = data.data;
                console.log(dataTemp);
                that.setState({
                  InvRecord: data.data
                })

              }
              else {
                that.setState({
                  InvRecord: {}
                })
              }
            })
              .catch(function (error) {
                message.error('未知异常');
              })
          }
        })
        .catch(function (error) {
          message.error('未知异常');
        })
  }
  callback = (key) => {
    const accountId = this.state.accountId;
    const token = this.state.token;
    if (key == 2) {
      this.getRecord();
    } else if (key == 3) {
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
          message.error('未知异常');
        })
    } else if (key == 4) {
      var that = this;
      const formData = new FormData();
      formData.append('accountId', accountId);
      formData.append('token', token);
      fetch('/v1/account/getInvTransactionInfo', {//注册功能的url地址
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
                  bindStatus: true,
                  bankCard: data.data
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
          message.error('未知异常');
        })
    }else if (key == 5) {
this.getTransferList();
    }
    console.log(key);
  }
  getTransferList=()=>{
    var that=this;
    const formData = new FormData();
    const accountId = sessionStorage.getItem("accountId");
    const token = sessionStorage.getItem("token");
    formData.append('accountId', accountId);
    formData.append('token', token);
    fetch('/v1/transfer/transfer', {//注册功能的url地址
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
                TransList:data.data
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
        message.error('未知异常');
      })
  }
  onPanelChange = (value, mode) => {
    console.log(value, mode);
  }
  onChange = (date, dateString) => {
    console.log(date, dateString);
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
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
    const { bindStatus, fundRecordList, AccountBasicInfo, bankCard, InvRecord,TransList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4, offset: 0 },
        sm: { span: 4, offset: 0 }
      },
      wrapperCol: {
        xs: { span: 18, offset: 1 },
        sm: { span: 18, offset: 1 }
      }
    };    
    const columnsTransfer = [{
      title: '转让时间',
      dataIndex: 'transferDate',
      render: text => < a href=" ">{text}</ a>,
    }, {
      title: '转让产品名称',
      dataIndex: 'name',
    }, {
      title: '金额',
      dataIndex: 'price',
    },{
      title: '转让状态',
      dataIndex: 'status',
    }];
    const columnsFund = [{
      title: '交易时间',
      dataIndex: 'transTime',
      render: text => < a href=" ">{text}</ a>,
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
    const columns = [{
      title: '交易ID',
      key: 'id',
      dataIndex: 'id',
    }, {
      title: '交易时间',
      key: 'orderTime',
      dataIndex: 'orderTime',
    }, {
      title: '产品名称',
      key: 'productName',
      dataIndex: 'productName',
    }, {
      title: '交易金额',
      key: 'investmentAmount',
      dataIndex: 'investmentAmount',
    }, {
      title: '预期收益',
      key: 'exceptEarning',
      dataIndex: 'exceptEarning',
    }, {
      title: '操作',
      dataIndex: 'transOperator',
      render: (text, record) => (
        <div>
          <Form style={{ width: '50%' }}>
            <FormItem style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                size="large"
                style={{ width: '93', marginTop: '15px' }}
                onClick={this.check.bind(this, record)}
              // htmlType="submit"
              >转让
            </Button>
              <Modal
                title="立即支付"
                visible={this.state.visible}
                onOk={this.immediateApply}
                onCancel={this.hideModal}
                okText="确认"
                cancelText="取消"
              >
                <Input value={this.state.price} onChange={this.changePrice} />
              </Modal>
            </FormItem>
          </Form>
        </div>
      )
    }];
    if (AccountBasicInfo === undefined) return null;
    return (
      <div>
        <Nav />
        <div className="mainLeaf1">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="我的投资" key="2">
              <div className="layout">
                <div className="partOne">我的投资</div>
                <div className="myinvestment">
                  <div className="myinvesttop">
                    <span style={{ fontSize: '20px' }}>投资概况</span>
                  </div>
                  <div className="surveyAccountBox"> 
                  <div className="contentBoxxx"> <span>总资产(元)</span><span>{AccountBasicInfo.asset}</span></div>  
                  <div className="contentBoxxx"><span>在投资金(元)</span> <span>{AccountBasicInfo.investAmount}</span></div>                
                  <div className="contentBoxxx"><span>投资金额(元)</span><span>{AccountBasicInfo.totalInvestment}</span></div> 
                  <div className="contentBoxxx"><span>已收收益(元)</span><span>{AccountBasicInfo.totalProfit}</span></div> 
                  </div>
                </div>
                <div className="myinvestment" style={{ height: 'auto' }}>
                  <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="投资记录" key="1">
                      <Table rowKey="id" columns={columns} dataSource={InvRecord} style={{ marginTop: '30px' }} />
                    </TabPane>
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
                      <div style={{ fontSize: '25px' }}>{AccountBasicInfo.asset/100}</div>
                    </div>
                    <div>
                      <div>可用余额(元)</div>
                      <div style={{ fontSize: '25px' }}>{AccountBasicInfo.asset/100 - AccountBasicInfo.investAmount/100}</div>
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
                  <Table columns={columnsFund} dataSource={data} style={{ marginTop: '30px' }} />
                </div>
              </div>
            </TabPane>
            <TabPane tab="账户设置" key="4">
              <div className="myinvesttop">
                <span style={{ fontSize: '20px' }}>我的账户</span>
                <Tabs defaultActiveKey="11">
                  <TabPane tab="身份认证" key="11">
                    <div className="layout">
                      <div className="myinvestment">
                        <div className="myinvesttop">
                          <span style={{ fontSize: '18px' }}>银行存管账户</span>
                          <span style={{ marginLeft: '10px' }}>(资金第三方保全认证，保障您的资金安全，核实您的有效身份。)</span>
                          <span style={{ float: 'right' }}> {bindStatus ? "已开通" : "未开通"}</span>
                        </div>

                        <div style={{ display: bindStatus ? '' : 'none' }}>
                          <Row style={{marginBottom :'15px'}}>
                            <Col span={4} offset={1}>银行卡号：</Col>
                            <Col span={6}>{bankCard}</Col>
                          </Row>
                          <Row style={{marginBottom :'15px'}}>
                            <Col span={4} offset={1}>持卡人：</Col>
                            <Col span={6}>{AccountBasicInfo.name}</Col>
                          </Row>
                          <Row style={{marginBottom :'15px'}}>
                            <Col span={4} offset={1}>证件号码：</Col>
                            <Col span={6}>{AccountBasicInfo.identityCard}</Col>
                          </Row>
                          <Row style={{marginBottom :'15px'}}>
                            <Col span={4} offset={1}>银行卡状态：</Col>
                            <Col span={6}>已绑定 <a onClick={this.handleUnBund}>解绑</a></Col>
                          </Row>
                        </div>
                        <div style={{ marginTop: '50px', marginLeft: '15px', display: bindStatus ? 'none' : '' }}>
                          <Button type="primary" size="large" style={{ width: '200px' }}><Link to="/bindbank">绑定银行卡</Link></Button>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  {/* <TabPane tab="密码管理" key="22"> */}
                  {/* </TabPane> */}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="我的转让" key="5">
            <div style={{width:"80%"}}>
            <Table  columns={columnsTransfer} dataSource={TransList} style={{ marginTop: '30px' }} />
            </div>
            </TabPane>
          </Tabs>
        </div>
      </div >
    );
  }
}
const MyAccountDemo = Form.create()(MyAccount);
export default MyAccountDemo;