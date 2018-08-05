import React,{Component} from 'react'

import { Table, Input, Modal, Button, Divider } from 'antd'

import {connect} from 'react-redux'

import {editService} from './reducers/actions'

import {reduxForm} from 'redux-form'

import {InputField, TextAreaField} from '../../component'

import {removeObjWithArr} from '../../common/GlobalUtil'


const { Column } = Table;
const { TextArea } = Input;


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


let configFiles;
let configArray = [];
let caFlag = false; //是否有改过配置文件

class ConfigsForm extends Component {
    render(){
        const {handleSubmit, okModal, cancelModal, visible, service} = this.props;

        return(
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
                        placeholder={'Config Name'}
                        valueDes={service.configArray[0].configName}
                    />
                </div>
                <div className="input-ui">
                    <label>Config Content</label>
                    <TextAreaField
                        placeholder="config content"
                        autosize={{ minRows: 6, maxRows: 10 }}
                        name={'configContent'}
                        valueDes={service.configArray[0].configContent}
                    />
                </div>
            </Modal>
        )
    }
}

ConfigsForm = reduxForm({
    form: 'editConfigsForm'
})(ConfigsForm);

class EditConfigsModal extends Component {

    _files = [];

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
        let file = {};
        this._files = [];
        let _service = this.props.location.state.service;

        file.key=_service.key;
        file.id=_service.id;
        file.configName = values.configName;
        file.configContent = values.configContent;
        this._files.push(file);

        caFlag=true;
        configArray = this._files;

        this.setState({
            visible: false,
            files: this._files
        });
    };

    _delService = (obj) => {
        let _service = this.props.location.state.service, index;
        let configNums = _service.configArray;

        for (let k = 0; k < configNums.length; k++) {
            if (configNums[k].id === obj.id) {
                index = configNums.indexOf(configNums[k]);
            }
        }
        configNums.splice(index,1);  //改变原数组，返回当前删除的元素

        configArray = configNums;
        configFiles = configNums.length;

        this.setState({
            files: configNums
        });
    };

    render() {

        let service = this.props.location.state.service;

        return(
            <div>
                <ConfigsForm
                    visible={this.state.visible}
                    okModal={this._okModal}
                    cancelModal={this._cancelModal}
                    service={service}
                />
                <Table
                    dataSource={this.state.files.length > 0 ? this.state.files : service.configArray}
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
                        render={(text, record) => (
                            <span>
                                <a href="javascript:;" onClick={this._showModal}>编辑</a>
                                <Divider type="vertical"/>
                                <a href="javascript:;" onClick={() => this._delService(record)}>删除</a>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}

class EditService extends Component {

    service = {};

    _goServiceList = () => {
        this.props.history.push('/Service/List');
    };

    _editService = (values) => {
        if (!caFlag) {
            configArray = [];
        }

        let service = {};
        let _service = this.props.location.state.service;

        service.id = _service.id;
        service.key = _service.key;
        service.service = values.service ? values.service : _service.service;
        service.environment = values.environment ? values.environment : _service.environment;
        service.comment= values.comment ? values.comment : _service.comment;
        service.configFiles = configFiles ? configFiles : _service.configFiles;
        service.configArray = configArray.length > 0 ? configArray : _service.configArray;
        this.props.onEditService(service);
        this.props.history.replace('/Service/List');
    };

    render() {

        let service = this.props.location.state.service;

        const {handleSubmit} = this.props;

        return(
            <div>
                <div className="header-menu">
                    <a href="javascript:;" onClick={this._goServiceList}>返回服务列表</a>
                </div>
                {
                    service ? (
                        <div className="service-box">
                            <h1 className="service-title">编辑配置文件列表页面</h1>
                            <div className="input-ui">
                                <label>Service</label>
                                <InputField
                                    type={'text'}
                                    name={'service'}
                                    placeholder={'service'}
                                    valueDes={service.service}
                                />
                            </div>
                            <div className="input-ui">
                                <label>Environment</label>
                                <InputField
                                    type={'text'}
                                    name={'environment'}
                                    placeholder={'Environment'}
                                    valueDes={service.environment}
                                />
                            </div>
                            <div className="input-ui">
                                <label>Comment</label>
                                <InputField
                                    type={'text'}
                                    name={'comment'}
                                    placeholder={'comment'}
                                    valueDes={service.comment}
                                />
                            </div>
                            <EditConfigsModal {...this.props}/>
                            <div className="submit-btn">
                                <Button onClick={handleSubmit(this._editService)}>提交</Button>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

let EditServiceForm = reduxForm({
    form: 'EditServiceForm'
})(EditService);

export default EditServiceForm = connect(
    (state) => ({
        service: state.service
    }),
    (dispatch) => ({
        onEditService: (service) => dispatch(editService(service)),
    })
)(EditServiceForm)