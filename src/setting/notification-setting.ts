import makeStyles from "@mui/styles/makeStyles/makeStyles";

export const useNotificationStyles = makeStyles({
    read: {
        background: "#fff !important",
        "&:hover": {
            background: "#ebebeb !important"
        }
    },
    unread: {
        background: "#eef6f2 !important",
        "&:hover": {
            background: "#dcece4 !important"
        }
    },
    dot: {
        width: "9px",
        height: "9px",
        right: "2px",
        bottom: "2px",
        background: "#17b86a",
        borderRadius: "100%"
    },
    noAfter: {
        "&::after": {
            display: "none !important",
        }
    }
})

export enum NOTIFICATION_STATUSES {
    READ = 1,
    UNREAD = 2,
}

export enum NOTIFICATION_TYPE {
    // PAYMENT_SUCCESS_CUSTOMER = 'notification.payment-success.customer',
    PAYMENT_SUCCESS_HOST = 'notification.payment-success.host',
    // CANCEL_BOOKING_CUSTOMER = 'notification.cancel-booking.customer',
    CANCEL_BOOKING_HOST = 'notification.cancel-booking.host',
    REVIEW_FARMSTAY_ADMIN = 'notification.review-farmstay.admin',
    FARMSTAY_APPROVED_HOST = 'notification.farmstay-approved.host',
    FARMSTAY_REJECTED_HOST = 'notification.farmstay-rejected.host',
    // BOOKING_APPROVED_CUSTOMER = 'notification.booking-approved.customer',
    // BOOKING_REJECTED_CUSTOMER = 'notification.booking-rejected.customer',
}

export const parseNotificationExtras = (extras: any) => {
    try {
        return JSON.parse(extras);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getRedirectPathFromNotification = (extras: any) => {
    const parsedExtras = parseNotificationExtras(extras);

    if (parsedExtras?.type) {
        if (parsedExtras.type === NOTIFICATION_TYPE.REVIEW_FARMSTAY_ADMIN) {
            return `/management/farmstay/preview/${parsedExtras.farmstayId}`;
        }
        if (parsedExtras.type === NOTIFICATION_TYPE.FARMSTAY_REJECTED_HOST) {
            return `/management/farmstay/${parsedExtras.farmstayId}`;
        }
        if (parsedExtras.type === NOTIFICATION_TYPE.FARMSTAY_APPROVED_HOST) {
            return `/management/farmstay/${parsedExtras.farmstayId}`;
        }
        if (parsedExtras.type === NOTIFICATION_TYPE.PAYMENT_SUCCESS_HOST) {
            return `/management/booking-request/${parsedExtras.orderId}`;
        }
        if (parsedExtras.type === NOTIFICATION_TYPE.CANCEL_BOOKING_HOST) {
            return `/management/farmstay/order/${parsedExtras.orderId}`;
        }
    }

    return "#";
}

const UNREAD_KEY = "notification_only_unread_state";

export function setNotificationOnlyUnreadState(value: boolean): void {
    localStorage.setItem(UNREAD_KEY, JSON.stringify(value));
}

export function getNotificationOnlyUnreadState(): boolean {
    const value = localStorage.getItem(UNREAD_KEY);
    if (value) {
        return Boolean(JSON.parse(value));
    }
    return false;
}