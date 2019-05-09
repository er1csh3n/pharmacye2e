import axios from 'axios';


const URL = 'http://localhost:8080/prescriptions';
export const ADD_PRESCRIPTION = 'ADD_PRESCRIPTION';
export const GET_PRESCRIPTIONS = 'GET_PRESCRIPTIONS';
export const EDIT_PRESCRIPTION = 'EDIT_PRESCRIPTION';

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

export function editPrescription(editPrescription,id,  callback) {
    console.log(editPrescription);
    let promise = axios.put(`${URL}/${id}`, editPrescription)
        .then(res => { //res is not what I need
            console.log('in .then', res);
            callback(res);
            return {
                prescription: editPrescription,
                success: res.data.success
            };
        });
    return {
        type: EDIT_PRESCRIPTION,
        payload: promise
    };
}

// export function getUser(getUser,id, callback) {
//     console.log(getUser);
//     let getUserPromise = axios.get(`${URL2}/${id}`, getUser)
//         .then(res => { //res is not what I need
//             console.log('in .then', res);
//             callback(res);
//             return {
//                 user: getUser,
//                 success: res.data.success
//             };
//         });
//     return {
//         type: EDIT_PRESCRIPTION,
//         payload: getUserPromise
//     };
// }
