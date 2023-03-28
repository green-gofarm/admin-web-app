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


export const getOrderDetail = (id: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ORDER_DETAIL,
    payload: { id, option: option ?? getEmptyOption() }
})

export const getOrderDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_ORDER_DETAIL_SUCCESS,
    payload: data
})

export const getOrderDetailFailed = (): IReduxAction => ({
    type: type.GET_ORDER_DETAIL_FAILED
})

export const clearOrderDetail = (): IReduxAction => ({
    type: type.CLEAR_ORDER_DETAIL
})

//Disbursement
export const getDisbursementDetail = (id: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_DISBURSEMENT_DETAIL,
    payload: { id, option: option ?? getEmptyOption() }
})

export const getDisbursementDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_DISBURSEMENT_DETAIL_SUCCESS,
    payload: data
})

export const getDisbursementDetailFailed = (): IReduxAction => ({
    type: type.GET_DISBURSEMENT_DETAIL_FAILED
})

export const clearDisbursementDetail = (): IReduxAction => ({
    type: type.CLEAR_DISBURSEMENT_DETAIL
})


export const reviewBooking = (hostId: any, orderId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.REVIEW_BOOKING,
    payload: { hostId, orderId, data, option: option ?? getEmptyOption() }
})