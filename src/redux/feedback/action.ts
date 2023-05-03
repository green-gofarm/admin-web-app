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

export const updateFeedbackStatus = (id: any, data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.UPDATE_FEEDBACK_STATUS,
    payload: { id, data, option: option ?? getEmptyOption() }
})

export const hostReportFeedback = (hostId: any, orderId: any, feedbackId: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.HOST_REPORT_FEEDBACK,
    payload: { hostId, orderId, feedbackId, option: option ?? getEmptyOption() }
})