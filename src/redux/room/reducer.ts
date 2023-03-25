import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface RoomState {
    roomCategories: any,
    allRoomCategories: [],
    roomCategoryDetail: any,
}

const initialState: RoomState = {
    roomCategories: null,
    allRoomCategories: [],
    roomCategoryDetail: null
};


function roomReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_ROOM_CATEGORIES_SUCCESS:
            return { ...state, roomCategories: action.payload };
        case type.SEARCH_ROOM_CATEGORIES_FAILED:
            return { ...state, roomCategories: null };

        case type.GET_ALL_ROOM_CATEGORIES_SUCCESS:
            return { ...state, allRoomCategories: action.payload.data };
        case type.GET_ALL_ROOM_CATEGORIES_FAILED:
            return { ...state, allRoomCategories: [] };

        case type.GET_ROOM_CATEGORY_DETAIL_SUCCESS:
            return { ...state, roomCategoryDetail: action.payload.data };
        case type.GET_ROOM_CATEGORY_DETAIL_FAILED:
            return { ...state, roomCategoryDetail: null };
        default:
            return state
    }
}


export default roomReducer;