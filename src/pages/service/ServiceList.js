import React, {Component} from 'react';

import { Table, Divider } from 'antd';

const { Column } = Table;

import './service.css';

const data = [{
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
}];

export default class ServiceList extends Component {

    _addService = () => {
        this.props.history.push('/Service/Add')
    };

    _checkService = () => {
        this.props.history.push('/Service/Check')
    };

    _editService = () => {
        this.props.history.push('/Service/Edit')
    };

    _delService = () => {
        this.props.history.push('/Service/Del')
    };

    render (){
        return (
            <div>
                <h1 className="service-title">配置列表</h1>
                <Table
                    dataSource={data}
                    pagination={false}
                >
                    <Column
                        title="#"
                        dataIndex="xuHao"
                        key="xuHao"
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
                                <a href="javascript:;" onClick={this._checkService}>查看</a>
                                <Divider type="vertical" />
                                <a href="javascript:;" onClick={this._editService}>编辑</a>
                                <Divider type="vertical" />
                                <a href="javascript:;" onClick={this._delService}>删除</a>
                            </span>
                        )}
                    />
                </Table>
                <div className="add-row"><a href="javascript:;" onClick={this._addService}>新增配置</a></div>
            </div>
        )
    }
}








