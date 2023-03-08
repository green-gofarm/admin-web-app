import { STATUS_COLORS } from "./color";

export const FARMSTAY_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    PENDING: 3,
    CANCELED: 4,
}

export const LIST_FARMSTAY_STATUS = [
    {
        label: "Đang hoạt động",
        value: FARMSTAY_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Không hoạt động",
        value: FARMSTAY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Đang phê duyệt",
        value: FARMSTAY_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Đang bị khóa",
        value: FARMSTAY_STATUSES.CANCELED,
        textColor: STATUS_COLORS.FINISHED.textColor,
        bgColor: STATUS_COLORS.FINISHED.bgColor
    },
]

export const findFarmstayStatus = (value: number) => {
    return value != null && LIST_FARMSTAY_STATUS.find(item => item.value === value);
}
