import { memo, useState } from 'react'
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { Box } from '@mui/material';

interface _IUnbanHost {
    open?: boolean,
    host?: any,
    refresh?: any,
    onClose: Function
}

function UnbanHost({
    open,
    host,
    refresh,
    onClose,
}: _IUnbanHost) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!host?.id) return;
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
                    <b>{` ${host?.email ?? ""}`}</b> ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnbanHost);