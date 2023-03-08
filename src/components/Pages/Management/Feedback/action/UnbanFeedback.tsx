import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IUnbanFeedback {
    open?: boolean,
    feedback?: any,
    refresh?: any,
    onClose: Function
}

function UnbanFeedback({
    open,
    feedback,
    refresh,
    onClose,
}: _IUnbanFeedback) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!feedback?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Mở khóa phẩn hồi"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn mở khóa phản hồi này?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnbanFeedback);