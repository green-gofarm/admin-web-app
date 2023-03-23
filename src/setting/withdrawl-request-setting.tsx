import { STATUS_COLORS } from "./color";

export const WITHDRAWAL_REQUEST_STATUSES = {
    NONE: 0,
    INCOMPLETE: 1,
    COMPLETED: 2,
    PENDING_APPROVE: 3,
    REJECTED: 4,
}

export const LIST_WITHDRAWAL_REQUEST_STATUS = [
    {
        label: "Đơn chưa hoàn thành",
        value: WITHDRAWAL_REQUEST_STATUSES.INCOMPLETE,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor
    },
    {
        label: "Đang phê duyệt",
        value: WITHDRAWAL_REQUEST_STATUSES.PENDING_APPROVE,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Đã giải ngân",
        value: WITHDRAWAL_REQUEST_STATUSES.COMPLETED,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Từ chối giải ngân",
        value: WITHDRAWAL_REQUEST_STATUSES.REJECTED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
]

export const findWithdrawalRequestStatus = (value: number) => {
    return value != null && LIST_WITHDRAWAL_REQUEST_STATUS.find(item => item.value === value);
}


interface SortByProps {
    label: string,
    value: number,
    sortValue: {
        orderBy: "createdDate" | "amount",
        orderDirection: "desc" | "asc"
    }
}

export const WITHDRAWAL_REQUEST_SORT_BY_OPTIONS: SortByProps[] = [
    { label: "Ngày tạo gần nhất", value: 1, sortValue: { orderBy: "createdDate", orderDirection: "desc" } },
    { label: "Ngày tạo xa nhất", value: 2, sortValue: { orderBy: "createdDate", orderDirection: "asc" } },
    { label: "Giải ngân nhiều nhất", value: 1, sortValue: { orderBy: "amount", orderDirection: "desc" } },
    { label: "Giải ngân ít nhất", value: 2, sortValue: { orderBy: "amount", orderDirection: "asc" } },
]
