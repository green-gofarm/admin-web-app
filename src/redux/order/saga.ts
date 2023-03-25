import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import * as types from "./type";
import * as apis from "./api";
import * as actions from "./action";

function* searchOrders(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchOrders, data?.params);
        yield put(actions.searchOrdersSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchOrdersFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchDisbursements(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchDisbursements, data?.params);
        yield put(actions.searchDisbursementsSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchDisbursementsFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* getOrderDetail(action: IReduxAction): Generator<any, void, any> {
    const id = action.payload.id;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        yield put(actions.clearOrderDetail());

        const response = yield call(apis.getOrderDetail, id);

        yield put(actions.getOrderDetailSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);

        yield put(actions.getOrderDetailFailed());
        option?.onFailure && option.onFailure(error);

    }

    option?.loading && option.loading(false);
}


function* getDisbursementDetail(action: IReduxAction): Generator<any, void, any> {
    const id = action.payload.id;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        yield put(actions.clearDisbursementDetail());

        const response = yield call(apis.getDisbursementDetail, id);

        yield put(actions.getDisbursementDetailSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);
        yield put(actions.getDisbursementDetailFailed());
        option?.onFailure && option.onFailure(error);
    }

    option?.loading && option.loading(false);
}

function* watchSearch() {
    yield takeLatest(types.SEARCH_ORDERS, searchOrders);
    yield takeLatest(types.SEARCH_DISBURSEMENTS, searchDisbursements);
    yield takeLatest(types.GET_ORDER_DETAIL, getOrderDetail);
    yield takeLatest(types.GET_DISBURSEMENT_DETAIL, getDisbursementDetail);
}

function* watchOrder() {
    yield all([
        fork(watchSearch),
    ]);
}

export default watchOrder;