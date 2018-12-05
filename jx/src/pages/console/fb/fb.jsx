import "./fb.scss";
import React from "react";
import { Table, Divider } from 'antd';

import _axios from "../../../utils/_axios"

class Fb extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        TableData: [{
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }]
    }
    render() {
        const { Column } = Table;
        return (
            <div className="fb_page">
                <div className="tabel_wrap" >
                    <Table dataSource={this.state.TableData}>
                        <Column
                            title="Age"
                            dataIndex="age"
                        />
                        <Column
                            title="Address"
                            dataIndex="address"
                        />
                        <Column
                            title="Tags"
                            dataIndex="tags"
                            
                        />
                    </Table>
                </div>
            </div>
        )
    }
    componentWillMount() {

    }
}

export default Fb;