import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IActivateFarmstay {
    open?: boolean,
    farmstay?: any,
    refresh?: any,
    onClose: Function
}

function ActivateFarmstay({
    open,
    farmstay,
    refresh,
    onClose,
}: _IActivateFarmstay) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!farmstay?.farmstay?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Kích hoạt"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn kích hoạt farmstay
                    <b>{` ${farmstay?.farmstay?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(ActivateFarmstay);