import axios from 'axios';
import qs from 'qs';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

const URL = 'http://localhost:8080';

export const login = (user, cb) => {

    const loginPromise = axios.post(`${URL}/login`,qs.stringify(user),
        {withCredentials: true})
        .then(res => {
            console.log(res);
            if (res.data.success) {
                cb(res);
            }
            return {
                success: true,
                user: res.data.user
            };
        })
        .catch();
    return {
        type: LOGIN,
        payload: loginPromise
    };
};

export const logout = (cb) => {
    const logoutPromise = axios.post(`${URL}/logout`, {withCredentials: true})
        .then(res => {
            console.log('calling logout');
            cb(res);
            return res;
        });
    return {
        type: LOGOUT,
        payload: logoutPromise
    }
};

export const register = (user, success, fail) => {
    console.log('in action', user);
    const registerPromise = axios.post(`${URL}/user-details`, user) // sending cookies to backend
        .then(res => {
            if (res.data.success) {
                success();
                return {
                    success: true,
                    user: res.data.user
                }
            } else {
                fail();
                return {
                    success: false,
                    user: null
                }
            }
        }).catch(res => {
            console.log(res);
            return {
                success: false
            }
        });
    return {
        type: REGISTER,
        payload: registerPromise
    }
};
