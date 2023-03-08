import { STATUS_COLORS } from "./color";

export const WITHDRAWAL_REQUEST_STATUSES = {
    INCOMPLETE: 1,
    PENDING: 2,
    APPROVED: 3,
    REJECTED: 4,
    CANCELED: 5,
}

export const LIST_WITHDRAWAL_REQUEST_STATUS = [
    {
        label: "Chưa đủ yêu cầu",
        value: WITHDRAWAL_REQUEST_STATUSES.INCOMPLETE,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor
    },
    {
        label: "Đang phê duyệt",
        value: WITHDRAWAL_REQUEST_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Đã phê duyệt",
        value: WITHDRAWAL_REQUEST_STATUSES.APPROVED,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Từ chối",
        value: WITHDRAWAL_REQUEST_STATUSES.REJECTED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
    {
        label: "Đã hủy",
        value: WITHDRAWAL_REQUEST_STATUSES.CANCELED,
        textColor: STATUS_COLORS.FINISHED.textColor,
        bgColor: STATUS_COLORS.FINISHED.bgColor
    },
]

export const findWithdrawalRequestStatus = (value: number) => {
    return value != null && LIST_WITHDRAWAL_REQUEST_STATUS.find(item => item.value === value);
}
