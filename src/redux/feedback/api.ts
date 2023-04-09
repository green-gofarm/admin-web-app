import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import { axiosRequest } from "../../helpers/axios";

export function searchFeedbacks(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.FEEDBACK}/search`;
    return axiosRequest(url, option, _params);
}


export function updateFeedbackStatus(feedbackId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.ADMIN}/feedbacks/${feedbackId}/status`;
    return axiosRequest(url, option);
}