import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface State {
    roomCategories: any
}

const initialState: State = {
    roomCategories: null
};


function roomReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_ROOM_CATEGORIES_SUCCESS:
            return { ...state, roomCategories: action.payload };
        case type.SEARCH_ROOM_CATEGORIES_FAILED:
            return { ...state, roomCategories: null };
        default:
            return state
    }
}


export default roomReducer;