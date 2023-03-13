import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const signUpHost = (token: string, option?: IReduxActionOption): IReduxAction => ({
    type: type.SIGN_UP_HOST,
    payload: { token, option: option ?? getEmptyOption() }
})

export const signUpHostSuccess = (data: any): IReduxAction => ({
    type: type.SIGN_UP_HOST_SUCCESS,
    payload: data
})

export const signIn = (token: string, option?: IReduxActionOption): IReduxAction => ({
    type: type.SIGN_IN,
    payload: { token, option: option ?? getEmptyOption() }
})


export const signInSuccess = (data: any): IReduxAction => ({
    type: type.SIGN_IN_SUCCESS,
    payload: data
})
