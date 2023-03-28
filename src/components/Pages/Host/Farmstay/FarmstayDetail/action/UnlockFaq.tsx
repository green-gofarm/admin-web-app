import { memo, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstayFaqs } from '../../../../../../redux/farmstay/action';
import useCurrentUser from '../../../../../../hooks/useCurrentUser';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { FAQ_STATUSES } from '../../../../../../setting/faqs-status-setting';

interface UnlockFaqProps {
    open?: boolean,
    faq?: any,
    onSuccessCallback?: () => void,
    onClose: () => void,
}

function UnlockFaq({
    open,
    faq,
    onSuccessCallback,
    onClose,
}: UnlockFaqProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const user = useCurrentUser();

    const handleSubmit = () => {
        if (!faq?.id) return;
        if (!faq?.farmstayId) return;
        if (!user?.id) return;

        dispatch(updateFarmstayFaqs(
            user.id,
            faq.farmstayId,
            faq.id,
            { status: FAQ_STATUSES.ACTIVE },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Cập nhật thành công");
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback();
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
            title="Mở khóa câu hỏi"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn mở khóa
                    <b>{` ${faq?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(UnlockFaq);
