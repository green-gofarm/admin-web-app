import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface State {
    serviceCategories: any
}

const initialState: State = {
    serviceCategories: null
};


function serviceReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_SERVICE_CATEGORIES_SUCCESS:
            return { ...state, serviceCategories: action.payload };
        case type.SEARCH_SERVICE_CATEGORIES_FAILED:
            return { ...state, serviceCategories: null };
        default:
            return state
    }
}


export default serviceReducer;