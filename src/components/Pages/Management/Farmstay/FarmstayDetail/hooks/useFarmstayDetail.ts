import { getFarmstayDetail } from './../../../../../../redux/farmstay/action';
import { useEffect, useState, useCallback } from 'react';
import { RootState } from './../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useFarmstayDetail(id: any) {

    const dispatch = useDispatch();
    const farmstayDetail = useSelector((state: RootState) => state.farmstay.farmstayDetail);

    const [loading, setLoading] = useState<boolean>(false);

    const refresh = useCallback(() => {
        if (id) {
            dispatch(getFarmstayDetail(id, { loading: setLoading }));
        }
    }, [dispatch, id])

    useEffect(() => {
        if (id) {
            refresh()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return {
        farmstayDetail,
        loading,
        refresh,
    };
}

export default useFarmstayDetail