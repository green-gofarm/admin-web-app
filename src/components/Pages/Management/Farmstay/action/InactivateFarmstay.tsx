import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IInactivateFarmstay {
    open?: boolean,
    farmstay?: any,
    refresh?: any,
    onClose: Function
}

function InactivateFarmstay({
    open,
    farmstay,
    refresh,
    onClose,
}: _IInactivateFarmstay) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!farmstay?.farmstay?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Ẩn farmstay"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn ẩn farmstay
                    <b>{` ${farmstay?.farmstay?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(InactivateFarmstay);