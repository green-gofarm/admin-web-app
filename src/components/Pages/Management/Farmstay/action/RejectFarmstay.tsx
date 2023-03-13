import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IRejectFarmstay {
    open?: boolean,
    farmstay?: any,
    refresh?: any,
    onClose: Function
}

function RejectFarmstay({
    open,
    farmstay,
    refresh,
    onClose,
}: _IRejectFarmstay) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!farmstay?.farmstay?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Phê duyệt"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn từ chối farmstay
                    <b>{` ${farmstay?.farmstay?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(RejectFarmstay);