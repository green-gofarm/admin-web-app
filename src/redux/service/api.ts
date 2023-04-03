import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import { axiosRequest } from "../../helpers/axios";

export function searchServiceCategories(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.SERVICE_CATEGORY}/search`;
    return axiosRequest(url, option, _params);
}


export function getAllServiceCategories() {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }


    const url = `${ENP.SERVICE_CATEGORY}`;
    return axiosRequest(url, option);
}


export function createServiceCategory(data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify([data] ?? {})
    }

    const url = `${ENP.SERVICE_CATEGORY}`;
    return axiosRequest(url, option);
}


export function updateServiceCategory(id: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.SERVICE_CATEGORY}/${id}`;
    return axiosRequest(url, option);
}

export function getServiceCategoryDetail(id: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.SERVICE_CATEGORY}/${id}`;
    return axiosRequest(url, option);
}
