import { getRoomDetail } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useRoomDetail(farmstayId: any, roomId: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.farmstay.roomDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (farmstayId && roomId) {
            dispatch(getRoomDetail(farmstayId, roomId, { loading: setLoading }));
        }
    }, [roomId, dispatch, farmstayId])

    return { detail, loading };
}

export default useRoomDetail;