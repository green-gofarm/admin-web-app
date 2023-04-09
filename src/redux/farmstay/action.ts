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

export const getFarmstaySchedule = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_FARMSTAY_SCHEDULE,
    payload: { data, option: option ?? getEmptyOption() }
})

export const getFarmstayScheduleSuccess = (data: any): IReduxAction => ({
    type: type.GET_FARMSTAY_SCHEDULE_SUCCESS,
    payload: data
})

export const getFarmstayScheduleFailed = (): IReduxAction => ({
    type: type.GET_FARMSTAY_SCHEDULE_FAILED
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

// CRUD farmstay
export const createFarmstay = (hostId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.CREATE_FARMSTAY,
    payload: { hostId, data, option: option ?? getEmptyOption() }
})

export const updateFarmstay = (hostId: any, farmstayId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.UPDATE_FARMSTAY,
    payload: { hostId, farmstayId, data, option: option ?? getEmptyOption() }
})

// CRUD activity
export const createFarmstayActivities = (hostId: any, farmstayId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.CREATE_FARMSTAY_ACTIVITIES,
    payload: { hostId, farmstayId, data, option: option ?? getEmptyOption() }
})

export const updateFarmstayActivities = (hostId: any, farmstayId: any, activityId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.UPDATE_FARMSTAY_ACTIVITIES,
    payload: { hostId, farmstayId, activityId, data, option: option ?? getEmptyOption() }
})

// CRUD policies
export const createFarmstayPolicies = (hostId: any, farmstayId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.CREATE_FARMSTAY_POLICIES,
    payload: { hostId, farmstayId, data, option: option ?? getEmptyOption() }
})

export const updateFarmstayPolicies = (hostId: any, farmstayId: any, policyId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.UPDATE_FARMSTAY_POLICIES,
    payload: { hostId, farmstayId, policyId, data, option: option ?? getEmptyOption() }
})

// CRUD services
export const createFarmstayServices = (hostId: any, farmstayId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.CREATE_FARMSTAY_SERVICES,
    payload: { hostId, farmstayId, data, option: option ?? getEmptyOption() }
})

export const updateFarmstayServices = (hostId: any, farmstayId: any, serviceId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.UPDATE_FARMSTAY_SERVICES,
    payload: { hostId, farmstayId, serviceId, data, option: option ?? getEmptyOption() }
})

// CRUD rooms
export const createFarmstayRooms = (hostId: any, farmstayId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.CREATE_FARMSTAY_ROOMS,
    payload: { hostId, farmstayId, data, option: option ?? getEmptyOption() }
})

export const updateFarmstayRooms = (hostId: any, farmstayId: any, roomId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.UPDATE_FARMSTAY_ROOMS,
    payload: { hostId, farmstayId, roomId, data, option: option ?? getEmptyOption() }
})

// CRUD faqs
export const createFarmstayFaqs = (hostId: any, farmstayId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.CREATE_FARMSTAY_FAQS,
    payload: { hostId, farmstayId, data, option: option ?? getEmptyOption() }
})

export const updateFarmstayFaqs = (hostId: any, farmstayId: any, faqId: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.UPDATE_FARMSTAY_FAQS,
    payload: { hostId, farmstayId, faqId, data, option: option ?? getEmptyOption() }
})


export const reviewFarmstay = (id: any, data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.REVIEW_FARMSTAY,
    payload: { id, data, option: option ?? getEmptyOption() }
})

export const storeProvinces = (data: any): IReduxAction => ({
    type: type.STORE_PROVINCES,
    payload: data,
})

export const storeDistricts = (data: any): IReduxAction => ({
    type: type.STORE_DISTRICTS,
    payload: data,
})

export const storeWards = (data: any): IReduxAction => ({
    type: type.STORE_WARDS,
    payload: data,
})

export const uploadImage = (data: any, option?: ReduxActionOption): IReduxAction => ({
    type: type.UPLOAD_IMAGE,
    payload: { data, option: option ?? getEmptyOption() }
})

export const getBankList = (option?: ReduxActionOption): IReduxAction => ({
    type: type.GET_BANK_LIST,
    payload: { option: option ?? getEmptyOption() }
})

export const getBankListSuccess = (data: any): IReduxAction => ({
    type: type.GET_BANK_LIST_SUCCESS,
    payload: data
})

export const getBankListFailed = (): IReduxAction => ({
    type: type.GET_BANK_LIST_FAILED
})