import { memo, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstayActivities } from '../../../../../../redux/farmstay/action';
import { ACTIVITY_STATUSES } from '../../../../../../setting/activity-status-setting';
import useCurrentUser from '../../../../../../hooks/useCurrentUser';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';

interface DeleteActivityProps {
    open?: boolean,
    activity?: any,
    onSuccessCallback?: () => void,
    onClose: () => void,
}

function DeleteActivity({
    open,
    activity,
    onSuccessCallback,
    onClose,
}: DeleteActivityProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const user = useCurrentUser();

    const handleSubmit = () => {
        if (!activity?.id) return;
        if (!activity?.farmstayId) return;
        if (!user?.id) return;

        dispatch(updateFarmstayActivities(
            user.id,
            activity.farmstayId,
            activity.id,
            { status: ACTIVITY_STATUSES.DELETED },
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
            title="Xóa hoạt động"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn xóa
                    <b>{` ${activity?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(DeleteActivity);