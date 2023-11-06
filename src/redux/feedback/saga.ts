import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import * as types from "./type";
import * as apis from "./api";
import * as actions from "./action";

function* searchFeedbacks(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchFeedbacks, data?.params);
        yield put(actions.searchFeedbacksSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchFeedbacksFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* updateFeedbackStatus(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.updateFeedbackStatus,
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

function* hostReportFeedback(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(
            apis.hostReportFeedback,
            action.payload.hostId,
            action.payload.orderId,
            action.payload.feedbackId
        );
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* watchSearch() {
    yield takeLatest(types.SEARCH_FEEDBACKS, searchFeedbacks);
    yield takeLatest(types.UPDATE_FEEDBACK_STATUS, updateFeedbackStatus);
    yield takeLatest(types.HOST_REPORT_FEEDBACK, hostReportFeedback);
}

function* watchFeedback() {
    yield all([
        fork(watchSearch),
    ]);
}

export default watchFeedback;