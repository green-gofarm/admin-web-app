import { STATUS_COLORS } from "./color";

export const FEEDBACK_STATUSES = {
    ACTIVE: 1,
    REPORTED: 2,
    BANNED: 3,
    DELETED: 4,
}

export const LIST_FEEDBACK_STATUS = [
    {
        label: "Đã đăng",
        value: FEEDBACK_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Chờ xử lý",
        value: FEEDBACK_STATUSES.REPORTED,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Đang bị khóa",
        value: FEEDBACK_STATUSES.BANNED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
    {
        label: "Đã xóa",
        value: FEEDBACK_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

export const findFeedbackStatus = (value: number) => {
    return value != null && LIST_FEEDBACK_STATUS.find(item => item.value === value);
}
