import { STATUS_COLORS } from "./color";


export const CUSTOMER_STATUSES = {
    ACTIVE: 1,
    BANNED: 2,
}

export const LIST_CUSTOMER_STATUS = [
    {
        label: "Đang hoạt động",
        value: CUSTOMER_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đang bị khóa",
        value: CUSTOMER_STATUSES.BANNED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
]

export const findCustomerStatus = (value: number) => {
    return value != null && LIST_CUSTOMER_STATUS.find(item => item.value === value);
}

interface SortByProps {
    label: string,
    value: number,
    sortValue: {
        orderBy: "createdDate",
        orderDirection: "desc" | "asc"
    }
}

export const CUSTOMER_SORT_BY_OPTIONS: SortByProps[] = [
    { label: "Ngày tạo gần nhất", value: 1, sortValue: { orderBy: "createdDate", orderDirection: "desc" } },
    { label: "Ngày tạo xa nhất", value: 2, sortValue: { orderBy: "createdDate", orderDirection: "asc" } },
]