import { STATUS_COLORS } from "./color";

export enum POLICY_STATUSES {
    ACTIVE = 1,
    INACTIVE = 2,
    DELETED = 3,
}

export const LIST_POLICY_STATUS = [
    {
        label: "Đang sử dụng",
        value: POLICY_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã khóa",
        value: POLICY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findPolicyStatus = (value: number) => {
    return value != null && LIST_POLICY_STATUS.find(item => item.value === value);
}

