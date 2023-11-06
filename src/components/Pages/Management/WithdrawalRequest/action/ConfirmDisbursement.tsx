import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { WITHDRAWAL_REQUEST_STATUSES } from '../../../../../setting/withdrawl-request-setting';
import { toast } from 'react-toastify';
import { reviewDisbursement } from '../../../../../redux/order/action';

interface ConfirmDisbursementProps {
    open?: boolean,
    disbursement?: any,
    refresh?: any,
    onClose: Function
}

function ConfirmDisbursement({
    open,
    disbursement,
    refresh,
    onClose,
}: ConfirmDisbursementProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!disbursement?.id) return;
        dispatch(reviewDisbursement(
            disbursement.id,
            {
                status: WITHDRAWAL_REQUEST_STATUSES.COMPLETED,
                extras: null,
            },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Cập nhật thành công");
                    onClose && onClose();
                    refresh && refresh();
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
            title="Xác nhận"
            description={(
                <Box display="inline-block">
                    Xác nhận đã giải ngân cho đơn hàng này?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(ConfirmDisbursement);