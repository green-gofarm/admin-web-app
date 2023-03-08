import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IDeleteServiceCategory {
    open?: boolean,
    serviceCategory?: any,
    refresh?: any,
    onClose: Function
}

function DeleteServiceCategory({
    open,
    serviceCategory,
    refresh,
    onClose,
}: _IDeleteServiceCategory) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!serviceCategory?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Xóa loại dịch vụ"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn xóa
                    <b>{` ${serviceCategory?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(DeleteServiceCategory);