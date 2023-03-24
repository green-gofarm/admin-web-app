import { getFarmstayDetail } from './../../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useFarmstayDetail(id: any) {

    const dispatch = useDispatch();
    const farmstayDetail = useSelector((state: RootState) => state.farmstay.farmstayDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            dispatch(getFarmstayDetail(id, { loading: setLoading }));
        }
    }, [dispatch, id])

    return { farmstayDetail, loading };
}

export default useFarmstayDetail