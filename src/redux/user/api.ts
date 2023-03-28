import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import { axiosRequest } from "../../helpers/axios";
import { ROLES } from "../../setting/setting";

export function searchUsers(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.USER}/search`;
    return axiosRequest(url, option, _params);
}

export function searchUsersWithRole(params: any, role: ROLES) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {},
        Role: role,
    }

    const url = `${ENP.USER}/search`;
    return axiosRequest(url, option, _params);
}


export function getUserDetail(id: any, role: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const rolePath = (() => {
        if (role === ROLES.HOST) return "hosts";
        if (role === ROLES.CUSTOMER) return "customers";
        return role;
    })();

    const url = `${ENP.ADMIN}/${rolePath}/${id}`;
    return axiosRequest(url, option);
}


export function updateHostMyProfile(data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/my-profile`;
    return axiosRequest(url, option);
}


export function updateAdminMyProfile(data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.ADMIN}/my-profile`;
    return axiosRequest(url, option);
}
