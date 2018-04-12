import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import MainPage from 'bundle-loader?lazy&name=home!pages/MainPage/MainPage';

import Register from 'bundle-loader?lazy&name=register!pages/Account/Register';
import ForgetPassword from 'bundle-loader?lazy&name=down!pages/Account/ForgetPassword';
import Login from 'bundle-loader?lazy&name=down!pages/Account/Login';
import BindBank from 'bundle-loader?lazy&name=down!pages/Account/BindBank';
import Pay from 'bundle-loader?lazy&name=down!pages/Account/Pay';
import Withdraw from 'bundle-loader?lazy&name=down!pages/Account/Withdraw';
import MyAccount from 'bundle-loader?lazy&name=down!pages/MyAccount/MyAccount';
import ProductList from 'bundle-loader?lazy&name=down!pages/Investment/ProductList';
import Invest from 'bundle-loader?lazy&name=down!pages/Investment/Invest';
import SetTransPwd from 'bundle-loader?lazy&name=down!pages/Account/SetTransPwd';
import Transfer from 'bundle-loader?lazy&name=down!pages/Transfer/Transfer';
import Product from 'bundle-loader?lazy&name=down!pages/Investment/Product';

const createComponent = (component) => () => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component/> : <Loading/>
        }
    </Bundle>
);

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={createComponent(MainPage)}/>
            <Route path="/forgetpassword" component={createComponent(ForgetPassword)}/>
            <Route path="/register" component={createComponent(Register)}/>
            <Route path="/login" component={createComponent(Login)}/>
            <Route path="/bindbank" component={createComponent(BindBank)}/>
            <Route path="/pay" component={createComponent(Pay)}/>
            <Route path="/withdraw" component={createComponent(Withdraw)}/>
            <Route path="/productlist" component={createComponent(ProductList)}/>
            <Route path="/invest" component={createComponent(Invest)}/>
            <Route path="/myaccount" component={createComponent(MyAccount)}/>
            <Route path="/setPwd" component={createComponent(SetTransPwd)}/>
            <Route path="/transfer" component={createComponent(Transfer)}/>
            <Route path="/product" component={createComponent(Product)}/>
            <Route component={createComponent(NotFound)}/>
        </Switch>
    </div>
);
