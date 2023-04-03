import { memo, useState } from 'react'
import { Box } from '@mui/material';
import ConfirmModel from '../../../../General/Model/ConfirmModel';
import { useDispatch } from 'react-redux';
import { updateServiceCategory } from '../../../../../redux/service/action';
import { SERVICE_CATEGORY_STATUSES } from '../../../../../setting/service-category-setting';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';

interface ActivateServiceCategoryProps {
    open?: boolean,
    serviceCategory?: any,
    refresh?: any,
    onClose: Function
}

function ActivateServiceCategory({
    open,
    serviceCategory,
    refresh,
    onClose,
}: ActivateServiceCategoryProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!serviceCategory?.id) return;
        dispatch(updateServiceCategory(
            serviceCategory.id,
            { status: SERVICE_CATEGORY_STATUSES.ACTIVE },
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
            title="Mở khóa loại dịch vụ"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn mở khóa
                    <b>{` ${serviceCategory?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(ActivateServiceCategory);