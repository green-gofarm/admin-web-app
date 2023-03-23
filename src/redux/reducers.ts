import authReducer from './auth/reducer';
import { combineReducers } from "redux";
import farmstayReducer from './farmstay/reducer';
import serviceReducer from './service/reducer';
import roomReducer from './room/reducer';
import feedbackReducer from './feedback/reducer';
import userReducer from './user/reducer';
import orderReducer from './order/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    farmstay: farmstayReducer,
    service: serviceReducer,
    room: roomReducer,
    feedback: feedbackReducer,
    user: userReducer,
    order: orderReducer
});

export default rootReducer;