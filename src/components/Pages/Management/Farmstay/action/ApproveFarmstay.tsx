import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { reviewFarmstay } from '../../../../../redux/farmstay/action';
import { FARMSTAY_STATUSES } from '../../../../../setting/farmstay-setting';

interface ApproveFarmstayProps {
    open?: boolean,
    farmstay?: any,
    onSuccessCallback?: any,
    onClose: Function
}

function ApproveFarmstay({
    open,
    farmstay,
    onSuccessCallback,
    onClose,
}: ApproveFarmstayProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!farmstay?.id) return;
        dispatch(reviewFarmstay(
            farmstay.id,
            { status: FARMSTAY_STATUSES.ACTIVE },
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
            title="Phê duyệt farmstay"
            description={(
                <Box display="inline-block">
                    Xác nhận đồng ý phê duyệt farmstay
                    <b>{` ${farmstay?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(ApproveFarmstay);