import { IReduxAction } from "../redux-setting";
import * as type from "./type";

export interface UserState {
    users: any,
    allUsers: any[],
    hosts: any,
    allHosts: any[],
    customers: any,
    allCustomers: any[],
    admins: any,
    allAdmins: any[],
    userDetail: any,
}

const initialState: UserState = {
    users: null,
    allUsers: [],
    hosts: null,
    allHosts: [],
    customers: null,
    allCustomers: [],
    admins: null,
    allAdmins: [],
    userDetail: null,
};

function userReducer(state = initialState, action: IReduxAction) {
    switch (action.type) {
        case type.SEARCH_USERS_SUCCESS:
            return { ...state, users: action.payload };
        case type.SEARCH_USERS_FAILED:
            return { ...state, users: null };
        case type.SEARCH_ALL_USERS_SUCCESS:
            return { ...state, allUsers: action.payload.data.data };
        case type.SEARCH_ALL_USERS_FAILED:
            return { ...state, allUsers: [] };

        case type.SEARCH_HOSTS_SUCCESS:
            return { ...state, hosts: action.payload };
        case type.SEARCH_HOSTS_FAILED:
            return { ...state, hosts: null };
        case type.SEARCH_ALL_HOSTS_SUCCESS:
            return { ...state, allHosts: action.payload.data.data };
        case type.SEARCH_ALL_HOSTS_FAILED:
            return { ...state, allHosts: [] };

        case type.SEARCH_CUSTOMERS_SUCCESS:
            return { ...state, customers: action.payload };
        case type.SEARCH_CUSTOMERS_FAILED:
            return { ...state, customers: null };
        case type.SEARCH_ALL_CUSTOMERS_SUCCESS:
            return { ...state, allCustomers: action.payload.data.data };
        case type.SEARCH_ALL_CUSTOMERS_FAILED:
            return { ...state, allCustomers: [] };

        case type.SEARCH_ADMINS_SUCCESS:
            return { ...state, admins: action.payload };
        case type.SEARCH_ADMINS_FAILED:
            return { ...state, admins: null };
        case type.SEARCH_ALL_ADMINS_SUCCESS:
            return { ...state, allAdmins: action.payload.data.data };
        case type.SEARCH_ALL_ADMINS_FAILED:
            return { ...state, allAdmins: [] };

        case type.GET_USER_DETAIL_SUCCESS:
            return { ...state, userDetail: action.payload.data };
        case type.GET_USER_DETAIL_FAILED:
            return { ...state, userDetail: null };

        case type.UPDATE_ADMIN_MY_PROFILE_SUCCESS:
            return { ...state, userDetail: action.payload.data };
        case type.UPDATE_HOST_MY_PROFILE_SUCCESS:
            return { ...state, userDetail: action.payload.data };

        default:
            return state
    }
}

export default userReducer;
