import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const searchTagCategories = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_TAG_CATEGORIES,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchTagCategoriesSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_TAG_CATEGORIES_SUCCESS,
    payload: data
})

export const searchTagCategoriesFailed = (): IReduxAction => ({
    type: type.SEARCH_TAG_CATEGORIES_FAILED
})


export const getAllTagCategories = (option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ALL_TAG_CATEGORIES,
    payload: { option: option ?? getEmptyOption() }
})

export const getAllTagCategoriesSuccess = (data: any): IReduxAction => ({
    type: type.GET_ALL_TAG_CATEGORIES_SUCCESS,
    payload: data
})

export const getAllTagCategoriesFailed = (): IReduxAction => ({
    type: type.GET_ALL_TAG_CATEGORIES_FAILED
})


export const createTag = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.CREATE_TAG,
    payload: { data, option: option ?? getEmptyOption() }
})
export const createTagSuccess = (data: any): IReduxAction => ({
    type: type.CREATE_TAG_SUCCESS,
    payload: data
})
export const createTagFailed = (): IReduxAction => ({
    type: type.CREATE_TAG_FAILED
})

export const updateTag = (id: any, data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.UPDATE_TAG,
    payload: { id, data, option: option ?? getEmptyOption() }
})
export const updateTagSuccess = (data: any): IReduxAction => ({
    type: type.UPDATE_TAG_SUCCESS,
    payload: data
})
export const updateTagFailed = (): IReduxAction => ({
    type: type.UPDATE_TAG_FAILED
})

export const getTagDetail = (id: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_TAG_DETAIL,
    payload: { id, option: option ?? getEmptyOption() }
})
export const getTagDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_TAG_DETAIL_SUCCESS,
    payload: data
})
export const getTagDetailFailed = (): IReduxAction => ({
    type: type.GET_TAG_DETAIL_FAILED
})
