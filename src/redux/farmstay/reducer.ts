import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface State {
    farmstays: any,
    allFarmstays: any[],
}

const initialState: State = {
    farmstays: null,
    allFarmstays: []
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
        default:
            return state
    }
}


export default farmstayReducer;