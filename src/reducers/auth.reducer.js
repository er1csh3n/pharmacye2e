import {LOGIN, LOGOUT} from "../actions/auth.action";

export const authReducer = (state=null, action) => {

    switch (action.type){
        case LOGIN:
            if (action.payload.success) {
                return action.payload.user;
            }
            return state;
        case LOGOUT:
            if (action.payload.success) {
                return null;
            } else {
                return state;
            }

        default:
            return state;
    }
};
