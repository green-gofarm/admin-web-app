import { getDisbursementDetail } from './../../../../../redux/order/action';
import { RootState } from './../../../../../redux/redux-setting';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useDisbursementDetail(id: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.order.disbursementDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            dispatch(getDisbursementDetail(id, { loading: setLoading }));
        }
    }, [dispatch, id])

    return { detail, loading };
}

export default useDisbursementDetail;