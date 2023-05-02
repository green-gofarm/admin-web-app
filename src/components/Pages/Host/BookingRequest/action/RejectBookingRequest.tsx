import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { reviewBooking } from '../../../../../redux/order/action';
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import { ORDER_STATUSES } from '../../../../../setting/order-setting';

interface RejectBookingRequestProps {
    open?: boolean,
    booking?: any,
    onSuccessCallback?: any,
    onClose: Function
}

function RejectBookingRequest({
    open,
    booking,
    onSuccessCallback,
    onClose,
}: RejectBookingRequestProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);
    const user = useCurrentUser();

    const handleSubmit = () => {
        if (!user?.id) return;
        if (!booking?.id) return;

        dispatch(reviewBooking(
            user.id,
            booking.id,
            { status: ORDER_STATUSES.REJECTED },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Cập nhật thành công");
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback();
                },
                onFailure: () => {
                    toast.error("Cập nhật thất bại");
                }
            }
        ))
    }

    return (
        <ConfirmModel
            open={open}
            title="Từ chối đơn"
            description={(
                <Box display="inline-block">
                    Xác nhận từ chối đơn này?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(RejectBookingRequest);