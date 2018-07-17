import React, { Component } from 'react';

import './welcome.css';


export default class Welcome extends Component {

    _goToService = () => {
        this.props.history.push('/Service/List')
    };

    render() {
        return (
            <div className="welcome-page">
                <div className="welcome-content">
                    <h1>cflion-ui</h1>
                    <p>by aichen,ckanner</p>
                    <button onClick={this._goToService}>点击进入</button>
                </div>
            </div>
        );
    }
}

