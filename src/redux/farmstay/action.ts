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


export const getFarmstayDetail = (id: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_FARMSTAY_DETAIL,
    payload: { id, option: option ?? getEmptyOption() }
})

export const getFarmstayDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_FARMSTAY_DETAIL_SUCCESS,
    payload: data
})

export const getFarmstayDetailFailed = (): IReduxAction => ({
    type: type.GET_FARMSTAY_DETAIL_FAILED
})

export const clearFarmstayDetail = (): IReduxAction => ({
    type: type.CLEAR_FARMSTAY_DETAIL
})


//Activity
export const getActivityDetail = (farmstayId: any, activityId: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ACTIVITY_DETAIL,
    payload: { farmstayId, activityId, option: option ?? getEmptyOption() }
})

export const getActivityDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_ACTIVITY_DETAIL_SUCCESS,
    payload: data
})

export const getActivityDetailFailed = (): IReduxAction => ({
    type: type.GET_ACTIVITY_DETAIL_FAILED
})

export const clearActivityDetail = (): IReduxAction => ({
    type: type.CLEAR_ACTIVITY_DETAIL
})

export const getActivitySchedule = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ACTIVITY_SCHEDULE,
    payload: { data, option: option ?? getEmptyOption() }
})

export const getActivityScheduleSuccess = (data: any): IReduxAction => ({
    type: type.GET_ACTIVITY_SCHEDULE_SUCCESS,
    payload: data
})

export const getActivityScheduleFailed = (): IReduxAction => ({
    type: type.GET_ACTIVITY_SCHEDULE_FAILED
})


// Room
export const getRoomDetail = (farmstayId: any, roomId: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ROOM_DETAIL,
    payload: { farmstayId, roomId, option: option ?? getEmptyOption() }
})

export const getRoomDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_ROOM_DETAIL_SUCCESS,
    payload: data
})

export const getRoomDetailFailed = (): IReduxAction => ({
    type: type.GET_ROOM_DETAIL_FAILED
})

export const clearRoomDetail = (): IReduxAction => ({
    type: type.CLEAR_ROOM_DETAIL
})

export const getRoomSchedule = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ROOM_SCHEDULE,
    payload: { data, option: option ?? getEmptyOption() }
})

export const getRoomScheduleSuccess = (data: any): IReduxAction => ({
    type: type.GET_ROOM_SCHEDULE_SUCCESS,
    payload: data
})

export const getRoomScheduleFailed = (): IReduxAction => ({
    type: type.GET_ROOM_SCHEDULE_FAILED
})