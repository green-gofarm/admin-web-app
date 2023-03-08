import { memo, useState } from 'react'
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { Box } from '@mui/material';

interface _IBanCustomer {
    open?: boolean,
    customer?: any,
    refresh?: any,
    onClose: Function
}

function BanCustomer({
    open,
    customer,
    refresh,
    onClose,
}: _IBanCustomer) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!customer?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Khóa tài khoản"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn khóa tài khoản
                    <b>{` ${customer?.email ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(BanCustomer);