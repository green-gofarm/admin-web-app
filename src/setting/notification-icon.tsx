
import { NOTIFICATION_TYPE, parseNotificationExtras } from './notification-setting';


export const getNotificationIcon = (extras: any) => {
    const parsedExtras = parseNotificationExtras(extras);
    if (parsedExtras?.type) {
        if (parsedExtras.type === NOTIFICATION_TYPE.REVIEW_FARMSTAY_ADMIN) {
            return <i className="fa fa-home text-white"></i>;
        }
        if (parsedExtras.type === NOTIFICATION_TYPE.FARMSTAY_REJECTED_HOST) {
            return <i className="fa fa-square text-white notifyimg bg-danger"></i>
        }
        if (parsedExtras.type === NOTIFICATION_TYPE.FARMSTAY_APPROVED_HOST) {
            return <i className="far fa-check-square text-white notifyimg bg-success"></i>
        }
        if (parsedExtras.type === NOTIFICATION_TYPE.PAYMENT_SUCCESS_HOST) {
            return <i className="far fa-envelope-open text-white notifyimg bg-warning"></i>;
        }
        if (parsedExtras.type === NOTIFICATION_TYPE.CANCEL_BOOKING_HOST) {
            return <i className="fas fa-times text-white bg-dark"></i>;
        }
    }

    return <i className="fa fa-envelope text-white"></i>;
}