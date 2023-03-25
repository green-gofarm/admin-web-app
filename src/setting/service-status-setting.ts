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
        label: "Đã ẩn",
        value: SERVICE_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Đã xóa",
        value: SERVICE_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

export const findServiceStatus = (value: number) => {
    return value != null && LIST_SERVICE_STATUS.find(item => item.value === value);
}

