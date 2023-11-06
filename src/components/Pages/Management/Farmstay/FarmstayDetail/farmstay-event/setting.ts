import { EventDef } from "@fullcalendar/react";
import { isThePast } from "../../../../../../helpers/dateUtils";
import { STATUS_COLORS } from "../../../../../../setting/color";

export enum ItemType {
    ROOM = "ROOM",
    ACTIVITY = "ACTIVITY",
}

export const ItemTypeLabelMap: { [key in ItemType]: string } = {
    [ItemType.ROOM]: "Phòng",
    [ItemType.ACTIVITY]: "Hoạt động",
}


export const getStatusString = (date: string | null, available: any) => {
    if (!date) return null;
    if (isThePast(new Date(date))) {
        return "Đã ngưng bán";
    }

    return available ? "Đang mở bán" : "Đã đặt hết";
}

export const generateTitle = (item: any, dateStr: any): string => {
    const type = ItemTypeLabelMap[item.itemType as ItemType];
    const status = getStatusString(dateStr, item.available);
    return `[${type}] ${item.itemName} (${status})`;
}


export const dateFormat = "YYYY-MM-DD";

export const getColorProps = (date: string | null, available: any) => {
    if (!date) return null;
    if (isThePast(new Date(date))) {
        return {
            textColor: STATUS_COLORS.DISABLED.textColor,
            backgroundColor: STATUS_COLORS.DISABLED.bgColor,
            borderColor: STATUS_COLORS.DISABLED.bgColor,
        }
    }

    if (available) {
        return {
            textColor: STATUS_COLORS.ACTIVE.textColor,
            backgroundColor: STATUS_COLORS.ACTIVE.bgColor,
            borderColor: STATUS_COLORS.ACTIVE.bgColor,
        }
    }

    return {
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        backgroundColor: STATUS_COLORS.AVAILABLE.bgColor,
        borderColor: STATUS_COLORS.AVAILABLE.bgColor,
    }
}

export const getStatus = (event: EventDef | null) => {
    if (!event) return null;

    const dateStr = event.extendedProps?.dateStr;
    const available = event.extendedProps?.available;

    const label = getStatusString(dateStr, available);

    if (isThePast(new Date(event.extendedProps?.dateStr))) {
        return {
            label,
            textColor: STATUS_COLORS.DISABLED.textColor,
            bgColor: STATUS_COLORS.DISABLED.bgColor,
        }
    }

    if (available) {
        return {
            label,
            textColor: STATUS_COLORS.ACTIVE.textColor,
            bgColor: STATUS_COLORS.ACTIVE.bgColor,
        }
    }

    return {
        label,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor,
    }
}

