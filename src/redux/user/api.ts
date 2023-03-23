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
        role,
    }

    const url = `${ENP.USER}/search`;
    return axiosRequest(url, option, _params);
}
