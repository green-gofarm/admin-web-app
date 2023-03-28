import { memo, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstayServices } from '../../../../../../redux/farmstay/action';
import useCurrentUser from '../../../../../../hooks/useCurrentUser';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { SERVICE_STATUSES } from '../../../../../../setting/service-status-setting';

interface UnlockServiceProps {
    open?: boolean,
    service?: any,
    onSuccessCallback?: () => void,
    onClose: () => void,
}

function UnlockService({
    open,
    service,
    onSuccessCallback,
    onClose,
}: UnlockServiceProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const user = useCurrentUser();

    const handleSubmit = () => {
        if (!service?.id) return;
        if (!service?.farmstayId) return;
        if (!user?.id) return;

        dispatch(updateFarmstayServices(
            user.id,
            service.farmstayId,
            service.id,
            { status: SERVICE_STATUSES.ACTIVE },
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
            title="Mở khóa dịch vụ"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn mở khóa
                    <b>{` ${service?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnlockService);