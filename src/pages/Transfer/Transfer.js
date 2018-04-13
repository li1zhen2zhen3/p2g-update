import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { Carousel, Icon } from 'antd';
import { Link } from 'react-router';
import { Button } from 'antd';
import { BackTop } from 'antd';
import Nav from 'components/Nav/Nav';
// import image1 from './images/1.jpg';
import image1 from './image/timg.jpg';
import { Table } from 'antd';
import './style.css';
import history from '../../history';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

class Transfer extends Component {
  state = {
    current: 'mail',
    accountId: null
  }
  componentDidMount() {
    var that = this;
    const accountId = sessionStorage.getItem("accountId");
    if (accountId != null) {
      that.setState({
        accountId: accountId
      })
    }
    let url = "/v1/transfer/transferList";
    let params = {
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
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data.data);
            if (data.code == 0) {
              that.setState({
                RecommendProductList: data.data,
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
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  clickFunction(tid, event) {
    sessionStorage.setItem("tid", tid);
    var path = {
      pathname: '/transferlist',
    }
    history.push(path);
  }
  render() {
    const { RecommendProductList } = this.state;
    if (RecommendProductList === undefined) return null;
    return (
      <Layout className="mainLeaf">
        <Nav />
        <Content style={{ padding: '10 50px' }}>
          <Carousel autoplay>
            <div><img src={image1} /></div>
          </Carousel>
          <div className="transferContentBox">
            <div className="testHead">
              理财产品
      <a href="/productlist" className="moreProduct">更多理财产品>></a>
            </div>
            {
              RecommendProductList.map(item => (
                <div className="products-box">
                  <div className="product-box">
                    <div className="name-box">{item.investmentRecordEntity.govProduct.project.name}    {item.investmentRecordEntity.govProduct.name}</div>
                    <div className="info-box">
                      <div className="info">
                        <div className="upInfo">{item.investmentRecordEntity.govProduct.yield}<span className="up-percent">%</span></div>
                        <div className="downInfo">预期年化收益率</div>
                      </div>
                      <div className="info">
                        <div className="upInfo">>{item.investmentRecordEntity.govProduct.duration} <span className="up-percent">个月</span></div>
                        <div className="downInfo">剩余投资期限</div>
                      </div>
                      <div className="info">
                        <div className="upInfo">2019-08-06</div>
                        <div className="downInfo">预计下一收款日</div>
                      </div>
                      <div className="info">
                        <div className="upInfo" style={{ fontSize: "13px" }}>{item.investmentRecordEntity.govProduct.miniInvestment}元</div>
                        <div className="downInfo">项目价值</div>
                      </div>
                      <div className="info">
                        <div className="upInfo" style={{ fontSize: "13px" }}>{item.investmentRecordEntity.govProduct.miniInvestment}元</div>
                        <div className="downInfo">转让价格</div>
                      </div>
                      <div className="info">
                        <Button type="primary" onClick={this.clickFunction.bind(this, item.id)}>转让</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }

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
