import { getFarmstaySchedule } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

interface FarmstayScheduleHookProps {
    farmstayId?: any,
    date?: any,
    limit?: number
}

function useFarmstaySchedule(options: FarmstayScheduleHookProps) {

    const dispatch = useDispatch();
    const schedule = useSelector((state: RootState) => state.farmstay.schedule);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (options.farmstayId && options.date && options.limit) {
            dispatch(getFarmstaySchedule(
                {
                    farmstayId: options.farmstayId,
                    date: options.date,
                    limit: options.limit,
                },
                { loading: setLoading }
            ));
        }
    }, [dispatch, options.date, options.farmstayId, options.limit])

    return { schedule, loading };
}

export default useFarmstaySchedule;