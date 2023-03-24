import { getActivityDetail } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useActivityDetail(farmstayId: any, activityId: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.farmstay.activityDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (farmstayId && activityId) {
            dispatch(getActivityDetail(farmstayId, activityId, { loading: setLoading }));
        }
    }, [activityId, dispatch, farmstayId])

    return { detail, loading };
}

export default useActivityDetail;