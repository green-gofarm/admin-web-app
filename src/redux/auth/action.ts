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

export const signUpHost = (token: string, option?: IReduxActionOption): IReduxAction => ({
    type: type.SIGN_UP_HOST,
    payload: { token, option: option ?? getEmptyOption() }
})

export const signUpHostSuccess = (data: any): IReduxAction => ({
    type: type.SIGN_UP_HOST_SUCCESS,
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
