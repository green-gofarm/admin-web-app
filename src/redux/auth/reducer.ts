import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface AuthState {
    user: any
}

const initialState: AuthState = {
    user: null
};


function authReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SIGN_UP_HOST_SUCCESS:
            return { ...state, user: action.payload?.data ?? null };
        case type.SIGN_IN_SUCCESS:
            return { ...state, user: action.payload?.data ?? null };
        case type.SIGN_OUT_USER:
            return { ...state, user: null };
        default:
            return state
    }
}


export default authReducer;