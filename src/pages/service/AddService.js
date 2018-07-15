import React, {Component} from 'react';

import {Input, Table, Modal, Button} from 'antd';

const { Column } = Table;
const { TextArea } = Input;

import './service.css';


const data = [{
    key: 1,
    xuHao: 1,
    configName: 'AAA',
    configContent: 'aaa',
}, {
    key: 2,
    xuHao: 2,
    configName: 'BBB',
    configContent: 'bbb',
}];

export default class AddService extends Component {

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    _goServiceList = () => {
        this.props.history.push('/Service/List');
    };

    render(){
        return(
            <div>
                <div className="header-menu">
                    <a href="javascript:;" onClick={this._goServiceList}>返回服务列表</a>
                </div>
                <div className="service-box">
                    <h1 className="service-title">添加配置</h1>
                    <div className="input-ui">
                        <label>Service</label>
                        <Input/>
                    </div>
                    <div className="input-ui">
                        <label>Environment</label>
                        <Input/>
                    </div>
                    <div className="input-ui">
                        <label>Comment</label>
                        <Input/>
                    </div>
                    <div className="submit-btn" style={{textAlign:'right'}}>
                        <Button type="primary" onClick={this.showModal}>添加配置文件</Button>
                    </div>
                    <Modal
                        title="配置文件"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="取消"
                    >
                        <div className="input-ui">
                            <label>Config Name</label>
                            <Input/>
                        </div>
                        <div className="input-ui">
                            <label>Config Content</label>
                            <TextArea placeholder="config content" autosize={{ minRows: 2, maxRows: 10 }} />
                        </div>
                    </Modal>
                    <Table
                        dataSource={data}
                        pagination={false}
                    >
                        <Column
                            title="序号"
                            dataIndex="xuHao"
                            key="xuHao"
                        />
                        <Column
                            title="Config Name"
                            dataIndex="configName"
                            key="configName"
                        />
                        <Column
                            title="Config Content"
                            dataIndex="configContent"
                            key="configContent"
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <span>
                                    <a href="javascript:;" onClick={this._delService}>删除</a>
                                </span>
                            )}
                        />
                    </Table>
                    <div className="submit-btn">
                        <Button type="primary">提交</Button>
                    </div>
                </div>
            </div>
        )
    }
}