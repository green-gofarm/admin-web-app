import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import * as types from "./type";
import * as apis from "./api";
import * as actions from "./action";

function* searchTagCategories(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchTagCategories, data?.params);
        yield put(actions.searchTagCategoriesSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchTagCategoriesFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* getAllTagCategories(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getAllTagCategories);
        yield put(actions.getAllTagCategoriesSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.getAllTagCategoriesFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* watchSearch() {
    yield takeLatest(types.SEARCH_TAG_CATEGORIES, searchTagCategories);
    yield takeLatest(types.GET_ALL_TAG_CATEGORIES, getAllTagCategories);
}


function* createTag(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.createTag, action.payload.data);
        yield put(actions.createTagSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.createTagFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* updateTag(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.updateTag, action.payload.id, action.payload.data);
        yield put(actions.updateTagSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.updateTagFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* getTagDetail(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getTagDetail, action.payload.id);
        yield put(actions.getTagDetailSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.getTagDetailFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* watchCRUD() {
    yield takeLatest(types.CREATE_TAG, createTag);
    yield takeLatest(types.UPDATE_TAG, updateTag);
    yield takeLatest(types.GET_TAG_DETAIL, getTagDetail);
}

function* watchTag() {
    yield all([
        fork(watchSearch),
        fork(watchCRUD),
    ]);
}

export default watchTag;