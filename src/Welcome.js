import React, { Component } from 'react';

import './welcome.css';


export default class Welcome extends Component {

    _goToService = () => {
        this.props.history.push('ServiceList')
    };

    render() {
        return (
            <div className="welcome-page">
                <div className="welcome-bg"> </div>
                <div className="welcome-content">
                    <h1>Welcome to come cflion-ui</h1>
                    <p>by aichen,ckanner</p>
                    <button onClick={this._goToService}>点击进入</button>
                </div>
            </div>
        );
    }
}

