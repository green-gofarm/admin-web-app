import { memo, useState } from 'react'
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { Box } from '@mui/material';

interface _IUnbanCustomer {
    open?: boolean,
    customer?: any,
    refresh?: any,
    onClose: Function
}

function UnbanCustomer({
    open,
    customer,
    refresh,
    onClose,
}: _IUnbanCustomer) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!customer?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Mở khóa tài khoản"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn mở khóa tài khoản
                    <b>{` ${customer?.email ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnbanCustomer);