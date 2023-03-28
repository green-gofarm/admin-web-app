import { useCallback } from 'react';
import { getRoomDetail } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useRoomDetail(farmstayId: any, roomId: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.farmstay.roomDetail);

    const [loading, setLoading] = useState<boolean>(false);

    const refresh = useCallback(() => {
        if (farmstayId && roomId) {
            dispatch(getRoomDetail(farmstayId, roomId, { loading: setLoading }));
        }
    }, [dispatch, farmstayId, roomId])

    useEffect(() => {
        if (farmstayId && roomId) {
            refresh()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [farmstayId, roomId])

    return { detail, loading, refresh };
}

export default useRoomDetail;