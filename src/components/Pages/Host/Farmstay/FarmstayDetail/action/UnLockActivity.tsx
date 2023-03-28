import { memo, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstayActivities } from '../../../../../../redux/farmstay/action';
import { ACTIVITY_STATUSES } from '../../../../../../setting/activity-status-setting';
import useCurrentUser from '../../../../../../hooks/useCurrentUser';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';

interface UnlockActivityProps {
    open?: boolean,
    activity?: any,
    onSuccessCallback?: () => void,
    onClose: () => void,
}

function UnlockActivity({
    open,
    activity,
    onSuccessCallback,
    onClose,
}: UnlockActivityProps) {

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
            { status: ACTIVITY_STATUSES.ACTIVE },
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
            title="Mở khóa hoạt động"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn mở khóa
                    <b>{` ${activity?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnlockActivity);