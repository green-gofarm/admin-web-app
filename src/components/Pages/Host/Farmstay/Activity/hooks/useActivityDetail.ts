import { useCallback } from 'react';
import { getActivityDetail } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useActivityDetail(farmstayId: any, activityId: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.farmstay.activityDetail);

    const [loading, setLoading] = useState<boolean>(false);

    const refresh = useCallback(() => {
        if (farmstayId && activityId) {
            dispatch(getActivityDetail(farmstayId, activityId, { loading: setLoading }));
        }
    }, [activityId, dispatch, farmstayId]);

    useEffect(() => {
        if (farmstayId && activityId) {
            refresh();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activityId, farmstayId])

    return { detail, loading, refresh };
}

export default useActivityDetail;