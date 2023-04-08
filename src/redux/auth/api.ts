import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import { axiosRequest } from "../../helpers/axios";

export function signUpHost(token: string) {

    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            accessToken: `${token}`
        })
    }

    const url = `${ENP.SIGN_UP}/host`;
    return axiosRequest(url, option);
}

export function signUpAdmin(token: string) {

    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            accessToken: `${token}`
        })
    }

    const url = `${ENP.SIGN_UP}/admin`;
    return axiosRequest(url, option);
}

export function signInAdmin() {
    const url = `${ENP.ADMIN}/my-profile`;
    return axiosRequest(url);
}

export function signInHost() {
    const url = `${ENP.HOST}/my-profile`;
    return axiosRequest(url);
}

export function subscribeMessageToken(token: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            token: `${token}`
        })
    }

    const url = `${ENP.USER}/update-notification-token`;
    return axiosRequest(url, option);
}

export function searchNotification(params: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        ...params ?? {}
    }

    const url = `${ENP.USER}/my-notification/search`;
    return axiosRequest(url, option, _params);
}

export function markAsRedNotification(id: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.USER}/my-notification/${id}/read`;
    return axiosRequest(url, option);
}

export function checkNewlySignupAccount(token: any) {
    const option: RequestInit = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
    }

    const url = `${ENP.USER}/check-status`;
    return fetch(url, option);
}
