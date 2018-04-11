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
    accountId:null
  }
  componentDidMount() {
    var that = this;
    const accountId=sessionStorage.getItem("accountId");
    if(accountId!=null){
        that.setState({
          accountId:accountId
        })
    }
    fetch('/v1/product/getRecommendProductList', {//获取首页展示产品列表
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        current: 0
      }      
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
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
  clickFunction(pid, event) {
    sessionStorage.setItem("pid",pid);
    var path = {
      pathname: '/productlist',      
    }
    history.push(path);
  }
  render() {
    const { RecommendProductList } = this.state;
    if (RecommendProductList === undefined) return null;
    return (
      <Layout className="mainLeaf">
        <Nav/>
        <Content style={{ padding: '10 50px' }}>
        <Carousel autoplay>
            <div><img src={image1} /></div>
          </Carousel>
          <div className="test">
            <div className="testHead">
              理财产品
      <a href="/productlist" className="moreProduct">更多理财产品>></a>
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
                        <div className="downInfo">剩余投资期限</div>
                      </div>
                      <div className="info">
                        <div className="upInfo">2019-08-06</div>
                        <div className="downInfo">预计下一收款日</div>
                      </div>
                      <div className="info">
                        <div className="upInfo">{item.miniInvestment}</div>
                        <div className="downInfo">项目价值</div>
                      </div>
                      <div className="info">
                        <div className="upInfo">{item.miniInvestment}</div>
                        <div className="downInfo">转让价格</div>
                      </div>
                      <div className="info">
                        <div className="upInfo"><Button type="primary" onClick={this.clickFunction.bind(this, item.id)}>转让</Button></div>
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
