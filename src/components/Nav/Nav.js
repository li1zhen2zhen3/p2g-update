import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactShow } from 'react-show';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import image9 from '../../pages/MainPage/images/logoPic.png';
import './Nav.css';
class Nav extends Component {
  state = {
    current: '',
    accountId: null
  }
  componentDidMount() {
    var that = this;
    const accountId = sessionStorage.getItem("accountId");
    const accountMobile = sessionStorage.getItem("accountMobile");
    if (accountId != null && accountMobile != null) {
      that.setState({
        accountId: accountId,
        accountMobile: accountMobile
      })
      // if (accountName == null) {
      //   const token = sessionStorage.getItem("token");
      //   fetch('/v1/account/accountInfo?uid=' + accountId + "&token=" + token, {//注册功能的url地址
      //     method: 'GET',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //   })
      //     .then(function (response) {
      //       if (response.ok) {
      //         response.json().then(function (data) {
      //           console.log(data);
      //           if (data.code == 0) {
      //             that.setState({
      //               accountName:data.data.accountName
      //             })
      //             sessionStorage.setItem("accountName",accountName);
      //           }
      //           else {
      //             message.error(data.message);
      //           }
      //         });
      //       }
      //     })
      //     .catch(function (error) {
      //       message.error("未知异常");
      //     })
      // }
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  handleSignOut = () => {
    console.log("sfdsf");
    sessionStorage.removeItem("accountId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("accountMobile");
  }
  render() {
    const { accountId, accountMobile } = this.state;
    return (
      <div className="header-box">
        <div className="contentBox">
          <div className="headd-box">完美伙伴投资平台</div>
          <Menu
            theme="light"
            mode="horizontal"
            onClick={this.handleClick}
            selectedKeys={this.state.current}
            style={{ lineHeight: '40px', float: "right", width: '100%', fontSize: '14px' }}
          >
            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/productlist">理财频道</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/transfer">转让专区</Link></Menu.Item>
            <Menu.Item key="4"><Link to="myaccount">我的账户</Link></Menu.Item>
            <Menu.Item key="5">
              <Link to="/login" style={{ display: accountId == null ? '' : 'none' }}>登陆</Link>
              <a href="/" style={{ display: accountId == null ? 'none' : '' }}>欢迎您 {accountMobile}</a>
            </Menu.Item>
            <Menu.Item key="6" >
              <Link to="/register" style={{ display: accountId == null ? '' : 'none' }}>注册</Link>
              <a href="/login" onClick={this.handleSignOut} style={{ display: accountId == null ? 'none' : '' }}>注销</a>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}

export default Nav;