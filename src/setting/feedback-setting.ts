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


interface SortByProps {
    label: string,
    value: number,
    sortValue: {
        orderBy: "createdDate" | "rating",
        orderDirection: "desc" | "asc"
    }
}

export const FEEDBACK_SORT_BY_OPTIONS: SortByProps[] = [
    { label: "Ngày tạo gần nhất", value: 1, sortValue: { orderBy: "createdDate", orderDirection: "desc" } },
    { label: "Ngày tạo xa nhất", value: 2, sortValue: { orderBy: "createdDate", orderDirection: "asc" } },
    { label: "Đánh giá cao nhất", value: 3, sortValue: { orderBy: "rating", orderDirection: "desc" } },
    { label: "Đánh giá thấp nhất", value: 4, sortValue: { orderBy: "rating", orderDirection: "asc" } },
]

export enum FEEDBACK_TYPE {
    CUSTOMER_FEEDBACK = 1,
    HOST_FEEDBACK = 2,
    REPLY = 3,
}

export const FEEDBACK_TYPE_OPTIONS = [
    { label: "Phản hồi từ khách hàng", value: FEEDBACK_TYPE.CUSTOMER_FEEDBACK },
    { label: "Phản hồi từ chủ farmstay", value: FEEDBACK_TYPE.HOST_FEEDBACK },
    { label: "Hồi đáp", value: FEEDBACK_TYPE.REPLY },
]

