import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _ICancelOrder {
    open?: boolean,
    request?: any,
    refresh?: any,
    onClose: Function
}

function ApproveBookingRequest({
    open,
    request,
    refresh,
    onClose,
}: _ICancelOrder) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!request?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Duyệt đơn"
            description={(
                <Box display="inline-block">
                    Xác nhận đồng ý đơn này?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(ApproveBookingRequest);