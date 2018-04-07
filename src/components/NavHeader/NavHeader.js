import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import '../../pages/MainPage/MainPage.css';
import image9 from '../../pages/MainPage/images/logoPic.png';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class NavHeader extends Component {
    state = {
        current: '1',
      }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }
    render(){
        return (
          <div>
            <div className="contentBox">
              <div className="test-box"> <img  src={image9}/></div>
            <div>
              <Menu className="menu"
               onClick={this.handleClick}
               selectedKeys={[this.state.current]}
               mode="horizontal"
               style={{border: '0'}}
              >
                <Menu.Item key="1">
                  <Icon type="mail" />首页
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="appstore" />理财频道
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="mail" />转让专区
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="mail" />我的账户
                </Menu.Item>
              </Menu>
            </div>
            </div>
          </div>
        );
    }
}