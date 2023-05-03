import { getRoomSchedule } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

interface RoomScheduleHookProps {
    roomId?: any,
    farmstayId?: any,
    date?: any,
    limit?: number
}


function useRoomSchedule(options: RoomScheduleHookProps) {

    const dispatch = useDispatch();
    const roomSchedule = useSelector((state: RootState) => state.farmstay.roomSchedule);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (options.roomId && options.farmstayId && options.date && options.limit) {
            dispatch(getRoomSchedule(
                {
                    farmstayId: options.farmstayId,
                    roomId: options.roomId,
                    date: options.date,
                    limit: options.limit,
                },
                { loading: setLoading }
            ));
        }
    }, [dispatch, options.roomId, options.farmstayId, options.date, options.limit])

    return { roomSchedule, loading };
}

export default useRoomSchedule;