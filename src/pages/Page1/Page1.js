import React, {Component} from 'react';

import style from './Page1.css';
import { Button } from 'antd';
import image from './images/0.png';

export default class Page1 extends Component {
    render() {
        return (
            <div className={style.box}>
                this is page1~
                <img src={image}/>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </div>

        )
    }
}