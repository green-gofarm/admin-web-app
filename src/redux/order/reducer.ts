import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface OrderState {
    orders: any,
    disbursements: any,
    orderDetail: any,
    disbursementDetail: any,
}

const initialState: OrderState = {
    orders: null,
    disbursements: null,
    orderDetail: null,
    disbursementDetail: null,
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

        case type.GET_ORDER_DETAIL_SUCCESS:
            return { ...state, orderDetail: action.payload.data };
        case type.GET_ORDER_DETAIL_FAILED:
            return { ...state, orderDetail: null };

        case type.GET_DISBURSEMENT_DETAIL_SUCCESS:
            return { ...state, disbursementDetail: action.payload.data };
        case type.GET_DISBURSEMENT_DETAIL_FAILED:
            return { ...state, disbursementDetail: null };
        default:
            return state
    }
}


export default orderReducer;