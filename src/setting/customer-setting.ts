import { STATUS_COLORS } from "./color";


export const CUSTOMER_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    BANNED: 3,
}

export const LIST_CUSTOMER_STATUS = [
    {
        label: "Đang hoạt động",
        value: CUSTOMER_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Chưa kích hoạt",
        value: CUSTOMER_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
    {
        label: "Bị cấm",
        value: CUSTOMER_STATUSES.BANNED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
]

export const findCustomerStatus = (value: number) => {
    return value != null && LIST_CUSTOMER_STATUS.find(item => item.value === value);
}
