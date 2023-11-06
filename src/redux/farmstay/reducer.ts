import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface FarmstayState {
    farmstays: any,
    allFarmstays: any[],
    farmstayDetail: any,
    schedule: any,

    activityDetail: any,
    activitySchedule: any,

    roomDetail: any,
    roomSchedule: any,

    provinces: any[],
    districts: any[],
    wards: any[],

    banks: any[],
}

const initialState: FarmstayState = {
    farmstays: null,
    allFarmstays: [],
    farmstayDetail: null,
    schedule: null,

    activityDetail: null,
    activitySchedule: null,

    roomDetail: null,
    roomSchedule: null,

    provinces: [],
    districts: [],
    wards: [],

    banks: []
};

function farmstayReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_FARMSTAY_SUCCESS:
            return { ...state, farmstays: action.payload };
        case type.SEARCH_FARMSTAY_FAILED:
            return { ...state, farmstays: null };

        case type.SEARCH_ALL_FARMSTAYS_SUCCESS:
            return { ...state, allFarmstays: action.payload.data.data };
        case type.SEARCH_ALL_FARMSTAYS_FAILED:
            return { ...state, allFarmstays: [] };

        case type.GET_FARMSTAY_DETAIL_SUCCESS:
            return { ...state, farmstayDetail: action.payload.data };
        case type.GET_FARMSTAY_DETAIL_FAILED:
            return { ...state, farmstayDetail: null };
        case type.CLEAR_FARMSTAY_DETAIL:
            return { ...state, farmstayDetail: null };

        case type.GET_FARMSTAY_SCHEDULE_SUCCESS:
            return { ...state, schedule: action.payload.data };
        case type.GET_FARMSTAY_SCHEDULE_FAILED:
            return { ...state, schedule: null };

        case type.GET_ACTIVITY_DETAIL_SUCCESS:
            return { ...state, activityDetail: action.payload.data };
        case type.GET_ACTIVITY_DETAIL_FAILED:
            return { ...state, activityDetail: null };
        case type.CLEAR_ACTIVITY_DETAIL:
            return { ...state, activityDetail: null };

        case type.GET_ACTIVITY_SCHEDULE_SUCCESS:
            return { ...state, activitySchedule: action.payload.data };
        case type.GET_ACTIVITY_SCHEDULE_FAILED:
            return { ...state, activitySchedule: null };

        case type.GET_ROOM_DETAIL_SUCCESS:
            return { ...state, roomDetail: action.payload.data };
        case type.GET_ROOM_DETAIL_FAILED:
            return { ...state, roomDetail: null };
        case type.CLEAR_ROOM_DETAIL:
            return { ...state, roomDetail: null };

        case type.GET_ROOM_SCHEDULE_SUCCESS:
            return { ...state, roomSchedule: action.payload.data };
        case type.GET_ROOM_SCHEDULE_FAILED:
            return { ...state, roomSchedule: null };

        case type.STORE_PROVINCES:
            return { ...state, provinces: action.payload };
        case type.STORE_DISTRICTS:
            return { ...state, districts: action.payload };
        case type.STORE_WARDS:
            return { ...state, wards: action.payload };

        case type.GET_BANK_LIST_SUCCESS:
            return { ...state, banks: action.payload.data };
        case type.GET_BANK_LIST_FAILED:
            return { ...state, banks: null };
        default:
            return state
    }
}


export default farmstayReducer;