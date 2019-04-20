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
import EditProduct from "./containers/EditProduct";
import Analytics from "./components/Analytics";
import Logout from "./components/Logout";
import Home from "./components/Home";
import PrescriptionDetail from "./components/PrescriptionDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPrescription from "./containers/AddPrescription";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);



ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/home" component = { Home }/>
                    <Route path="/login" component = { Login }/>
                    <Route path="/logout" component = { Logout }/>
                    <Route path="/register" component = { Register }/>
                    <Route path="/products" component = { Products }/>
                    {/*<Route path="/add-product" component={ auth(AddProduct) }/>*/}
                    <Route path="/add-product" component={ AddProduct }/>
                    <Route path="/add-prescription" component = { AddPrescription }/>
                    <Route path="/prescriptions" component = { Prescriptions }/>
                    <Route path="/prescription/:id" component = { PrescriptionDetail }/>
                    <Route path="/edit-product/:id" component = { EditProduct }/>
                    <Route path="/analytics" component = { Analytics }/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>,

    document.querySelector('#root')
);

serviceWorker.unregister();
