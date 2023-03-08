import { STATUS_COLORS } from "./color";

export const ROOM_STATUSES = {
    AVAILABLE: 1,
    DISABLED: 2,
}

export const LIST_ROOM_STATUS = [
    {
        label: "Đang khai thác",
        value: ROOM_STATUSES.AVAILABLE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Tạm ngưng",
        value: ROOM_STATUSES.DISABLED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
]

export const findRoomStatus = (value: number) => {
    return value != null && LIST_ROOM_STATUS.find(item => item.value === value);
}
