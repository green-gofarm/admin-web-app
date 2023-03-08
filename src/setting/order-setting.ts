import { STATUS_COLORS } from "./color";

export const ORDER_STATUSES = {
    UN_PAID: 1,
    PAID: 2,
    APPROVED: 3,
    REJECTED: 4,
    IN_PROGRESS: 5,
    CANCELED: 6,
}

export const LIST_ORDER_STATUS = [
    {
        label: "Đang thanh toán",
        value: ORDER_STATUSES.UN_PAID,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Chờ xác nhận",
        value: ORDER_STATUSES.PAID,
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
        label: "Bị từ chối",
        value: ORDER_STATUSES.REJECTED,
        textColor: STATUS_COLORS.CANCELED.textColor,
        bgColor: STATUS_COLORS.CANCELED.bgColor
    },
    {
        label: "Đang diễn ra",
        value: ORDER_STATUSES.IN_PROGRESS,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor
    },
    {
        label: "Đã hủy",
        value: ORDER_STATUSES.CANCELED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findOrderStatus = (value: number) => {
    return value != null && LIST_ORDER_STATUS.find(item => item.value === value);
}
