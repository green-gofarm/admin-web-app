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
