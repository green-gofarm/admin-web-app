import { getRoomSchedule } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useRoomSchedule(roomId?: any, farmstayId?: any, date?: any) {

    const dispatch = useDispatch();
    const roomSchedule = useSelector((state: RootState) => state.farmstay.roomSchedule);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (farmstayId && roomId && date) {
            dispatch(getRoomSchedule(
                {
                    farmstayId,
                    roomId,
                    date
                },
                { loading: setLoading }
            ));
        }
    }, [roomId, date, dispatch, farmstayId])

    return { roomSchedule, loading };
}

export default useRoomSchedule;