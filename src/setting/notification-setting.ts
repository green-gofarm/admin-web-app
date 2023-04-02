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
    REVIEW_FARMSTAY = "notification.review-farmstay.admin",
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
        if (parsedExtras.type === NOTIFICATION_TYPE.REVIEW_FARMSTAY) {
            return `/management/farmstay/preview/${parsedExtras.farmstayId}`;
        }
    }

    return "#";
}