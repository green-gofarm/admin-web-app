import { memo, useState } from 'react'
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { Box } from '@mui/material';

interface _IBanHost {
    open?: boolean,
    host?: any,
    refresh?: any,
    onClose: Function
}

function BanHost({
    open,
    host,
    refresh,
    onClose,
}: _IBanHost) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!host?.id) return;
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
                    <b>{` ${host?.email ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(BanHost);