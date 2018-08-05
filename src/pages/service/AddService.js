import React from 'react';

import {connect} from 'react-redux';

import {addService} from './reducers/actions';

import {Field, reduxForm} from 'redux-form'

import {Input, Table, Modal, Button} from 'antd';

import {
    InputField,
    TextAreaField,
} from '../../component/form/InputField'

import './service.css';

import {removeObjWithArr} from '../../common/GlobalUtil'


const { Column } = Table;
const { TextArea } = Input;

let dataKey = 0;
let configFiles = 0;
let configArray = [];


class ConfigsForm extends React.Component {
    render () {
        const {handleSubmit, okModal, cancelModal, visible} = this.props;

        return (
            <Modal
                title="配置文件"
                visible={visible}
                onOk={handleSubmit(okModal)}
                onCancel={cancelModal}
                okText="确认"
                cancelText="取消"
            >
                <div className="input-ui">
                    <label>Config Name</label>
                    <InputField
                        type={'text'}
                        name={'configName'}
                        placeholder={'config name'}
                    />
                </div>
                <div className="input-ui">
                    <label>Config Content</label>
                    <TextAreaField
                        name={'configContent'}
                        placeholder={'config content'}
                        autosize={{minRows: 6, maxRows: 10}}
                    />
                </div>
            </Modal>
        )
    }
}

ConfigsForm = reduxForm({
    form: 'addConfigsForm'
})(ConfigsForm);


/*const data = [{
    key: 1,
    xuHao: 1,
    configName: 'AAA',
    configContent: 'aaa',
}, {
    key: 2,
    xuHao: 2,
    configName: 'BBB',
    configContent: 'bbb',
}];*/


class AddConfigsModal extends React.Component {

    _files = [];
    count = 0;

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            files: []
        };
    }

    _showModal = () => {
        this.setState({
            visible: true,
        });
    };

    _cancelModal = () => {
        this.setState({
            visible: false,
        });
    };

    _okModal = (values) => {
        let file = {}, count = ++this.count;

        file.key = count;
        file.id = count;
        file.configName = values.configName;
        file.configContent = values.configContent;
        this._files.push(file);

        configArray = this._files;

        this.setState({
            visible: false,
            files: this._files
        });
        configFiles++;
    };

    _delService = (obj) => {
        removeObjWithArr(this._files,obj);

        configArray = this._files;

        this.setState({
            files: this._files
        });
    };

    render() {

        return (
            <div>
                <div className="submit-btn" style={{textAlign:'right'}}>
                    <Button type="primary" onClick={this._showModal}>添加配置文件</Button>
                </div>
                <ConfigsForm
                    visible={this.state.visible}
                    okModal={this._okModal}
                    cancelModal={this._cancelModal}
                />
                <Table
                    dataSource={this.state.files}
                    pagination={false}
                >
                    <Column
                        title="序号"
                        dataIndex="id"
                        key="id"
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
                        render={(text, record) => {
                            return (
                                <span>
                                <a href="javascript:;" onClick={() => this._delService(record)}>删除</a>
                            </span>
                            )
                        }}
                    />
                </Table>
            </div>
        )
    }
}


let listId = 0;
class AddForm extends React.Component {

    _addService = (values) => {
        let service = {};
        service.key = ++dataKey;
        service.id = ++listId;
        service.service = values.service;
        service.environment = values.environment;
        service.comment= values.comment;
        service.configFiles = configFiles;
        service.configArray = configArray;
        this.props.onAddService(service);
        this.props.history.replace('/Service/List');
        configFiles = 0;
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="service-box">
                <h1 className="service-title">添加配置</h1>
                <div className="input-ui">
                    <label>Service</label>
                    <InputField
                        type={'text'}
                        name={'service'}
                        placeholder={'service'}
                    />
                </div>
                <div className="input-ui">
                    <label>Environment</label>
                    <InputField
                        type={'text'}
                        name={'environment'}
                        placeholder={'environment'}
                    />
                </div>
                <div className="input-ui">
                    <label>Comment</label>
                    <InputField
                        type={'text'}
                        name={'comment'}
                        placeholder={'comment'}
                    />
                </div>
                <AddConfigsModal {...this.props}/>
                <div className="submit-btn">
                    <Button onClick={handleSubmit(this._addService)}>提交</Button>
                </div>
            </div>
        )
    }
}

AddForm = reduxForm({
    form: 'addForm'
})(AddForm);

AddForm = connect(
    (state) => ({
        service: state.service
    }),
    (dispatch) => ({
        onAddService: (service) => dispatch(addService(service))
    })
)(AddForm);

export default class AddService extends React.Component {

    _goServiceList = () => {
        this.props.history.push('/Service/List');
    };

    render(){

        return(
            <div>
                <div className="header-menu">
                    <a href="javascript:;" onClick={this._goServiceList}>返回服务列表</a>
                </div>
                <AddForm {...this.props}/>
            </div>
        )
    }
}