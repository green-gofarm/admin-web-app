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

function* watchSearch() {
    yield takeLatest(types.SEARCH_ROOM_CATEGORIES, searchRoomCategories);
}

function* watchRoom() {
    yield all([
        fork(watchSearch),
    ]);
}

export default watchRoom;