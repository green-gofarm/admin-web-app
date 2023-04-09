import { getFarmstaySchedule } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useFarmstaySchedule(farmstayId?: any, date?: any) {

    const dispatch = useDispatch();
    const schedule = useSelector((state: RootState) => state.farmstay.schedule);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (farmstayId && date) {
            dispatch(getFarmstaySchedule(
                {
                    farmstayId,
                    date
                },
                { loading: setLoading }
            ));
        }
    }, [date, dispatch, farmstayId])

    return { schedule, loading };
}

export default useFarmstaySchedule;