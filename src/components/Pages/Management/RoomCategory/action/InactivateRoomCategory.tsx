import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { SERVICE_CATEGORY_STATUSES } from '../../../../../setting/service-category-setting';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import { updateRoomCategory } from '../../../../../redux/room/action';

interface InactivateRoomCategoryProps {
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
}: InactivateRoomCategoryProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!roomCategory?.id) return;
        dispatch(updateRoomCategory(
            roomCategory.id,
            { status: SERVICE_CATEGORY_STATUSES.INACTIVE },
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
            title="Khóa loại phòng"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn khóa
                    <b>{` ${roomCategory?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(InactivateRoomCategory);