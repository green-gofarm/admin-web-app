import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface State {
    feedbacks: any
}

const initialState: State = {
    feedbacks: null
};


function feedbackReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_FEEDBACKS_SUCCESS:
            return { ...state, feedbacks: action.payload };
        case type.SEARCH_FEEDBACKS_FAILED:
            return { ...state, feedbacks: null };
        default:
            return state
    }
}


export default feedbackReducer;