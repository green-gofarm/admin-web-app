import { STATUS_COLORS } from "./color";

export enum FARMSTAY_STATUSES {
    DRAFT = 1,
    PENDING = 2,
    ACTIVE = 3,
    INACTIVE = 4,
    REJECTED = 5,
}

export const LIST_FARMSTAY_STATUS = [
    {
        label: "Chưa kích hoạt",
        value: FARMSTAY_STATUSES.DRAFT,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Đang hoạt động",
        value: FARMSTAY_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Không hoạt động",
        value: FARMSTAY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.FINISHED.textColor,
        bgColor: STATUS_COLORS.FINISHED.bgColor
    },
    {
        label: "Đang phê duyệt",
        value: FARMSTAY_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Không được chấp nhận",
        value: FARMSTAY_STATUSES.REJECTED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
]

export const findFarmstayStatus = (value: number) => {
    return value != null && LIST_FARMSTAY_STATUS.find(item => item.value === value);
}
