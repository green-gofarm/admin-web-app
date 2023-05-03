import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { hostReportFeedback } from '../../../../../redux/feedback/action';
import useCurrentUser from '../../../../../hooks/useCurrentUser';

interface HostReportFeedbackProps {
    open?: boolean,
    feedback?: any,
    refresh?: () => void,
    onClose: () => void
}

function HostReportFeedback({
    open,
    feedback,
    refresh,
    onClose,
}: HostReportFeedbackProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const user = useCurrentUser();

    const handleSubmit = () => {
        if (!user?.id) return;
        if (!feedback?.orderId) return;
        if (!feedback?.id) return;

        dispatch(hostReportFeedback(
            user.id,
            feedback.orderId,
            feedback.id,
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
            title="Báo cáo feedback"
            description={(
                <Box display="inline-block">
                    Xác nhận báo cáo feedback này có nội dung không phù hợp?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(HostReportFeedback);