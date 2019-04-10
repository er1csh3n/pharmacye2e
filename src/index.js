import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {rootReducer} from "./reducers/root.reducer";
import App from './containers/App';
import {createStore} from "redux";
import ReduxPromise from 'redux-promise';
import {applyMiddleware} from "redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from './components/Login';
import Products from './components/Products';
import Register from './components/Register';
import AddProduct from "./containers/AddProduct";
import auth from "./components/auth.hoc";
import Prescriptions from "./components/Prescriptions";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);



ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/login" component = { Login }/>
                    <Route path="/register" component = { Register }/>
                    <Route path="/products" component = { Products }/>
                    {/*<Route path="/add-product" component={ auth(AddProduct) }/>*/}
                    <Route path="/add-product" component={ AddProduct }/>
                    <Route path="/prescriptions" component = { Prescriptions }/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>,

    document.querySelector('#root')
);

serviceWorker.unregister();
