import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactShow } from 'react-show';
import { Layout, Menu, Breadcrumb } from 'antd';
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
        <Menu
          theme="light"
          mode="horizontal"
          onClick={this.handleClick}
          selectedKeys={this.state.current}
          style={{ lineHeight: '40px', float: "right" }}
        >
          <Menu.Item key="1"><Link to="/register">注册</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/login">登录</Link></Menu.Item>
          <Menu.Item key="3">消息</Menu.Item>
          <Menu.Item key="4">关于我们</Menu.Item>
          <Menu.Item key="5">安全保障</Menu.Item>
          <Menu.Item key="6">商务合作</Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Nav;