import { isAvailableArray } from "../helpers/arrayUtils";
import { STATUS_COLORS } from "./color";

export enum TAG_CATEGORY_STATUSES {
    ACTIVE = 1,
    INACTIVE = 2,
}

export const LIST_ACTIVITY_TAG_STATUS = [
    {
        label: "Đang sử dụng",
        value: TAG_CATEGORY_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã ẩn",
        value: TAG_CATEGORY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findActivityTagStatus = (value: number) => {
    return value != null && LIST_ACTIVITY_TAG_STATUS.find(item => item.value === value);
}

export const getTagCategoryLabel = (categories: any, id: any): string | null => {
    if (!isAvailableArray(categories)) return null;
    return categories.find(item => item.id + "" === id + "")?.name ?? null;
}