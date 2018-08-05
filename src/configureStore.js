import React from "react";

import { createStore, combineReducers, applyMiddleware } from "redux";

import createHistory from "history/createBrowserHistory";

import {reducer as formReducer } from 'redux-form'

import {
    routerReducer,
    routerMiddleware,
} from "react-router-redux";

import {serviceReducer} from "./pages/service/reducers"; // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        router: routerReducer,
        service: serviceReducer,
        form: formReducer
    }),
    applyMiddleware(middleware)
);

export default store;