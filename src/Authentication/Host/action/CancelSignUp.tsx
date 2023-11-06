import { memo, useState } from 'react'
import { Box } from '@mui/material';
import useDelayLoading from '../../../hooks/useDelayLoading';
import { auth } from '../../../Firebase/firebase';
import ConfirmModel from '../../../components/General/Model/ConfirmModel';

interface CancelSignUpProps {
    open?: boolean,
    onConfirm?: () => void,
    onClose: () => void,
}

function CancelSignUp({
    open,
    onConfirm,
    onClose,
}: CancelSignUpProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = async () => {
        setLoading(true);
        await auth.signOut();
        setLoading(false);
        onConfirm && onConfirm();
    }

    return (
        <ConfirmModel
            open={open}
            title="Hủy đăng ký"
            description={(
                <Box display="inline-block">
                    Xác định hủy quá trình đăng ký?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(CancelSignUp);