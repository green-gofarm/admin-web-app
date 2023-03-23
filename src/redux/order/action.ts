import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const searchOrders = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_ORDERS,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchOrdersSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_ORDERS_SUCCESS,
    payload: data
})

export const searchOrdersFailed = (): IReduxAction => ({
    type: type.SEARCH_ORDERS_FAILED
})


export const searchDisbursements = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_DISBURSEMENTS,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchDisbursementsSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_DISBURSEMENTS_SUCCESS,
    payload: data
})

export const searchDisbursementsFailed = (): IReduxAction => ({
    type: type.SEARCH_DISBURSEMENTS_FAILED
})