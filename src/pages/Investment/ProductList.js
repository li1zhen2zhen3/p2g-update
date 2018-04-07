import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb} from 'antd';
import { Carousel,Icon} from 'antd';
import { Button } from 'antd';
import { BackTop } from 'antd';
import Nav from 'components/Nav/Nav';
import {Table} from 'antd';
import './ProductList.css';
import image9 from '../MainPage/images/logoPic.png';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

export default class ProductList extends Component{
    state = {
        current: 'mail',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render(){
        return(
            <Layout className="mainLeaf">
                <Nav/>
                <Content style={{ padding: '10 50px'}}>
                    <div className="contentBox">
                        <div className="test-box"> <img  src={image9}/></div>
                        <div>
                            <Menu className="menu"
                                  onClick={this.handleClick}
                                  selectedKeys={[this.state.current]}
                                  mode="horizontal"
                            >
                                <Menu.Item key="mail">
                                    <Icon type="mail" />首页
                                </Menu.Item>
                                <Menu.Item key="app">
                                    <Icon type="appstore" />理财频道
                                </Menu.Item>
                                <Menu.Item key="mail">
                                    <Icon type="mail" />转让专区
                                </Menu.Item>
                                <Menu.Item key="mail">
                                    <Icon type="mail" />我的账户
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>

                    <div className="test">
                        <div className="testHead">
                            理财产品
                            <a href="#" className="moreProduct">更多理财产品>></a>
                        </div>


                        <div className="products-box">
                            <div className="product-box">
                                <div className="name-box">普定城投-006     贵州安顺</div>
                                <div className="info-box">
                                    <div className="info">
                                        <div className="upInfo-red">8.5<span className="up-percent">%</span></div>
                                        <div className="downInfo">预期年化收益率</div>
                                    </div>
                                    <div className="info">
                                        <div className="upInfo">24 <span className="up-percent">个月</span></div>
                                        <div className="downInfo">产品期限</div>
                                    </div>
                                    <div className="info">
                                        <div className="upInfo">100 <span className="up-percent">万元</span></div>
                                        <div className="downInfo">起投金额</div>
                                    </div>
                                    <div className="info">
                                        <div className="upInfo"><Button type="primary">立即投资</Button></div>
                                        <div className="lastInfo">即时计息，每半年收益，到期回本</div>
                                    </div>
                                </div>
                                <h1></h1>
                                <h1></h1>
                                <h1></h1>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
                                    <TabPane tab="Tab 2" key="2">Tab 2</TabPane>
                                    <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
                                </Tabs>
                                <h1>7432hfkhkasfkah</h1>



                            </div>
                        </div>
                    </div>
                </Content>





                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
                <div>
                    <BackTop />
                    Scroll down to see the bottom-right
                    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
                    button.
                </div>
            </Layout>
        )
    }
}
