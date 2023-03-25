import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import { axiosRequest } from "../../helpers/axios";

export function searchOrders(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.BOOKING}/search`;
    return axiosRequest(url, option, _params);
}

export function searchDisbursements(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.DISBURSEMENT}/search`;
    return axiosRequest(url, option, _params);
}


export function getOrderDetail(id: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.BOOKING}/${id}`;
    return axiosRequest(url, option);
}


export function getDisbursementDetail(id: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.DISBURSEMENT}/${id}`;
    return axiosRequest(url, option);
}
