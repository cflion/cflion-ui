import React from 'react';
import {Input} from 'antd';
import {Field} from 'redux-form'

const {TextArea} = Input;

export class InputField extends React.Component {
    render() {
        return (
            <Field
                {...this.props}
                component={InputItem}
            />
        )
    }
}

export class TextAreaField extends React.Component {
    render(){
        return(
            <Field
                {...this.props}
                component={TextAreaItem}
            />
        )
    }
}

class InputItem extends React.Component {

    constructor() {
        super(...arguments);
    }

    render() {
        const {
            input: { name, value, onChange },
            meta: { initial },
            placeholder,
            valueDes,
            disabledDes,
            style
        } = this.props;


        return(
            <Input
                name={name}
                defaultValue={initial || ''}
                placeholder={valueDes ? valueDes : placeholder}
                value={value}
                onChange={onChange}
                disabled={disabledDes || false}
                style={[{...style}]}
            />
        )
    }
}

class TextAreaItem extends React.Component {
    render() {
        const {
            input: {name, value, onChange},
            meta,
            placeholder,
            autosize,
            valueDes
        } = this.props;

        return (
            <TextArea
                name={name}
                placeholder={valueDes ? valueDes : placeholder}
                value={value}
                onChange={onChange}
                autosize={autosize}
            />
        )
    }
}