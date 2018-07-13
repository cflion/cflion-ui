import React, { Component } from 'react';

import { hot } from 'react-hot-loader';

import { Provider } from "react-redux";

import {Route, Redirect, Switch} from 'react-router-dom';

import {ConnectedRouter} from 'react-router-redux'

import store, {history} from './configureStore';

import Welcome from './Welcome';
import {
    ServiceList
} from './pages'


class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Redirect to="Welcome"/>
                            )}/>
                            <Route exact path="/Welcome" component={Welcome}/>
                            <Route path="/ServiceList" component={ServiceList}/>
                        </Switch>
                    </ConnectedRouter>
                </Provider>
            </div>
        );
    }
}

export default hot(module)(App)
