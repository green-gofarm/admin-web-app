import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { FEEDBACK_STATUSES } from '../../../../../setting/feedback-setting';
import { updateFeedbackStatus } from '../../../../../redux/feedback/action';

interface UnBanFeedbackProps {
    open?: boolean,
    feedback?: any,
    refresh?: any,
    onClose: Function
}

function UnBanFeedback({
    open,
    feedback,
    refresh,
    onClose,
}: UnBanFeedbackProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!feedback?.id) return;
        dispatch(updateFeedbackStatus(
            feedback.id,
            { status: FEEDBACK_STATUSES.ACTIVE },
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
            title="Mở khóa feedback"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn mở khóa feedback này?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnBanFeedback);