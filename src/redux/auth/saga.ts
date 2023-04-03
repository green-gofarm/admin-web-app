import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects";
import * as types from "./type";
import * as apis from "./api";
import * as actions from "./action";

function* signUpHost(action: IReduxAction): Generator<any, void, any> {
    const token = action.payload?.token;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.signUpHost, token);
        yield put(actions.signUpHostSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);
        option?.onFailure && option.onFailure(error);
    }

    option?.loading && option.loading(false);
}

function* watchSignUp() {
    yield takeLatest(types.SIGN_UP_HOST, signUpHost);
}

function* signInAdmin(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.signInAdmin);
        yield put(actions.signInSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);
        option?.onFailure && option.onFailure(error);
    }

    option?.loading && option.loading(false);
}

function* signInHost(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.signInHost);
        yield put(actions.signInSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);
        option?.onFailure && option.onFailure(error);
    }

    option?.loading && option.loading(false);
}

function* subscribeMessageToken(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.subscribeMessageToken, action.payload.token);
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        console.log(error);
        option?.onFailure && option.onFailure(error);
    }

    option?.loading && option.loading(false);
}

function* searchNotification(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchNotification, data?.params);
        yield put(actions.searchNotificationSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchNotificationFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* markAsRedNotification(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.markAsRedNotification, action.payload.id);
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* checkNewlySignupAccount(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.checkNewlySignupAccount, action.payload.token);
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* watchSignIn() {
    yield takeLatest(types.SIGN_IN_ADMIN, signInAdmin);
    yield takeLatest(types.SIGN_IN_HOST, signInHost);
    yield takeLatest(types.SUBSCRIBE_TOKEN, subscribeMessageToken);
    yield takeEvery(types.SEARCH_NOTIFICATION, searchNotification);
    yield takeLatest(types.MARK_AS_READ_NOTIFICATION, markAsRedNotification);
    yield takeLatest(types.CHECK_NEWLY_SIGNUP_ACCOUNT, checkNewlySignupAccount);
}

function* watchAuth() {
    yield all([
        fork(watchSignUp),
        fork(watchSignIn),
    ]);
}

export default watchAuth;