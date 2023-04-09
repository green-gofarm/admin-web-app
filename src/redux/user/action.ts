import { IReduxAction, ReduxActionOption } from './../redux-setting';
import { IReduxActionOption } from "../redux-setting";
import * as type from "./type";

function getEmptyOption() {
    return new ReduxActionOption();
}

export const searchUsers = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_USERS,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchUsersSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_USERS_SUCCESS,
    payload: data
})

export const searchUsersFailed = (): IReduxAction => ({
    type: type.SEARCH_USERS_FAILED
})

export const searchAllUsers = (option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_ALL_USERS,
    payload: { option: option ?? getEmptyOption() }
})

export const searchAllUsersSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_ALL_USERS_SUCCESS,
    payload: data
})

export const searchAllUsersFailed = (): IReduxAction => ({
    type: type.SEARCH_ALL_USERS_FAILED
})


// Host
export const searchHosts = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_HOSTS,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchHostsSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_HOSTS_SUCCESS,
    payload: data
})

export const searchHostsFailed = (): IReduxAction => ({
    type: type.SEARCH_HOSTS_FAILED
})

export const searchAllHosts = (option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_ALL_HOSTS,
    payload: { option: option ?? getEmptyOption() }
})

export const searchAllHostsSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_ALL_HOSTS_SUCCESS,
    payload: data
})

export const searchAllHostsFailed = (): IReduxAction => ({
    type: type.SEARCH_ALL_HOSTS_FAILED
})

// Customer
export const searchCustomers = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_CUSTOMERS,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchCustomersSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_CUSTOMERS_SUCCESS,
    payload: data
})

export const searchCustomersFailed = (): IReduxAction => ({
    type: type.SEARCH_CUSTOMERS_FAILED
})

export const searchAllCustomers = (option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_ALL_CUSTOMERS,
    payload: { option: option ?? getEmptyOption() }
})

export const searchAllCustomersSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_ALL_CUSTOMERS_SUCCESS,
    payload: data
})

export const searchAllCustomersFailed = (): IReduxAction => ({
    type: type.SEARCH_ALL_CUSTOMERS_FAILED
})

// admin
export const searchAdmins = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_ADMINS,
    payload: { data, option: option ?? getEmptyOption() }
})

export const searchAdminsSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_ADMINS_SUCCESS,
    payload: data
})

export const searchAdminsFailed = (): IReduxAction => ({
    type: type.SEARCH_ADMINS_FAILED
})

export const searchAllAdmins = (option?: IReduxActionOption): IReduxAction => ({
    type: type.SEARCH_ALL_ADMINS,
    payload: { option: option ?? getEmptyOption() }
})

export const searchAllAdminsSuccess = (data: any): IReduxAction => ({
    type: type.SEARCH_ALL_ADMINS_SUCCESS,
    payload: data
})

export const searchAllAdminsFailed = (): IReduxAction => ({
    type: type.SEARCH_ALL_ADMINS_FAILED
})


// Get user detail
export const getUserDetail = (id: any, role: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.GET_USER_DETAIL,
    payload: { id, role, option: option ?? getEmptyOption() }
})

export const getUserDetailSuccess = (data: any): IReduxAction => ({
    type: type.GET_USER_DETAIL_SUCCESS,
    payload: data
})

export const getUserDetailFailed = (): IReduxAction => ({
    type: type.GET_USER_DETAIL_FAILED
})

export const clearUserDetail = (): IReduxAction => ({
    type: type.CLEAR_USER_DETAIL
})


//update user
export const updateHostMyProfile = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.UPDATE_HOST_MY_PROFILE,
    payload: { data, option: option ?? getEmptyOption() }
})

export const updateHostMyProfileSuccess = (data: any): IReduxAction => ({
    type: type.UPDATE_HOST_MY_PROFILE_SUCCESS,
    payload: data,
})

export const updateAdminMyProfile = (data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.UPDATE_ADMIN_MY_PROFILE,
    payload: { data, option: option ?? getEmptyOption() }
})

export const updateAdminMyProfileSuccess = (data: any): IReduxAction => ({
    type: type.UPDATE_ADMIN_MY_PROFILE_SUCCESS,
    payload: data,
})


export const updateHostStatus = (id: any, data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.UPDATE_HOST_STATUS,
    payload: { id, data, option: option ?? getEmptyOption() }
});

export const updateCustomerStatus = (id: any, data: any, option?: IReduxActionOption): IReduxAction => ({
    type: type.UPDATE_CUSTOMER_STATUS,
    payload: { id, data, option: option ?? getEmptyOption() }
});