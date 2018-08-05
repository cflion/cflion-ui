import React from "react";

import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from 'redux-thunk'

import createHistory from "history/createBrowserHistory";

import {reducer as formReducer } from 'redux-form'

import {
    routerReducer,
    routerMiddleware,
} from "react-router-redux";

import reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [
    routerMiddleware(history),
    thunk
];

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        router: routerReducer,
        form: formReducer,
        ...reducers
    }),
    applyMiddleware(...middleware)
);

export default store;