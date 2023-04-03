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


export const getAllRoomCategories = (option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ALL_ROOM_CATEGORIES,
    payload: { option: option ?? getEmptyOption() }
})

export const getAllRoomCategoriesSuccess = (data: any): IReduxAction => ({
    type: type.GET_ALL_ROOM_CATEGORIES_SUCCESS,
    payload: data
})

export const getAllRoomCategoriesFailed = (): IReduxAction => ({
    type: type.GET_ALL_ROOM_CATEGORIES_FAILED
})


export const createRoomCategory = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.CREATE_ROOM_CATEGORY,
    payload: { data, option: option ?? getEmptyOption() }
})
export const createRoomCategorySuccess = (data: any): IReduxAction => ({
    type: type.CREATE_ROOM_CATEGORY_SUCCESS,
    payload: data
})
export const createRoomCategoryFailed = (): IReduxAction => ({
    type: type.CREATE_ROOM_CATEGORY_FAILED
})

export const updateRoomCategory = (id: any, data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.UPDATE_ROOM_CATEGORY,
    payload: { id, data, option: option ?? getEmptyOption() }
})
export const updateRoomCategorySuccess = (data: any): IReduxAction => ({
    type: type.UPDATE_ROOM_CATEGORY_SUCCESS,
    payload: data
})
export const updateRoomCategoryFailed = (): IReduxAction => ({
    type: type.UPDATE_ROOM_CATEGORY_FAILED
})

export const getRoomCategoryDetail = (id: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ROOM_CATEGORY_DETAIL,
    payload: { id, option: option ?? getEmptyOption() }
})
export const getRoomCategoryDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_ROOM_CATEGORY_DETAIL_SUCCESS,
    payload: data
})
export const getRoomCategoryDetailFailed = (): IReduxAction => ({
    type: type.GET_ROOM_CATEGORY_DETAIL_FAILED
})