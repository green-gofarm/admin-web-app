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

function* watchSearch() {
    yield takeLatest(types.SEARCH_FARMSTAY, searchFarmstays);
    yield takeLatest(types.SEARCH_ALL_FARMSTAYS, searchAllFarmstays);
}

function* watchFarmstay() {
    yield all([
        fork(watchSearch),
    ]);
}

export default watchFarmstay;