import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IInactivateRoomCategory {
    open?: boolean,
    roomCategory?: any,
    refresh?: any,
    onClose: Function
}

function InactivateRoomCategory({
    open,
    roomCategory,
    refresh,
    onClose,
}: _IInactivateRoomCategory) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!roomCategory?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Ẩn loại phòng"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn ẩn
                    <b>{` ${roomCategory?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(InactivateRoomCategory);