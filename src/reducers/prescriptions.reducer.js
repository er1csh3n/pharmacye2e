import {ADD_PRESCRIPTION, GET_PRESCRIPTIONS} from "../actions/prescriptions.action";

export const prescriptionsReducer = (state = null, action) => { //state = products, action if we are not getting products from backend
    switch (action.type) {
        case ADD_PRESCRIPTION:
            if (action.payload.success && state) {
                return [...state, action.payload.prescription]
            }
            return state;

        case GET_PRESCRIPTIONS:
            console.log(action.payload);
            //get payload: promise
            //promise has two cases, promise resolved, set state to returned products
            //promise rejected return old state
            return action.payload.data;

        default:
            return state;
    }
};
