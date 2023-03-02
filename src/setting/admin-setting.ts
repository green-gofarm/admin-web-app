import { STATUS_COLORS } from "./color";

export const ADMIN_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
}

export const LIST_ADMIN_STATUS = [
    {
        label: "Đang hoạt động",
        value: ADMIN_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Chưa kích hoạt",
        value: ADMIN_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Ngưng hoạt động",
        value: ADMIN_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

export const findAdminStatus = (value: number) => {
    return value != null && LIST_ADMIN_STATUS.find(item => item.value === value);
}

