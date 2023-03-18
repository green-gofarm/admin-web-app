import { STATUS_COLORS } from "./color";

export const ACTIVITY_STATUSES = {
    AVAILABLE: 1,
    INACTIVE: 2,
    DELETED: 3,
}

export const LIST_ACTIVITY_STATUS = [
    {
        label: "Đang triển khai",
        value: ACTIVITY_STATUSES.AVAILABLE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã ẩn",
        value: ACTIVITY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Đã xóa",
        value: ACTIVITY_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

export const findActivityStatus = (value: number) => {
    return value != null && LIST_ACTIVITY_STATUS.find(item => item.value === value);
}
