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