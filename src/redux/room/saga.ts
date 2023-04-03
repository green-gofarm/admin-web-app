import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import * as types from "./type";
import * as apis from "./api";
import * as actions from "./action";

function* searchRoomCategories(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchRoomCategories, data?.params);
        yield put(actions.searchRoomCategoriesSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchRoomCategoriesFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* getAllRoomCategories(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getAllRoomCategories);
        yield put(actions.getAllRoomCategoriesSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.getAllRoomCategoriesFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* watchSearch() {
    yield takeLatest(types.SEARCH_ROOM_CATEGORIES, searchRoomCategories);
    yield takeLatest(types.GET_ALL_ROOM_CATEGORIES, getAllRoomCategories);
}


function* createRoomCategory(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.createRoomCategory, action.payload.data);
        yield put(actions.createRoomCategorySuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.createRoomCategoryFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* updateRoomCategory(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.updateRoomCategory, action.payload.id, action.payload.data);
        yield put(actions.updateRoomCategorySuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.updateRoomCategoryFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* getRoomCategoryDetail(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option;

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getRoomCategoryDetail, action.payload.id);
        yield put(actions.getRoomCategoryDetailSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.getRoomCategoryDetailFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* watchCRUD() {
    yield takeLatest(types.CREATE_ROOM_CATEGORY, createRoomCategory);
    yield takeLatest(types.UPDATE_ROOM_CATEGORY, updateRoomCategory);
    yield takeLatest(types.GET_ROOM_CATEGORY_DETAIL, getRoomCategoryDetail);
}

function* watchRoom() {
    yield all([
        fork(watchSearch),
        fork(watchCRUD),
    ]);
}

export default watchRoom;