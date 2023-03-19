import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork } from "redux-saga/effects";
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

function* watchSignIn() {
    yield takeLatest(types.SIGN_IN_ADMIN, signInAdmin);
    yield takeLatest(types.SIGN_IN_HOST, signInHost);
}

function* watchAuth() {
    yield all([
        fork(watchSignUp),
        fork(watchSignIn),
    ]);
}

export default watchAuth;