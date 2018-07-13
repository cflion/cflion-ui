import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


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
