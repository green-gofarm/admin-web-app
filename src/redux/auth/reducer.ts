import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface AuthState {
    user: any
}

const initialState: AuthState = {
    user: null
};


export const authReducer = (state = initialState, action: IReduxAction) => {
    switch (action.type) {
        case type.SIGN_UP_HOST_SUCCESS:
            return { ...state, user: action.payload };
        case type.SIGN_IN_SUCCESS:
            return { ...state, user: action.payload };
        default:
            return state
    }
}
