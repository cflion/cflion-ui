import React, {Component} from 'react';

import { Table, Divider } from 'antd';

import {connect} from 'react-redux'

const { Column } = Table;

import './service.css';

import {removeService} from './reducers/actions'
/*const data = [{
    key: 0,
    xuHao: 0,
    service: 'zd_base_upload',
    environment: 'dev',
    configFiles: 1,
    comment:'备注'
}, {
    key: 1,
    xuHao: 1,
    service: 'zd_base_pays',
    environment: 'dev',
    configFiles: 2,
    comment:'备注'
}, {
    key: 2,
    xuHao: 2,
    service: 'zd_base_start',
    environment: 'dev',
    configFiles: 1,
    comment:'备注'
}];*/

class ServiceList extends Component {

    constructor(){
        super(...arguments);

        this.state = {
            data:[]
        }
    }

    _addService = () => {
        this.props.history.push('/Service/Add')
    };

    _checkService = (id) => {
        this.props.history.push('/Service/Check',{id:id})
    };

    _editService = (obj) => {
        this.props.history.push('/Service/Edit',{service:obj})
    };

    _delService = (obj) => {
        this.props.onRemoveService(obj);
        let newData = this.props.service, _newData = [];
        for (let i = 0; i < newData.length; i++) {
            _newData.push(newData[i].service);
        }
        this.setState({
            data: _newData
        });
    };

    render (){
        let service = this.props.service, _data = [];
        if (service) {
            for (let k = 0; k < service.length; k++) {
                _data.push(service[k].service);
            }
        }

        return (
            <div>
                <h1 className="service-title">配置列表</h1>
                <Table
                    dataSource={this.state.data.length > 0 ? this.state.data : _data}
                    pagination={false}
                >
                    <Column
                        title="#"
                        dataIndex="id"
                        key="id"
                    />
                    <Column
                        title="Service"
                        dataIndex="service"
                        key="service"
                    />
                    <Column
                        title="Environment"
                        dataIndex="environment"
                        key="environment"
                    />
                    <Column
                        title="Config Files"
                        dataIndex="configFiles"
                        key="configFiles"
                    />
                    <Column
                        title="Comment"
                        dataIndex="comment"
                        key="comment"
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <a href="javascript:;" onClick={() => this._checkService(record.id)}>查看</a>
                                <Divider type="vertical" />
                                <a href="javascript:;" onClick={() => this._editService(record)}>编辑</a>
                                <Divider type="vertical" />
                                <a href="javascript:;" onClick={() => this._delService(record)}>删除</a>
                            </span>
                        )}
                    />
                </Table>
                <div className="add-row"><a href="javascript:;" onClick={this._addService}>新增配置</a></div>
            </div>
        )
    }
}

export default ServiceList = connect(
    (state) => ({
        service: state.service
    }),
    (dispatch) => ({
        onRemoveService: (service) => dispatch(removeService(service))
    })
)(ServiceList);






