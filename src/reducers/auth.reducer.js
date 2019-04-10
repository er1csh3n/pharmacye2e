import {LOGIN} from "../actions/auth.action";

export const authReducer = (state=null, action) => {

    switch (action.type){
        case LOGIN:
            if (action.payload.success) {
                return action.payload.user;
            }
            return state;
        default:
            return state;
    }
};
