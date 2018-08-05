import React,{Component} from 'react'

import { Table, Input } from 'antd'

import {connect} from 'react-redux'

import {checkService, editService} from './reducers/actions'

import {reduxForm} from 'redux-form'

import {
    InputField
} from '../../component'


const { Column } = Table;

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


class CheckService extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let id = this.props.location.state.id;
        this.props._checkService(id);
    }

    _goServiceList = () => {
        this.props.history.push('/Service/List');
    };

    render() {

        let service;
        if (this.props && this.props.service.length > 0) {
            service = this.props.service[0].service;
        }

        return (
            <div>
                <div className="header-menu">
                    <a href="javascript:;" onClick={this._goServiceList}>返回服务列表</a>
                </div>
                {
                    service ? (
                        <div className="service-box">
                            <h1 className="service-title">查看配置文件列表页面</h1>
                            <div className="input-ui">
                                <label>Service</label>
                                <InputField
                                    type={'text'}
                                    name={'service'}
                                    placeholder={'service'}
                                    valueDes={service.service}
                                    disabledDes={true}
                                />
                            </div>
                            <div className="input-ui">
                                <label>Environment</label>
                                <InputField
                                    type={'text'}
                                    name={'environment'}
                                    placeholder={'Environment'}
                                    valueDes={service.environment}
                                    disabledDes={true}
                                />
                            </div>
                            <div className="input-ui">
                                <label>Comment</label>
                                <InputField
                                    type={'text'}
                                    name={'comment'}
                                    placeholder={'comment'}
                                    valueDes={service.comment}
                                    disabledDes={true}
                                />
                            </div>
                            <Table
                                dataSource={service.configArray}
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
                            </Table>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

let CheckServiceForm = reduxForm({
    form: 'CheckServiceForm'
})(CheckService);

export default CheckServiceForm = connect(
    (state) => ({
        service: state.service
    }),
    (dispatch) => ({
        _editService: (id) => dispatch(editService(id)),
        _checkService: (id) => dispatch(checkService(id))
    })
)(CheckServiceForm);

