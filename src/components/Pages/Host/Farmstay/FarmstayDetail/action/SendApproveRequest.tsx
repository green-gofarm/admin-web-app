import { memo, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstay } from '../../../../../../redux/farmstay/action';
import { RootState } from '../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { FARMSTAY_STATUSES } from '../../../../../../setting/farmstay-setting';

interface SendApproveRequestProps {
    open?: boolean,
    farmstay?: any,
    onSuccessCallback?: any,
    onClose: Function
}

function SendApproveRequest({
    open,
    farmstay,
    onSuccessCallback,
    onClose,
}: SendApproveRequestProps) {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!farmstay?.id) return;
        if (!user?.id) return;

        dispatch(updateFarmstay(
            user.id,
            farmstay.id,
            { status: FARMSTAY_STATUSES.PENDING },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Gửi yêu cầu thành công");
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback();
                },
                onFailure: () => {
                    toast.error("Gửi yêu cầu thất bại");
                }
            }
        ))
    }

    return (
        <ConfirmModel
            open={open}
            title="Gửi yêu cầu"
            description={(
                <Box display="inline-block">
                    Xác nhận gửi yêu cầu phê duyệt farmstay
                    <b>{` ${farmstay?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(SendApproveRequest);