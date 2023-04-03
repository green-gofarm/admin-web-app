import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { reviewFarmstay } from '../../../../../redux/farmstay/action';
import { FARMSTAY_STATUSES } from '../../../../../setting/farmstay-setting';

interface InactivateFarmstayProps {
    open?: boolean,
    farmstay?: any,
    refresh?: any,
    onClose: Function
}

function InactivateFarmstay({
    open,
    farmstay,
    refresh,
    onClose,
}: InactivateFarmstayProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!farmstay?.id) return;
        dispatch(reviewFarmstay(
            farmstay.id,
            { status: FARMSTAY_STATUSES.INACTIVE },
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
            title="Khóa farmstay"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn khóa
                    <b>{` ${farmstay?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(InactivateFarmstay);