import React, { Component } from 'react';

import { hot } from 'react-hot-loader';

import { Provider } from "react-redux";

import {Route, Redirect, Switch} from 'react-router-dom';

import {ConnectedRouter} from 'react-router-redux'

import store, {history} from './configureStore';

import Welcome from './Welcome';
import {
    ServiceList,
    AddService,
    EditService,
    CheckService,
} from './pages'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <Redirect to="Welcome"/>
                        )}/>
                        <Route path="/Welcome" component={Welcome}/>
                        <Route path="/Service/:type" render={props => {
                            let type = props.match.params.type;
                            if (type === 'List') {
                                return <ServiceList {...props}/>
                            } else if (type === 'Add') {
                                return <AddService {...props}/>
                            } else if (type === 'Edit') {
                                return <EditService {...props}/>
                            } else if (type === 'Check') {
                                return <CheckService {...props}/>
                            }
                        }}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default hot(module)(App)
