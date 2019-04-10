import axios from 'axios'; //third party library to send AJAX requests


const URL = 'http://localhost:8080/prescriptions';
export const ADD_PRESCRIPTION = 'ADD_PRESCRIPTION';
export const GET_PRESCRIPTIONS = 'GET_PRESCRIPTIONS';

export const addPrescription = (prescription, succeed, fail) => {
    const addPrescriptionPromise = axios.post(URL, prescription)
        .then(res => {
            typeof succeed === 'function' && succeed(res);
            return {
                success: true,
                prescription: prescription //need this because reducer, the payload.success is from this success and payload.product is from here
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
        type: ADD_PRESCRIPTION,
        //payload is a property that carries data
        payload: addPrescriptionPromise
    };
};

export const getPrescriptions = prescription => {
    const getPrescriptionsPromise = axios.get(URL);
    return {
        type: GET_PRESCRIPTIONS,
        //payload is a property that carries data
        payload: getPrescriptionsPromise
    };
};
