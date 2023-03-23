import { IReduxAction, IReduxActionOption } from './../redux-setting';
import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import * as types from "./type";
import * as apis from "./api";
import * as actions from "./action";
import { ROLES } from '../../setting/setting';

function* searchUsers(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchUsers, data?.params);
        yield put(actions.searchUsersSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchUsersFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchAllUsers(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    const params = {
        page: 1,
        pageSize: 1000000,
    }
    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchUsers, params);
        yield put(actions.searchAllUsersSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchAllUsersFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchHosts(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchUsersWithRole, data?.params, ROLES.HOST);
        yield put(actions.searchHostsSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchHostsFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchAllHosts(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    const params = {
        page: 1,
        pageSize: 1000000,
    }
    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchUsersWithRole, params, ROLES.HOST);
        yield put(actions.searchAllHostsSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchAllHostsFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchCustomers(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchUsersWithRole, data?.params, ROLES.CUSTOMER);
        yield put(actions.searchCustomersSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchCustomersFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchAllCustomers(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    const params = {
        page: 1,
        pageSize: 1000000,
    }
    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchUsersWithRole, params, ROLES.CUSTOMER);
        yield put(actions.searchAllCustomersSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchAllCustomersFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchAdmins(action: IReduxAction): Generator<any, void, any> {
    const data = action.payload?.data;
    const option: IReduxActionOption = action.payload?.option

    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchUsersWithRole, data?.params, ROLES.ADMIN);
        yield put(actions.searchAdminsSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchAdminsFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* searchAllAdmins(action: IReduxAction): Generator<any, void, any> {
    const option: IReduxActionOption = action.payload?.option

    const params = {
        page: 1,
        pageSize: 1000000,
    }
    option?.loading && option.loading(true);
    try {
        const response = yield call(apis.searchUsersWithRole, params, ROLES.ADMIN);
        yield put(actions.searchAllAdminsSuccess(response));
        option?.onSuccess && option.onSuccess(response);
    } catch (error) {
        yield put(actions.searchAllAdminsFailed());
        option?.onFailure && option.onFailure(error);
        console.log(error);
    }

    option?.loading && option.loading(false);
}

function* watchAll() {
    yield takeLatest(types.SEARCH_USERS, searchUsers);
    yield takeLatest(types.SEARCH_ALL_USERS, searchAllUsers);

    yield takeLatest(types.SEARCH_HOSTS, searchHosts);
    yield takeLatest(types.SEARCH_ALL_HOSTS, searchAllHosts);

    yield takeLatest(types.SEARCH_CUSTOMERS, searchCustomers);
    yield takeLatest(types.SEARCH_ALL_CUSTOMERS, searchAllCustomers);

    yield takeLatest(types.SEARCH_ADMINS, searchAdmins);
    yield takeLatest(types.SEARCH_ALL_ADMINS, searchAllAdmins);
}

function* watchUser() {
    yield all([
        fork(watchAll),
    ]);
}

export default watchUser;