import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface State {
    farmstays: any,
    allFarmstays: any[],
    farmstayDetail: any,
    activityDetail: any,
    activitySchedule: any,
}

const initialState: State = {
    farmstays: null,
    allFarmstays: [],
    farmstayDetail: null,
    activityDetail: null,
    activitySchedule: null,
};

function farmstayReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_FARMSTAY_SUCCESS:
            return { ...state, farmstays: action.payload };
        case type.SEARCH_FARMSTAY_FAILED:
            return { ...state, farmstays: null };

        case type.SEARCH_ALL_FARMSTAYS_SUCCESS:
            return { ...state, allFarmstays: action.payload };
        case type.SEARCH_ALL_FARMSTAYS_FAILED:
            return { ...state, allFarmstays: [] };

        case type.GET_FARMSTAY_DETAIL_SUCCESS:
            return { ...state, farmstayDetail: action.payload.data };
        case type.GET_FARMSTAY_DETAIL_FAILED:
            return { ...state, farmstayDetail: null };
        case type.CLEAR_FARMSTAY_DETAIL:
            return { ...state, farmstayDetail: null };

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
        default:
            return state
    }
}


export default farmstayReducer;