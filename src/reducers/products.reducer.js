import {ADD_PRODUCT, GET_PRODUCTS, EDIT_PRODUCT, DELETE_PRODUCT} from "../actions/products.action";

export const productsReducer = (state = null, action) => { //state = products, action if we are not getting products from backend
    switch (action.type) {
        case ADD_PRODUCT:
            if (action.payload.success && state) {
                return [...state, action.payload.product]
            }
            return state;

        case GET_PRODUCTS:
            console.log(action.payload);
            return action.payload.data;


        case EDIT_PRODUCT:
            if (action.payload.success) {
                const product = action.payload.product;
                const index = state.findIndex(p => p.id === product.id);
                const newProductsState = [...state];
                newProductsState.splice(index, 1, product);
                console.log(newProductsState);
                return newProductsState;
            } else {
                return state;
            }


        case DELETE_PRODUCT:
            if (action.payload.success) {
                return null;
            }
            return state;

        default:
            return state;
    }
};
