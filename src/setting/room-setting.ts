import { STATUS_COLORS } from "./color";

export enum ROOM_STATUSES {
    ACTIVE = 1,
    INACTIVE = 2,
    DELETED = 3,
}

export const LIST_ROOM_STATUS = [
    {
        label: "Đang khai thác",
        value: ROOM_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Đã khóa",
        value: ROOM_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findRoomStatus = (value: number) => {
    return value != null && LIST_ROOM_STATUS.find(item => item.value === value);
}
