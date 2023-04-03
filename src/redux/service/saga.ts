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


function* getAllServiceCategories(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getAllServiceCategories);
        yield put(actions.getAllServiceCategoriesSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.getAllServiceCategoriesFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* watchSearch() {
    yield takeLatest(types.SEARCH_SERVICE_CATEGORIES, searchServiceCategories);
    yield takeLatest(types.GET_ALL_SERVICE_CATEGORIES, getAllServiceCategories);
}


function* createServiceCategory(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.createServiceCategory, action.payload.data);
        yield put(actions.createServiceCategorySuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.createServiceCategoryFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* updateServiceCategory(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.updateServiceCategory, action.payload.id, action.payload.data);
        yield put(actions.updateServiceCategorySuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.updateServiceCategoryFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* getServiceCategoryDetail(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getServiceCategoryDetail, action.payload.id);
        yield put(actions.getServiceCategoryDetailSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.getServiceCategoryDetailFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* watchCRUD() {
    yield takeLatest(types.CREATE_SERVICE_CATEGORY, createServiceCategory);
    yield takeLatest(types.UPDATE_SERVICE_CATEGORY, updateServiceCategory);
    yield takeLatest(types.GET_SERVICE_CATEGORY_DETAIL, getServiceCategoryDetail);
}


function* watchService() {
    yield all([
        fork(watchSearch),
        fork(watchCRUD),
    ]);
}

export default watchService;