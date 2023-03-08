import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';

interface _IDeleteTag {
    open?: boolean,
    tag?: any,
    refresh?: any,
    onClose: Function
}

function DeleteTag({
    open,
    tag,
    refresh,
    onClose,
}: _IDeleteTag) {
    const [loading] = useState(false);

    const handleSubmit = () => {
        if (!tag?.id) return;
        onClose && onClose();
        refresh && refresh();
    }

    return (
        <ConfirmModel
            open={open}
            title="Xóa thẻ"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn xóa thẻ
                    <Box
                        component="span"
                        className="tag tag-rounded"
                        margin="0 4px"
                    >
                        {tag?.name}
                    </Box>
                    ?
                </Box>
            )}
            loading={loading}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(DeleteTag);