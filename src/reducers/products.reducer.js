import {ADD_PRODUCT, GET_PRODUCTS} from "../actions/products.action";

export const productsReducer = (state = null, action) => { //state = products, action if we are not getting products from backend
    switch (action.type) {
        case ADD_PRODUCT:
            if (action.payload.success && state) {
                return [...state, action.payload.product]
            }
            return state;

        case GET_PRODUCTS:
            console.log(action.payload);
            //get payload: promise
            //promise has two cases, promise resolved, set state to returned products
            //promise rejected return old state
            return action.payload.data;

        default:
            return state;
    }
};
