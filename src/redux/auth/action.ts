import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const signInHost = (option?: IReduxActionOption): IReduxAction => ({
    type: type.SIGN_IN_HOST,
    payload: { option: option ?? getEmptyOption() }
})

export const signUpHost = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SIGN_UP_HOST,
    payload: { data, option: option ?? getEmptyOption() }
})

export const signUpHostSuccess = (data: any): IReduxAction => ({
    type: type.SIGN_UP_HOST_SUCCESS,
    payload: data
})

export const signUpAdmin = (token: string, option?: IReduxActionOption): IReduxAction => ({
    type: type.SIGN_UP_ADMIN,
    payload: { token, option: option ?? getEmptyOption() }
})

export const signUpAdminSuccess = (data: any): IReduxAction => ({
    type: type.SIGN_UP_ADMIN_SUCCESS,
    payload: data
})

export const signInAdmin = (option?: IReduxActionOption): IReduxAction => ({
    type: type.SIGN_IN_ADMIN,
    payload: { option: option ?? getEmptyOption() }
})

export const signInSuccess = (data: any): IReduxAction => ({
    type: type.SIGN_IN_SUCCESS,
    payload: data
})

export const signOutUser = (): IReduxAction => ({
    type: type.SIGN_OUT_USER,
})

export const subscribeMessageToken = (token: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SUBSCRIBE_TOKEN,
    payload: { token, option: option ?? getEmptyOption() }
})

export const searchNotification = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_NOTIFICATION,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchNotificationSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_NOTIFICATION_SUCCESS,
    payload: data
})

export const searchNotificationFailed = (): IReduxAction => ({
    type: type.SEARCH_NOTIFICATION_FAILED
})

export const markAsRedNotification = (id: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.MARK_AS_READ_NOTIFICATION,
    payload: { id, option: option ?? getEmptyOption() }
})


export const checkNewlySignUpAccount = (token: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.CHECK_NEWLY_SIGNUP_ACCOUNT,
    payload: { token, option: option ?? getEmptyOption() }
})
