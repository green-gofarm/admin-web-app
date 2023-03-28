import { STATUS_COLORS } from "./color";

export const WITHDRAWAL_REQUEST_STATUSES = {
    INCOMPLETE: 1,
    PENDING: 2,
    COMPLETED: 3,
}

export const LIST_WITHDRAWAL_REQUEST_STATUS = [
    {
        label: "Chưa giải ngân",
        value: WITHDRAWAL_REQUEST_STATUSES.INCOMPLETE,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor
    },
    {
        label: "Đang xử lý",
        value: WITHDRAWAL_REQUEST_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Đã giải ngân",
        value: WITHDRAWAL_REQUEST_STATUSES.COMPLETED,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
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
    { label: "Giải ngân nhiều nhất", value: 3, sortValue: { orderBy: "amount", orderDirection: "desc" } },
    { label: "Giải ngân ít nhất", value: 4, sortValue: { orderBy: "amount", orderDirection: "asc" } },
]
