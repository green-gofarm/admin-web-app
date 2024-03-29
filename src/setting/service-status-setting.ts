import { STATUS_COLORS } from "./color";

export enum SERVICE_STATUSES {
    ACTIVE = 1,
    INACTIVE = 2,
    DELETED = 3,
}

export const LIST_SERVICE_STATUS = [
    {
        label: "Đang sử dụng",
        value: SERVICE_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã khóa",
        value: SERVICE_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findServiceStatus = (value: number) => {
    return value != null && LIST_SERVICE_STATUS.find(item => item.value === value);
}

