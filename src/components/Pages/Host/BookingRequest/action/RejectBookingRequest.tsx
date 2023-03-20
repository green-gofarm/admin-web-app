import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _ICancelOrder {
    open?: boolean,
    request?: any,
    refresh?: any,
    onClose: Function
}

function RejectBookingRequest({
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
            title="Từ chối đơn"
            description={(
                <Box display="inline-block">
                    Xác nhận từ chối đơn này?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(RejectBookingRequest);