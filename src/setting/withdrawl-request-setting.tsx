import { STATUS_COLORS } from "./color";

export enum WITHDRAWAL_REQUEST_STATUSES {
    PENDING = 1,
    COMPLETED = 2,
}

export enum WITHDRAWAL_REQUEST_TYPE {
    DISBURSE = 1,
    REIMBURSEMENT = 2
}

export const WITHDRAWAL_REQUEST_TYPE_OPTIONS = [
    {
        label: "Thanh toán đơn kết thúc.",
        value: WITHDRAWAL_REQUEST_TYPE.DISBURSE,
    },
    {
        label: "Đền bù đơn bị hủy",
        value: WITHDRAWAL_REQUEST_TYPE.REIMBURSEMENT,
    }
]

export const getWithdrawalRequestTypeLabel = (value: any) => {
    return WITHDRAWAL_REQUEST_TYPE_OPTIONS.find(item => item.value === value)?.label ?? null;
}

export const LIST_WITHDRAWAL_REQUEST_STATUS = [
    {
        label: "Đang xử lý",
        value: WITHDRAWAL_REQUEST_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Đã giải ngân",
        value: WITHDRAWAL_REQUEST_STATUSES.COMPLETED,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor
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
