import { STATUS_COLORS } from "./color";

export const ACTIVITY_TAG_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
}

export const LIST_ACTIVITY_TAG_STATUS = [
    {
        label: "Đang sử dụng",
        value: ACTIVITY_TAG_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã ẩn",
        value: ACTIVITY_TAG_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Đã xóa",
        value: ACTIVITY_TAG_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

export const findActivityTagStatus = (value: number) => {
    return value != null && LIST_ACTIVITY_TAG_STATUS.find(item => item.value === value);
}
