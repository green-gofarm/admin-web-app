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

function* getFarmstaySchedule(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getFarmstaySchedule, data.farmstayId, data.date, data.limit);

        yield put(actions.getFarmstayScheduleSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);

        yield put(actions.getFarmstayScheduleFailed());
        option?.onFailure && option.onFailure(error);

    }

    option?.loading && option.loading(false);
}


function* getBankList(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getBankList);

        yield put(actions.getBankListSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);

        yield put(actions.getBankListFailed());
        option?.onFailure && option.onFailure(error);
    }

    option?.loading && option.loading(false);
}

function* getMonthlyReport(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getMonthlyReport);
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);
        option?.onFailure && option.onFailure(error);
    }

    option?.loading && option.loading(false);
}

function* getYearlyReport(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getYearlyReport);
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);
        option?.onFailure && option.onFailure(error);
    }

    option?.loading && option.loading(false);
}


function* watchSearch() {
    yield takeLatest(types.SEARCH_FARMSTAY, searchFarmstays);
    yield takeLatest(types.SEARCH_ALL_FARMSTAYS, searchAllFarmstays);
    yield takeLatest(types.GET_FARMSTAY_DETAIL, getFarmstayDetail);
    yield takeLatest(types.GET_FARMSTAY_SCHEDULE, getFarmstaySchedule);
    yield takeLatest(types.GET_BANK_LIST, getBankList);
    yield takeLatest(types.GET_MONTHLY_REPORT, getMonthlyReport);
    yield takeLatest(types.GET_YEARLY_REPORT, getYearlyReport);
}

function* getActivityDetail(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        yield put(actions.clearActivityDetail());

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
        const response = yield call(apis.getActivitySchedule, data.farmstayId, data.activityId, data.date, data.limit);

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

function* getRoomDetail(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        yield put(actions.clearRoomDetail());
        const response = yield call(apis.getRoomDetail, action.payload.farmstayId, action.payload.roomId);

        yield put(actions.getRoomDetailSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);

        yield put(actions.getRoomDetailFailed());
        option?.onFailure && option.onFailure(error);

    }

    option?.loading && option.loading(false);
}

function* getRoomSchedule(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.getRoomSchedule, data.farmstayId, data.roomId, data.date, data.limit);

        yield put(actions.getRoomScheduleSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);

        yield put(actions.getRoomScheduleFailed());
        option?.onFailure && option.onFailure(error);

    }

    option?.loading && option.loading(false);
}

function* watchRoom() {
    yield takeLatest(types.GET_ROOM_DETAIL, getRoomDetail);
    yield takeLatest(types.GET_ROOM_SCHEDULE, getRoomSchedule);
}

function* createFarmstay(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.createFarmstay, action.payload.hostId, action.payload.data);
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* updateFarmstay(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.updateFarmstay,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* createFarmstayActivities(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.createFarmstayActivities,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* updateFarmstayActivities(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.updateFarmstayActivities,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.activityId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* createFarmstayServices(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.createFarmstayServices,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* updateFarmstayServices(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.updateFarmstayServices,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.serviceId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* createFarmstayPolicies(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.createFarmstayPolicies,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* updateFarmstayPolicies(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.updateFarmstayPolicies,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.policyId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* createFarmstayRooms(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.createFarmstayRooms,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* updateFarmstayRooms(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.updateFarmstayRooms,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.roomId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* createFarmstayFaqs(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.createFarmstayFaqs,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* updateFarmstayFaqs(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.updateFarmstayFaqs,
            action.payload.hostId,
            action.payload.farmstayId,
            action.payload.faqId,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}


function* reviewFarmstay(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.reviewFarmstay,
            action.payload.id,
            action.payload.data
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* uploadImage(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.uploadImage, action.payload.data)
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* watchCRUD() {
    yield takeLatest(types.CREATE_FARMSTAY, createFarmstay);
    yield takeLatest(types.UPDATE_FARMSTAY, updateFarmstay);

    yield takeLatest(types.CREATE_FARMSTAY_ACTIVITIES, createFarmstayActivities);
    yield takeLatest(types.UPDATE_FARMSTAY_ACTIVITIES, updateFarmstayActivities);

    yield takeLatest(types.CREATE_FARMSTAY_SERVICES, createFarmstayServices);
    yield takeLatest(types.UPDATE_FARMSTAY_SERVICES, updateFarmstayServices);

    yield takeLatest(types.CREATE_FARMSTAY_POLICIES, createFarmstayPolicies);
    yield takeLatest(types.UPDATE_FARMSTAY_POLICIES, updateFarmstayPolicies);

    yield takeLatest(types.CREATE_FARMSTAY_ROOMS, createFarmstayRooms);
    yield takeLatest(types.UPDATE_FARMSTAY_ROOMS, updateFarmstayRooms);

    yield takeLatest(types.CREATE_FARMSTAY_FAQS, createFarmstayFaqs);
    yield takeLatest(types.UPDATE_FARMSTAY_FAQS, updateFarmstayFaqs);

    yield takeLatest(types.REVIEW_FARMSTAY, reviewFarmstay);

    yield takeLatest(types.UPLOAD_IMAGE, uploadImage);
}

function* watchFarmstay() {
    yield all([
        fork(watchSearch),
        fork(watchActivity),
        fork(watchRoom),
        fork(watchCRUD)
    ]);
}

export default watchFarmstay;