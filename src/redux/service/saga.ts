import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import * as types from "./type";
import * as apis from "./api";
import * as actions from "./action";

function* searchServiceCategories(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchServiceCategories, data?.params);
        yield put(actions.searchServiceCategoriesSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchServiceCategoriesFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* watchSearch() {
    yield takeLatest(types.SEARCH_SERVICE_CATEGORIES, searchServiceCategories);
}

function* watchService() {
    yield all([
        fork(watchSearch),
    ]);
}

export default watchService;