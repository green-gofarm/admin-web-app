import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { FEEDBACK_STATUSES } from '../../../../../setting/feedback-setting';
import { updateFeedbackStatus } from '../../../../../redux/feedback/action';

interface BanFeedbackProps {
    open?: boolean,
    feedback?: any,
    refresh?: any,
    onClose: Function
}

function BanFeedback({
    open,
    feedback,
    refresh,
    onClose,
}: BanFeedbackProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!feedback?.id) return;
        dispatch(updateFeedbackStatus(
            feedback.id,
            { status: FEEDBACK_STATUSES.BANNED },
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
            title="Khóa feedback"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn khóa feedback này?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(BanFeedback);