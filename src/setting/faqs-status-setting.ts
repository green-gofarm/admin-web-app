import { STATUS_COLORS } from "./color";

export enum FAQ_STATUSES {
    ACTIVE = 1,
    INACTIVE = 2,
    DELETED = 3,
}

export const LIST_FAQ_STATUS = [
    {
        label: "Đang sử dụng",
        value: FAQ_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã khóa",
        value: FAQ_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findFaqStatus = (value: number) => {
    return value != null && LIST_FAQ_STATUS.find(item => item.value === value);
}

