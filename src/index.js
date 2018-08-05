import React from 'react';

import ReactDOM from 'react-dom';

import App from './App';

import './common/GlobalStyle.css'


const rootEl = document.getElementById("root");

ReactDOM.render(<App/>, rootEl);

/*
// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./App", () => {
        const NewApp = require("./App").default;

        ReactDOM.render(
            <AppContainer>
                <NewApp/>
            </AppContainer>,
            rootEl
        );
    });
}*/
