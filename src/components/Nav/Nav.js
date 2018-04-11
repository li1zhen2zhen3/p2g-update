import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactShow } from 'react-show';
import { Layout, Menu, Breadcrumb } from 'antd';
import image9 from '../../pages/MainPage/images/logoPic.png';
import './Nav.css';
class Nav extends Component {
  state = {
    current: '',
    accountId:null
  }
  componentDidMount() {
    var that = this;
    const accountId = sessionStorage.getItem("accountId");
    if (accountId != null) {
      that.setState({
        accountId: accountId
      })
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    const { accountId } = this.state;
    return (
      <div className="header-box">
        <div className="contentBox">
          <div className="headd-box">完美伙伴投资平台</div>
        <Menu
          theme="light"
          mode="horizontal"
          onClick={this.handleClick}
          selectedKeys={this.state.current}
          style={{ lineHeight: '40px', float: "right",width:'100%',fontSize: '17px' }}
        >
          <Menu.Item key="1"><Link to="/register">注册</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/login">登录</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/">首页</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/productlist">理财频道</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/transfer">转让专区</Link></Menu.Item>
          <Menu.Item key="6"><Link to="myaccount">我的账户</Link></Menu.Item>
        </Menu>
        </div>
      </div>
    )
  }
}

export default Nav;