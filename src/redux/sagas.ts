import { all } from "redux-saga/effects";
import watchAuth from "./auth/saga";

export default function* rootSaga() {
    yield all([watchAuth()]);
}