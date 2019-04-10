import axios from 'axios'; //third party library to send AJAX requests


const URL = 'http://localhost:8080/products';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';

export const addProduct = (product, succeed, fail) => {
    const addProductsPromise = axios.post(URL, product)
        .then(res => {
            typeof succeed === 'function' && succeed(res);
            return {
                success: true,
                product: product //need this because reducer, the payload.success is from this success and payload.product is from here
                // if we do not have this then we cannot spread anything
            };
        })
        .catch( err => {
            typeof fail === 'function' && fail(err);
            return {
                success: false
            };
        });
    return {
        type: ADD_PRODUCT,
        //payload is a property that carries data
        payload: addProductsPromise
    };
};

export const getProducts = product => {
    const getProductsPromise = axios.get(URL);
    return {
        type: GET_PRODUCTS,
        //payload is a property that carries data
        payload: getProductsPromise
    };
};
