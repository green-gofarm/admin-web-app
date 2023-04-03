import { STATUS_COLORS } from "./color";

export enum ACTIVITY_STATUSES {
    ACTIVE = 1,
    INACTIVE = 2,
    DELETED = 3,
}

export const LIST_ACTIVITY_STATUS = [
    {
        label: "Đang triển khai",
        value: ACTIVITY_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã khóa",
        value: ACTIVITY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findActivityStatus = (value: number) => {
    return value != null && LIST_ACTIVITY_STATUS.find(item => item.value === value);
}
