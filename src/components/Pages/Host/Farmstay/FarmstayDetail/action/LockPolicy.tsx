import { memo, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import useCurrentUser from '../../../../../../hooks/useCurrentUser';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { POLICY_STATUSES } from '../../../../../../setting/policy-status-setting';
import { updateFarmstayPolicies } from '../../../../../../redux/farmstay/action';

interface LockPolicyProps {
    open?: boolean,
    policy?: any,
    onSuccessCallback?: () => void,
    onClose: () => void,
}

function LockPolicy({
    open,
    policy,
    onSuccessCallback,
    onClose,
}: LockPolicyProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const user = useCurrentUser();

    const handleSubmit = () => {
        if (!policy?.id) return;
        if (!policy?.farmstayId) return;
        if (!user?.id) return;

        dispatch(updateFarmstayPolicies(
            user.id,
            policy.farmstayId,
            policy.id,
            { status: POLICY_STATUSES.INACTIVE },
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
            title="Khóa quy định"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn khóa
                    <b>{` ${policy?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(LockPolicy);