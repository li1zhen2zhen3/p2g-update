import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { Carousel, Icon } from 'antd';
import { Button } from 'antd';
import { BackTop } from 'antd';
import NavHeader from 'components/Nav/Nav';
import Tablea from 'components/Tablea/Tablea';
import TableGet from 'components/Tablea/TableGet';
import './ProductList.css';
import image9 from '../MainPage/images/logoPic.png';
import { Tabs, InputNumber } from 'antd';
import { Loading } from '../../components/Loading/Loading';
import history from '../../history';


const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

export default class ProductList extends Component {
    state = {
        current: 'mail',
        pid: sessionStorage.getItem('pid'),
        investValue: 10000
    }
    componentDidMount() {
        const { pid } = this.state;
        const formData = new FormData();
        formData.append('pid', pid);
        fetch('/v1/product/getProductByPId', {//获取首页展示产品列表
            method: 'POST',
            headers: {
            },
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        if (data.code == 0) {
                            this.setState({
                                productDetail: data.data,
                            });
                            console.log(data.data);
                        }
                        else {
                            message.error(data.message);
                        }
                    });
                }
            })
            .catch((res) => {
                message.error(res.status);
            })
    }
    handleValueChange = (e) => {
        this.setState({
            investValue: e
        });
    }
    immediateInvest = () => {
        const {investValue} = this.state;
        sessionStorage.setItem("investValue",investValue);
        console.log(investValue)
        sessionStorage.setItem("pid",this.state.pid);
        history.push('/invest');
    }
        
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    callback = (key) => {
        console.log(key);
        if (key = 1) {
    
        } else if (key == 2) {
    
        }
    }
   

    render() {
        const { productDetail, loading } = this.state;
        if (productDetail === undefined) return null;
        return (
            // <ScopedStyle style={[ProductListCss]}>
            <Layout className="mainLeaf">
                <NavHeader />
                <Content className="content">
                    <div className="product">
                        <div className="testHead">
                            理财产品
                    <a href="product" className="moreProduct">更多理财产品>></a>
                        </div>
                        <div className="products-box">
                            <div className="product-box">
                                <div className="name-box">{productDetail.project.name}    {productDetail.name}</div>
                                <div className="info-box">
                                    <div className="info">
                                        <div className="upInfoRed">{productDetail.yield}<span className="up-percent">%</span></div>
                                        <div className="downInfo">预期年化收益率</div>
                                    </div>
                                    <div className="info">
                                        <div className="upInfo">{productDetail.duration} <span className="up-percent">个月</span></div>
                                        <div className="downInfo">产品期限</div>
                                    </div>
                                    <div className="info">
                                        <div className="upInfo">{productDetail.miniInvestment} <span className="up-percent">万元</span></div>
                                        <div className="downInfo">起投金额</div>
                                    </div>
                                    <div className="info">
                                        <div className="upInfo" style={{fontSize:'15px'}}>实付金额：<InputNumber min={10000} max={20000} value={this.state.investValue} onChange={this.handleValueChange} /></div>
                                       <div></div>
                                        <div className="lastInfo">即时计息，每半年收益，到期回本</div>
                                    </div>
                                    <div className="info">
                                        <div className="upInfo"><Button type="primary" onClick={this.immediateInvest}>立即投资</Button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail">
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="项目介绍" key="1">
                                <div className="introDiv">
                                    <div className="title">项目简介</div>
                                    <div className="intro">项目的建设是为了修建项目区内德清县下渚湖国家湿地公园巡护步道工程。项目选址于德清县下渚湖镇，下渚湖国家湿地公园总面积12.4平方公里，景区地处德清城市发展“三区一湖”的核心区域，紧邻杭宁高速、申嘉湖杭高速、09省道、杭宁高铁等交通要道，区位优势明显。景区生态环境良好，水域面积2427亩，湖区港汊1000余条，大小墩岛600余处，具有水网交错的独特水乡景观；动植物800余种，极具生物多样性。同时，文化积淀深厚，是马家浜文化防风文化发源地。景区于2004年5月对外开放，2006年省政府批准为省级风景名胜区，2011年国家旅游局批准成为国家4A级景区，2013年国家林业局批准成为国家湿地公园。
项目资金用于补充下渚湖湿地公园巡护步道工程配套工程的流动资金。</div>
                                    <div className="title">融资主体</div>
                                    <div className="intro">德清县下渚湖湿地旅游发展有限公司（以下简称“湿地旅游”）成立于2007年12月19日，公司现注册资本为人民币20,000万元，国有独资。公司主营：旅游景区基础建设、公用服务设施建设、管理,下渚湖湿地风景区普通客船运输,户外广告发布、自有房屋租赁,零售:预包装食品,旅游产品开发,旅游工艺品销售,淡水鱼养殖(除水产苗种和龟鳖温室养殖),花卉、园艺作物、果树(除苗木)、蔬菜种植,停车服务(除客、货运站场)。</div>
                                    <div className="title">担保主体</div>
                                    <div className="intro">浙江省德清县交通投资集团有限公司（以下简称“德清交投”）成立于1993年12月02日，注册资金50,000万元整，国有独资。经营范围：交通投资、基础设施投资、土地开发,建筑材料经销。</div>
                                </div>
                            </TabPane>
                            <TabPane tab="预期收益" key="2">
                                <TableGet />
                            </TabPane>
                            <TabPane tab="投资记录" key="3">
                                <Tablea />
                            </TabPane>
                        </Tabs>
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
            // </ScopedStyle>
        )
    }
}
