import { STATUS_COLORS } from "./color";

export enum FARMSTAY_STATUSES {
    DRAFT = 1,
    PENDING = 2,
    ACTIVE = 3,
    INACTIVE = 4,
}

export const LIST_FARMSTAY_STATUS = [
    {
        label: "Chưa kích hoạt",
        value: FARMSTAY_STATUSES.DRAFT,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Đang hoạt động",
        value: FARMSTAY_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Không hoạt động",
        value: FARMSTAY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.FINISHED.textColor,
        bgColor: STATUS_COLORS.FINISHED.bgColor
    },
    {
        label: "Đang phê duyệt",
        value: FARMSTAY_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
]

export const findFarmstayStatus = (value: number) => {
    return value != null && LIST_FARMSTAY_STATUS.find(item => item.value === value);
}

interface SortByProps {
    label: string,
    value: number,
    sortValue: {
        orderBy: "createdDate" | "rating",
        orderDirection: "desc" | "asc"
    }
}

export const FARMSTAY_SORT_BY_OPTIONS: SortByProps[] = [
    { label: "Ngày tạo gần nhất", value: 1, sortValue: { orderBy: "createdDate", orderDirection: "desc" } },
    { label: "Ngày tạo xa nhất", value: 2, sortValue: { orderBy: "createdDate", orderDirection: "asc" } },
    { label: "Đánh giá cao nhất", value: 3, sortValue: { orderBy: "rating", orderDirection: "desc" } },
    { label: "Đánh giá thấp nhất tới cao", value: 4, sortValue: { orderBy: "rating", orderDirection: "asc" } },
]

export const isDraftFarmstay = (status: any) => status === FARMSTAY_STATUSES.DRAFT;
export const isPendingApproveFarmstay = (status: any) => status === FARMSTAY_STATUSES.PENDING;
export const isActiveFarmstay = (status: any) => status === FARMSTAY_STATUSES.ACTIVE;
export const isInActiveFarmstay = (status: any) => status === FARMSTAY_STATUSES.INACTIVE;