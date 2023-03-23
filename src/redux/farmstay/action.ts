import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const searchFarmstay = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_FARMSTAY,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchFarmstaySuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_FARMSTAY_SUCCESS,
    payload: data
})

export const searchFarmstayFailed = (): IReduxAction => ({
    type: type.SEARCH_FARMSTAY_FAILED
})

export const searchAllFarmstays = (option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_ALL_FARMSTAYS,
    payload: { option: option ?? getEmptyOption() }
})

export const searchAllFarmstaysSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_ALL_FARMSTAYS_SUCCESS,
    payload: data
})

export const searchAllFarmstaysFailed = (): IReduxAction => ({
    type: type.SEARCH_ALL_FARMSTAYS_FAILED
})