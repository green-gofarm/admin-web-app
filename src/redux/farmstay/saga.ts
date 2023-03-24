import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import * as types from "./type";
import * as apis from "./api";
import * as actions from "./action";

function* searchFarmstays(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchFarmstays, data?.params);
        yield put(actions.searchFarmstaySuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchFarmstayFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchAllFarmstays(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    const params = {
        page: 1,
        pageSize: 1000000,
    }
    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchFarmstays, params);
        yield put(actions.searchAllFarmstaysSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchAllFarmstaysFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* getFarmstayDetail(action: IReduxAction): Generator<any, void, any> {
    const id = action.payload.id;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        yield put(actions.clearFarmstayDetail());

        const response = yield call(apis.getFarmstayDetail, id);

        yield put(actions.getFarmstayDetailSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);

        yield put(actions.getFarmstayDetailFailed());
        option?.onFailure && option.onFailure(error);

    }

    option?.loading && option.loading(false);
}

function* watchSearch() {
    yield takeLatest(types.SEARCH_FARMSTAY, searchFarmstays);
    yield takeLatest(types.SEARCH_ALL_FARMSTAYS, searchAllFarmstays);
    yield takeLatest(types.GET_FARMSTAY_DETAIL, getFarmstayDetail)
}

function* getActivityDetail(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        yield put(actions.clearFarmstayDetail());

        const response = yield call(apis.getActivityDetail, action.payload.farmstayId, action.payload.activityId);

        yield put(actions.getActivityDetailSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);

        yield put(actions.getActivityDetailFailed());
        option?.onFailure && option.onFailure(error);

    }

    option?.loading && option.loading(false);
}

function* getActivitySchedule(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        yield put(actions.clearFarmstayDetail());

        const response = yield call(apis.getActivitySchedule, data.farmstayId, data.activityId, data.date);

        yield put(actions.getActivityScheduleSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);

        yield put(actions.getActivityScheduleFailed());
        option?.onFailure && option.onFailure(error);

    }

    option?.loading && option.loading(false);
}

function* watchActivity() {
    yield takeLatest(types.GET_ACTIVITY_DETAIL, getActivityDetail);
    yield takeLatest(types.GET_ACTIVITY_SCHEDULE, getActivitySchedule);
}

function* watchFarmstay() {
    yield all([
        fork(watchSearch),
        fork(watchActivity)
    ]);
}

export default watchFarmstay;