import { all } from "redux-saga/effects";
import watchAuth from "./auth/saga";
import watchFarmstay from "./farmstay/saga";
import watchService from "./service/saga";
import watchRoom from "./room/saga";
import watchFeedback from "./feedback/saga";
import watchUser from "./user/saga";
import watchOrder from "./order/saga";
import watchTag from "./tag/saga";

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchFarmstay(),
        watchService(),
        watchRoom(),
        watchFeedback(),
        watchUser(),
        watchOrder(),
        watchTag(),
    ]);
}