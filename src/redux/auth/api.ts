import { AxiosRequestConfig } from "axios";
import { ENP, METHOD } from "../../helpers/api";
import axiosRequest from "../../helpers/axios";

export function signUpHost(token: string) {

    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            accessToken: token
        })
    }

    const url = `${ENP.SIGN_UP}/host`;
    return axiosRequest(url, option);
}

export function signIn(token: string) {

    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            accessToken: token
        })
    }

    const url = `${ENP.SIGN_UP}/host`;
    return axiosRequest(url, option);
}