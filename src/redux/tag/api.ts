import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import { axiosRequest } from "../../helpers/axios";

export function searchTagCategories(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.TAG_CATEGORY}/search`;
    return axiosRequest(url, option, _params);
}


export function getAllTagCategories() {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }


    const url = `${ENP.TAG_CATEGORY}`;
    return axiosRequest(url, option);
}


export function createTag(data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify([data] ?? {})
    }

    const url = `${ENP.TAG_CATEGORY}`;
    return axiosRequest(url, option);
}


export function updateTag(id: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.TAG_CATEGORY}/${id}`;
    return axiosRequest(url, option);
}

export function getTagDetail(id: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.TAG_CATEGORY}/${id}`;
    return axiosRequest(url, option);
}