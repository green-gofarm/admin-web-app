import { getActivitySchedule } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

interface ActivityScheduleHookProps {
    activityId?: any,
    farmstayId?: any,
    date?: any,
    limit?: number
}


function useActivitySchedule(options: ActivityScheduleHookProps) {

    const dispatch = useDispatch();
    const activitySchedule = useSelector((state: RootState) => state.farmstay.activitySchedule);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (options.activityId && options.farmstayId && options.date && options.limit) {
            dispatch(getActivitySchedule(
                {
                    activityId: options.activityId,
                    farmstayId: options.farmstayId,
                    date: options.date,
                    limit: options.limit,
                },
                { loading: setLoading }
            ));
        }
    }, [dispatch, options.activityId, options.date, options.farmstayId, options.limit])

    return { activitySchedule, loading };
}

export default useActivitySchedule;