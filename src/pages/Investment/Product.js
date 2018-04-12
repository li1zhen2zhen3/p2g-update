import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, message, Pagination } from 'antd';
import { Carousel, Icon } from 'antd';
import { Link } from 'react-router';
import { Button } from 'antd';
import { BackTop } from 'antd';
import Nav from 'components/Nav/Nav';
// import image1 from './images/1.jpg';
import image1 from './image/timg.jpg';
import { Table } from 'antd';
import '../Transfer/style.css';
import history from '../../history';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

class Transfer extends Component {
  state = {
    current: 0,
    productType: 0,
    accountId: null,
    loadding:false
  }
  componentDidMount() {
    var that = this;
    const accountId = sessionStorage.getItem("accountId");
    if (accountId != null) {
      that.setState({
        accountId: accountId
      })
    }
    this.getProductListByType();
  }
  getProductListByType = () => {
    var that = this;
    that.setState({
      loadding:true
    })
    const formData = new FormData();
    console.log(that.state.productType);
    console.log( that.state.current);    
    formData.append('productType', that.state.productType);
    formData.append('current', that.state.current);
    fetch('/v1/product/getProductListByType', {
      method: 'POST',
      headers: {
      },
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            if (data.code == 0) {
              that.setState({
                RecommendProductList: data.data,
                loadding:false
              });
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
  handleTypeClick = (productType) => {
    this.setState({
      productType: productType,
      current: 0
    });
    this.getProductListByType();
  }
  clickFunction(pid, event) {
    sessionStorage.setItem("pid", pid);
    var path = {
      pathname: '/productlist',
    }
    history.push(path);
  }
  handlePageCurrent = (page) => {
    this.setState({
      current: page-1,
    });
    this.getProductListByType();
  }
  render() {
    const { RecommendProductList,loadding } = this.state;
    if (RecommendProductList === undefined) return null;
    if (loadding) return message.loading("正在加载中",0.5);
    return (
      <Layout className="mainLeaf">
        <Nav />
        <Content style={{ padding: '10 50px' }}>
          <Carousel autoplay>
            <div><img src={image1} /></div>
          </Carousel>
          <div className="transferContentBox">
            <div className="testHead">
              <Button className="buttonNavBox" onClick={this.handleTypeClick.bind(this, 0)}>全部</Button>
              <Button className="buttonNavBox" onClick={this.handleTypeClick.bind(this, 1)}>类型1</Button>
              <Button className="buttonNavBox" onClick={this.handleTypeClick.bind(this, 2)}>类型2</Button>
              <Button className="buttonNavBox" onClick={this.handleTypeClick.bind(this, 3)}>类型3</Button>
            </div>
            {
              RecommendProductList.map(item => (
                <div className="products-box">
                  <div className="product-box">
                    <div className="name-box">{item.project.name}    {item.name}</div>
                    <div className="info-box">
                      <div className="info">
                        <div className="upInfo">{item.yield}<span className="up-percent">%</span></div>
                        <div className="downInfo">预期年化收益率</div>
                      </div>
                      <div className="info">
                        <div className="upInfo">>{item.duration} <span className="up-percent">个月</span></div>
                        <div className="downInfo">投资期限</div>
                      </div>
                      <div className="info">
                        <div className="upInfo">2019-08-06</div>
                        <div className="downInfo">最低投资金额</div>
                      </div>
                      <div className="info">
                        <div className="upInfo">按季收益，到期回本</div>
                        <div className="downInfo">收益方式</div>
                      </div>
                      <div className="info">
                        <div className="upInfo"><Button type="primary" onClick={this.clickFunction.bind(this, item.id)}>立即投资</Button></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div style={{ width: "72%", margin: "auto" }}>
            <div style={{ float: "right", margin: "20px 0px" }}>
              <Pagination defaultCurrent={this.state.current+1} onChange={this.handlePageCurrent} total={50} />
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
export default Transfer;
