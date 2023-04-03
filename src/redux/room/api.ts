import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import { axiosRequest } from "../../helpers/axios";

export function searchRoomCategories(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.ROOM_CATEGORY}/search`;
    return axiosRequest(url, option, _params);
}


export function getAllRoomCategories() {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }


    const url = `${ENP.ROOM_CATEGORY}`;
    return axiosRequest(url, option);
}



export function createRoomCategory(data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify([data] ?? {})
    }

    const url = `${ENP.ROOM_CATEGORY}`;
    return axiosRequest(url, option);
}


export function updateRoomCategory(id: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.ROOM_CATEGORY}/${id}`;
    return axiosRequest(url, option);
}

export function getRoomCategoryDetail(id: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.ROOM_CATEGORY}/${id}`;
    return axiosRequest(url, option);
}