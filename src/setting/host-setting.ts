import { STATUS_COLORS } from "./color";

export const HOST_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    BANNED: 3,
}

export const LIST_HOST_STATUS = [
    {
        label: "Đang hoạt động",
        value: HOST_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Chưa kích hoạt",
        value: HOST_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
    {
        label: "Bị cấm",
        value: HOST_STATUSES.BANNED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
]

export const findHostStatus = (value: number) => {
    return value != null && LIST_HOST_STATUS.find(item => item.value === value);
}
