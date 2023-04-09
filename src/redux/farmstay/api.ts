import { AxiosRequestConfig } from "axios";
import { ENP, ENP_V2, METHOD } from "../../helpers/api";
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

export function getFarmstaySchedule(farmstayId: any, date: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        date,
    }

    const url = `${ENP.FARMSTAY}/${farmstayId}/schedule`;
    return axiosRequest(url, option, _params);
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



export function getRoomDetail(farmstayId: any, room: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const url = `${ENP.FARMSTAY}/${farmstayId}/rooms/${room}`;
    return axiosRequest(url, option);
}

export function getRoomSchedule(farmstayId: any, roomId: any, date: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.GET,
        headers: {
            "Content-Type": "application/json"
        },
    }

    const _params: Record<string, string> = {
        date,
    }

    const url = `${ENP.FARMSTAY}/${farmstayId}/rooms/${roomId}/schedule`;
    return axiosRequest(url, option, _params);
}

export function createFarmstay(hostId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays`;
    return axiosRequest(url, option);
}


export function updateFarmstay(hostId: any, farmstayId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}`;
    return axiosRequest(url, option);
}


export function createFarmstayActivities(hostId: any, farmstayId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify([data] ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/activities`;
    return axiosRequest(url, option);
}


export function updateFarmstayActivities(hostId: any, farmstayId: any, activityId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/activities/${activityId}`;
    return axiosRequest(url, option);
}

export function createFarmstayServices(hostId: any, farmstayId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify([data] ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/services`;
    return axiosRequest(url, option);
}


export function updateFarmstayServices(hostId: any, farmstayId: any, serviceId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/services/${serviceId}`;
    return axiosRequest(url, option);
}

export function createFarmstayPolicies(hostId: any, farmstayId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/policies`;
    return axiosRequest(url, option);
}


export function updateFarmstayPolicies(hostId: any, farmstayId: any, policyId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/policies/${policyId}`;
    return axiosRequest(url, option);
}

export function createFarmstayRooms(hostId: any, farmstayId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify([data] ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/rooms`;
    return axiosRequest(url, option);
}


export function updateFarmstayRooms(hostId: any, farmstayId: any, roomId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/rooms/${roomId}`;
    return axiosRequest(url, option);
}

export function createFarmstayFaqs(hostId: any, farmstayId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/faqs`;
    return axiosRequest(url, option);
}


export function updateFarmstayFaqs(hostId: any, farmstayId: any, faqId: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.HOST}/${hostId}/farmstays/${farmstayId}/faqs/${faqId}`;
    return axiosRequest(url, option);
}


export function reviewFarmstay(id: any, data: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.PATCH,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data ?? {})
    }

    const url = `${ENP.ADMIN}/farmstays/${id}/status`;
    return axiosRequest(url, option);
}


export function uploadImage(formData: any) {
    const option: AxiosRequestConfig = {
        method: METHOD.POST,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    }

    const url = ENP.IMAGES
    return axiosRequest(url, option);
}
