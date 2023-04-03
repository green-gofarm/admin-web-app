import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface ServiceState {
    serviceCategories: any,
    allServiceCategories: any[],
    serviceCategoryDetail: any,
}

const initialState: ServiceState = {
    serviceCategories: null,
    allServiceCategories: [],
    serviceCategoryDetail: null,
};


function serviceReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_SERVICE_CATEGORIES_SUCCESS:
            return { ...state, serviceCategories: action.payload };
        case type.SEARCH_SERVICE_CATEGORIES_FAILED:
            return { ...state, serviceCategories: null };


        case type.GET_ALL_SERVICE_CATEGORIES_SUCCESS:
            return { ...state, allServiceCategories: action.payload.data };
        case type.GET_ALL_SERVICE_CATEGORIES_FAILED:
            return { ...state, allServiceCategories: [] };

        case type.GET_SERVICE_CATEGORY_DETAIL_SUCCESS:
            return { ...state, serviceCategoryDetail: action.payload.data };
        case type.GET_SERVICE_CATEGORY_DETAIL_FAILED:
            return { ...state, serviceCategoryDetail: null };
        default:
            return state
    }
}


export default serviceReducer;