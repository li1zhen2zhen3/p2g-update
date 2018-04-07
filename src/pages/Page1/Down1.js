import React ,{Component} from 'react';
import { Button } from 'antd';
import { Checkbox, Row, Col } from 'antd';

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

export default class Down extends Component {
    render(){
        return(
            <div>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
                <Checkbox.Group onChange={onChange}>
                    <Row>
                        <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                        <Col span={8}><Checkbox value="B">B</Checkbox></Col>
                        <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                        <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                        <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                    </Row>
                </Checkbox.Group>
            </div>




        )
    }
}
