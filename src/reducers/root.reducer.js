import {reducer as formReducer} from 'redux-form';
import {authReducer} from "./auth.reducer";
import {combineReducers} from "redux";
import {productsReducer} from "./products.reducer";
import {prescriptionsReducer} from "./prescriptions.reducer";



export const rootReducer = combineReducers({
    loggedIn: authReducer,
    products: productsReducer,
    prescriptions: prescriptionsReducer,
    form: formReducer
});
