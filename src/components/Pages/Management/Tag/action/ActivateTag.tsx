import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { updateTag } from '../../../../../redux/tag/action';
import { TAG_CATEGORY_STATUSES } from '../../../../../setting/tag-category-setting';

interface ActivateTagProps {
    open?: boolean,
    tagCategory?: any,
    refresh?: any,
    onClose: Function
}

function ActivateTag({
    open,
    tagCategory,
    refresh,
    onClose,
}: ActivateTagProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!tagCategory?.id) return;
        dispatch(updateTag(
            tagCategory.id,
            { status: TAG_CATEGORY_STATUSES.ACTIVE },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Cập nhật thành công");
                    onClose && onClose();
                    refresh && refresh();
                },
                onFailure: () => {
                    toast.error("Cập nhật thất bại");
                }
            }
        ))
    }

    return (
        <ConfirmModel
            open={open}
            title="Mở khóa thẻ mô tả"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn mở khóa
                    <b>{` ${tagCategory?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(ActivateTag);