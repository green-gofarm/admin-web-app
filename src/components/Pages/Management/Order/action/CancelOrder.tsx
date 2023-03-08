import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _ICancelOrder {
    open?: boolean,
    order?: any,
    refresh?: any,
    onClose: Function
}

function CancelOrder({
    open,
    order,
    refresh,
    onClose,
}: _ICancelOrder) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!order?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Hủy đơn"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn hủy đơn này?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(CancelOrder);