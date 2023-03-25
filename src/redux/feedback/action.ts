import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const searchFeedbacks = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_FEEDBACKS,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchFeedbacksSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_FEEDBACKS_SUCCESS,
    payload: data
})

export const searchFeedbacksFailed = (): IReduxAction => ({
    type: type.SEARCH_FEEDBACKS_FAILED
})