import React, {Component} from 'react';

import { Table, Icon, Divider } from 'antd';

const { Column } = Table;

import './service.css';


/*const columns = [{
    title: '#',
    dataIndex: '#',
    key: '#',
}, {
    title: 'Service',
    dataIndex: 'Service',
    key: 'Service',
}, {
    title: 'Environment',
    dataIndex: 'Environment',
    key: 'Environment',
}, {
    title: 'Config Files',
    dataIndex: 'Config Files',
    key: 'Config Files',
}, {
    title: 'Operation',
    key: 'Operation',
    render: (text, record) => (
        <span>
          <a href="javascript:;">show</a>
          <Divider type="vertical" />
          <a href="javascript:;">latest</a>
        </span>
    ),
}];*/

/*const data = [{
    key: '0',
    '#': 0,
    Service: 'zd_base_upload',
    Environment: 'dev',
    'Config Files': 1,
}, {
    key: '1',
    '#': 1,
    Service: 'zd_base_upload',
    Environment: 'dev',
    'Config Files': 1,
}, {
    key: '2',
    '#': 2,
    Service: 'zd_base_upload',
    Environment: 'dev',
    'Config Files': 1,
}];*/

const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

export default class ServiceList extends Component {
    render (){
        return (
            <div>
                <h1 style={{fontSize:'35px',color:'#333333'}}>Service List</h1>
                <Table dataSource={data}>
                    <Column
                        title="First Name"
                        dataIndex="firstName"
                        key="firstName"
                    />
                    <Column
                        title="Last Name"
                        dataIndex="lastName"
                        key="lastName"
                    />
                    <Column
                        title="Age"
                        dataIndex="age"
                        key="age"
                    />
                    <Column
                        title="Address"
                        dataIndex="address"
                        key="address"
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                            <a href="javascript:;" onClick={()=>this.props.history.push('/')}>Action 一 {record.name}</a>
                            <Divider type="vertical" />
                            <a href="javascript:;">Delete</a>
                        </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}








