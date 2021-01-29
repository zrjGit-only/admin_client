import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from '../src/store/store'
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
        , document.getElementById('root')
    );

}

render()

store.subscribe(render)