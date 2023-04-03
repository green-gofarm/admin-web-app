import { isAvailableArray } from "../helpers/arrayUtils";
import { STATUS_COLORS } from "./color";

export enum SERVICE_CATEGORY_STATUSES {
    ACTIVE = 1,
    INACTIVE = 2,
}

export const LIST_SERVICE_CATEGORY_STATUS = [
    {
        label: "Đang sử dụng",
        value: SERVICE_CATEGORY_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã khóa",
        value: SERVICE_CATEGORY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findServiceCategoryStatus = (value: number) => {
    return value != null && LIST_SERVICE_CATEGORY_STATUS.find(item => item.value === value);
}

interface SortByProps {
    label: string,
    value: number,
    sortValue: {
        orderBy: "createdDate" | "rating",
        orderDirection: "desc" | "asc"
    }
}

export const SERVICE_CATEGORY_SORT_BY_OPTIONS: SortByProps[] = [
    { label: "Ngày tạo gần nhất", value: 1, sortValue: { orderBy: "createdDate", orderDirection: "desc" } },
    { label: "Ngày tạo xa nhất", value: 2, sortValue: { orderBy: "createdDate", orderDirection: "asc" } },
]


export const getServiceCategoryLabel = (categories: any, id: any): string | null => {
    if (!isAvailableArray(categories)) return null;
    const result = categories.find(item => {
        return item.id + "" === id + ""
    })?.name;
    return result ?? null;
}
