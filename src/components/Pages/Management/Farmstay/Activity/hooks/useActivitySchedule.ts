import { getActivitySchedule } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useActivitySchedule(activityId?: any, farmstayId?: any, date?: any) {

    const dispatch = useDispatch();
    const activitySchedule = useSelector((state: RootState) => state.farmstay.activitySchedule);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (farmstayId && activityId && date) {
            dispatch(getActivitySchedule(
                {
                    farmstayId,
                    activityId,
                    date
                },
                { loading: setLoading }
            ));
        }
    }, [activityId, date, dispatch, farmstayId])

    return { activitySchedule, loading };
}

export default useActivitySchedule;