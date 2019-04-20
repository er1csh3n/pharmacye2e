import {ADD_PRESCRIPTION, EDIT_PRESCRIPTION, GET_PRESCRIPTIONS} from "../actions/prescriptions.action";

export const prescriptionsReducer = (state = null, action) => { //state = products, action if we are not getting products from backend
    switch (action.type) {
        case ADD_PRESCRIPTION:
            if (action.payload.success && state) {
                return [...state, action.payload.prescription]
            }
            return state;

        case GET_PRESCRIPTIONS:
            console.log(action.payload);
            return action.payload.data;

        case EDIT_PRESCRIPTION:
            if (action.payload.success) {
                const prescription = action.payload.prescription;
                const index = state.findIndex(p => p.id === prescription.id);
                const newPrescriptionState = [...state];
                newPrescriptionState.splice(index, 1, prescription);
                console.log('from reducer', newPrescriptionState);
                return newPrescriptionState;
            } else {
                return state;
            }

        default:
            return state;
    }
};
