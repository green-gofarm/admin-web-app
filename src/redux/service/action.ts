import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const searchServiceCategories = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_SERVICE_CATEGORIES,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchServiceCategoriesSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_SERVICE_CATEGORIES_SUCCESS,
    payload: data
})

export const searchServiceCategoriesFailed = (): IReduxAction => ({
    type: type.SEARCH_SERVICE_CATEGORIES_FAILED
})


export const getAllServiceCategories = (option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_ALL_SERVICE_CATEGORIES,
    payload: { option: option ?? getEmptyOption() }
})

export const getAllServiceCategoriesSuccess = (data: any): IReduxAction => ({
    type: type.GET_ALL_SERVICE_CATEGORIES_SUCCESS,
    payload: data
})

export const getAllServiceCategoriesFailed = (): IReduxAction => ({
    type: type.GET_ALL_SERVICE_CATEGORIES_FAILED
})


export const createServiceCategory = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.CREATE_SERVICE_CATEGORY,
    payload: { data, option: option ?? getEmptyOption() }
})
export const createServiceCategorySuccess = (data: any): IReduxAction => ({
    type: type.CREATE_SERVICE_CATEGORY_SUCCESS,
    payload: data
})
export const createServiceCategoryFailed = (): IReduxAction => ({
    type: type.CREATE_SERVICE_CATEGORY_FAILED
})

export const updateServiceCategory = (id: any, data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.UPDATE_SERVICE_CATEGORY,
    payload: { id, data, option: option ?? getEmptyOption() }
})
export const updateServiceCategorySuccess = (data: any): IReduxAction => ({
    type: type.UPDATE_SERVICE_CATEGORY_SUCCESS,
    payload: data
})
export const updateServiceCategoryFailed = (): IReduxAction => ({
    type: type.UPDATE_SERVICE_CATEGORY_FAILED
})

export const getServiceCategoryDetail = (id: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_SERVICE_CATEGORY_DETAIL,
    payload: { id, option: option ?? getEmptyOption() }
})
export const getServiceCategoryDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_SERVICE_CATEGORY_DETAIL_SUCCESS,
    payload: data
})
export const getServiceCategoryDetailFailed = (): IReduxAction => ({
    type: type.GET_SERVICE_CATEGORY_DETAIL_FAILED
})