import { STATUS_COLORS } from "./color";

export enum ORDER_STATUSES {
    NONE = 0,
    PENDING_PAYMENT = 1,
    PENDING_APPROVE = 2,
    APPROVED = 3,
    REJECTED = 4,
    DISBURSE = 5,
    FAILED = 6,
    CUSTOMER_CANCEL = 7
}

export const LIST_ORDER_STATUS = [
    {
        label: "Đang thanh toán",
        value: ORDER_STATUSES.PENDING_PAYMENT,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Chờ xác nhận",
        value: ORDER_STATUSES.PENDING_APPROVE,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Đã chấp nhận",
        value: ORDER_STATUSES.APPROVED,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã từ chối",
        value: ORDER_STATUSES.REJECTED,
        textColor: STATUS_COLORS.CANCELED.textColor,
        bgColor: STATUS_COLORS.CANCELED.bgColor
    },
    {
        label: "Đã chia tiền",
        value: ORDER_STATUSES.DISBURSE,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor
    },
    {
        label: "Khách hàng hủy đơn",
        value: ORDER_STATUSES.CUSTOMER_CANCEL,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Thất bại",
        value: ORDER_STATUSES.FAILED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
]

export const findOrderStatus = (value: number) => {
    return value != null && LIST_ORDER_STATUS.find(item => item.value === value);
}


interface SortByProps {
    label: string,
    value: number,
    sortValue: {
        orderBy: "createdDate",
        orderDirection: "desc" | "asc"
    }
}

export const ORDER_SORT_BY_OPTIONS: SortByProps[] = [
    { label: "Ngày tạo đơn gần nhất", value: 1, sortValue: { orderBy: "createdDate", orderDirection: "desc" } },
    { label: "Ngày tạo đơn xa nhất", value: 2, sortValue: { orderBy: "createdDate", orderDirection: "asc" } },
]