import { getFarmstayDetail } from './../../../../../../redux/farmstay/action';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux'

function useFarmstayDetail(id: any) {

    const dispatch = useDispatch();
    const [farmstayDetail, setFarmstayDetail] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const refresh = useCallback(() => {
        if (id) {
            const onSuccess = (response: any) => {
                setFarmstayDetail(response?.data);
            }
            const onFailure = () => {
                setFarmstayDetail(null);
            }
            dispatch(getFarmstayDetail(id, { loading: setLoading, onSuccess, onFailure }));
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