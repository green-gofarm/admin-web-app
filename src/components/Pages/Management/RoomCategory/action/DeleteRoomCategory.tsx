import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IDeleteRoomCategory {
    open?: boolean,
    roomCategory?: any,
    refresh?: any,
    onClose: Function
}

function DeleteRoomCategory({
    open,
    roomCategory,
    refresh,
    onClose,
}: _IDeleteRoomCategory) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!roomCategory?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Xóa loại phòng"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn xóa
                    <b>{` ${roomCategory?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(DeleteRoomCategory);