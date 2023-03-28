import { memo, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstayServices } from '../../../../../../redux/farmstay/action';
import useCurrentUser from '../../../../../../hooks/useCurrentUser';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { SERVICE_STATUSES } from '../../../../../../setting/service-status-setting';

interface DeleteServiceProps {
    open?: boolean,
    service?: any,
    onSuccessCallback?: () => void,
    onClose: () => void,
}

function DeleteService({
    open,
    service,
    onSuccessCallback,
    onClose,
}: DeleteServiceProps) {

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
            { status: SERVICE_STATUSES.DELETED },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Xóa thành công");
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback();
                },
                onFailure: () => {
                    toast.error("Xóa thất bại");
                }
            }
        ))
    }

    return (
        <ConfirmModel
            open={open}
            title="Xóa dịch vụ"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn xóa
                    <b>{` ${service?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(DeleteService);