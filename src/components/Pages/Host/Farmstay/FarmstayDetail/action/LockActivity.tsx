import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';

interface LockActivityProps {
    open?: boolean,
    activity?: any,
    refresh?: any,
    onClose: Function
}

function LockActivity({
    open,
    activity,
    refresh,
    onClose,
}: LockActivityProps) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!activity?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Khóa hoạt động"
            description={(
                <Box display="inline-block">
                    Xác nhận khóa lại hoạt động này?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(LockActivity);