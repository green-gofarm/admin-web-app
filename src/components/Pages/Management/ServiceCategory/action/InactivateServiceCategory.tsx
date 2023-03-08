import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IInactivateServiceCategory {
    open?: boolean,
    serviceCategory?: any,
    refresh?: any,
    onClose: Function
}

function InactivateServiceCategory({
    open,
    serviceCategory,
    refresh,
    onClose,
}: _IInactivateServiceCategory) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!serviceCategory?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Ẩn loại dịch vụ"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn ẩn
                    <b>{` ${serviceCategory?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(InactivateServiceCategory);