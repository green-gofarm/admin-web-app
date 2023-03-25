import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface TagState {
    tagCategories: any,
    allTagCategories: any[],
    tagDetail: any,
}

const initialState: TagState = {
    tagCategories: null,
    allTagCategories: [],
    tagDetail: null,
};


function tagReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_TAG_CATEGORIES_SUCCESS:
            return { ...state, tagCategories: action.payload };
        case type.SEARCH_TAG_CATEGORIES_FAILED:
            return { ...state, tagCategories: null };


        case type.GET_ALL_TAG_CATEGORIES_SUCCESS:
            return { ...state, allTagCategories: action.payload.data };
        case type.GET_ALL_TAG_CATEGORIES_FAILED:
            return { ...state, allTagCategories: [] };

        case type.GET_TAG_DETAIL_SUCCESS:
            return { ...state, tagDetail: action.payload.data };
        case type.GET_TAG_DETAIL_FAILED:
            return { ...state, tagDetail: null };
        default:
            return state
    }
}


export default tagReducer;