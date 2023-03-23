import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const searchRoomCategories = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_ROOM_CATEGORIES,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchRoomCategoriesSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_ROOM_CATEGORIES_SUCCESS,
    payload: data
})

export const searchRoomCategoriesFailed = (): IReduxAction => ({
    type: type.SEARCH_ROOM_CATEGORIES_FAILED
})