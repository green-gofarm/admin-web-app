import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface State {
    orders: any,
    disbursements: any,
}

const initialState: State = {
    orders: null,
    disbursements: null,
};


function orderReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_ORDERS_SUCCESS:
            return { ...state, orders: action.payload };
        case type.SEARCH_ORDERS_FAILED:
            return { ...state, orders: null };
        case type.SEARCH_DISBURSEMENTS_SUCCESS:
            return { ...state, disbursements: action.payload };
        case type.SEARCH_DISBURSEMENTS_FAILED:
            return { ...state, disbursements: null };
        default:
            return state
    }
}


export default orderReducer;