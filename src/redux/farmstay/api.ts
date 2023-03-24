import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import { axiosRequest } from "../../helpers/axios";

export function searchFarmstays(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.FARMSTAY}/search`;
    return axiosRequest(url, option, _params);
}

export function getFarmstayDetail(id: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.FARMSTAY}/${id}`;
    return axiosRequest(url, option);
}


export function getActivityDetail(farmstayId: any, activityId: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.FARMSTAY}/${farmstayId}/activities/${activityId}`;
    return axiosRequest(url, option);
}

export function getActivitySchedule(farmstayId: any, activityId: any, date: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        date,
    }

    const url = `${ENP.FARMSTAY}/${farmstayId}/activities/${activityId}/schedule`;
    return axiosRequest(url, option, _params);
}
