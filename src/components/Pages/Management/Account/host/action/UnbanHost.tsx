import { memo, useState } from 'react'
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateHostStatus } from '../../../../../../redux/user/action';
import { HOST_STATUSES } from '../../../../../../setting/host-setting';
import { toast } from 'react-toastify';

interface UnbanHostProps {
    open?: boolean,
    host?: any,
    refresh?: any,
    onClose: Function
}

function UnbanHost({
    open,
    host,
    refresh,
    onClose,
}: UnbanHostProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!host?.id) return;
        dispatch(updateHostStatus(
            host.id,
            { status: HOST_STATUSES.ACTIVE },
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
            title="Mở khóa tài khoản"
            description={(
                <Box display="inline-block">
                    Xác nhận mở khóa tài khoản
                    <b>{` ${host?.email ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnbanHost);