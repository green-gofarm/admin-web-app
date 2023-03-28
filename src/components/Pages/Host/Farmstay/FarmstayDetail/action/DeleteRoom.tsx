import { memo, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import { updateFarmstayRooms } from '../../../../../../redux/farmstay/action';
import useCurrentUser from '../../../../../../hooks/useCurrentUser';
import ConfirmModel from '../../../../../General/Model/ConfirmModel';
import { ROOM_STATUSES } from '../../../../../../setting/room-setting';

interface DeleteRoomProps {
    open?: boolean,
    room?: any,
    onSuccessCallback?: () => void,
    onClose: () => void,
}

function DeleteRoom({
    open,
    room,
    onSuccessCallback,
    onClose,
}: DeleteRoomProps) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);

    const user = useCurrentUser();

    const handleSubmit = () => {
        if (!room?.id) return;
        if (!room?.farmstayId) return;
        if (!user?.id) return;

        dispatch(updateFarmstayRooms(
            user.id,
            room.farmstayId,
            room.id,
            { status: ROOM_STATUSES.DELETED },
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Xóa thành công");
                    onClose && onClose();
                    onSuccessCallback && onSuccessCallback();
                },
                onFailure: () => {
                    toast.error("Xóa thất bại");
                }
            }
        ))
    }

    return (
        <ConfirmModel
            open={open}
            title="Xóa phòng"
            description={(
                <Box display="inline-block">
                    Bạn có chắc chắn muốn xóa
                    <b>{` ${room?.name ?? ""}`}</b> ?
                </Box>
            )}
            loading={delay}
            onCancel={onClose}
            onConfirm={handleSubmit}
        />
    )
}

export default memo(DeleteRoom);