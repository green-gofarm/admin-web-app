import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { reviewBooking } from '../../../../../redux/order/action';
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import { ORDER_STATUSES } from '../../../../../setting/order-setting';

interface ApproveBookingRequestProps {
    open?: boolean,
    booking?: any,
    onSuccessCallback?: any,
    onClose: Function
}

function ApproveBookingRequest({
    open,
    booking,
    onSuccessCallback,
    onClose,
}: ApproveBookingRequestProps) {

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
            { status: ORDER_STATUSES.APPROVED },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Phê duyệt thành công");
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback();
                },
                onFailure: () => {
                    toast.error("Phê duyệt thất bại");
                }
            }
        ))
    }

    return (
        <ConfirmModel
            open={open}
            title="Phê duyệt đơn"
            description={(
                <Box display="inline-block">
                    Xác nhận đồng ý phê duyệt đơn này?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(ApproveBookingRequest);