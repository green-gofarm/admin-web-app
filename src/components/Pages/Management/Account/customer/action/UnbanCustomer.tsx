import { memo, useState } from 'react'
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateCustomerStatus } from '../../../../../../redux/user/action';
import { CUSTOMER_STATUSES } from '../../../../../../setting/customer-setting';
import { toast } from 'react-toastify';

interface UnbanCustomerProps {
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
}: UnbanCustomerProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = () => {
        if (!customer?.id) return;
        dispatch(updateCustomerStatus(
            customer.id,
            { status: CUSTOMER_STATUSES.ACTIVE },
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
            title="Mở khóa tài khoản"
            description={(
                <Box display="inline-block">
                    Xác nhận mở khóa tài khoản
                    <b>{` ${customer?.email ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnbanCustomer);