import { getOrderDetail } from './../../../../../redux/order/action';
import { RootState } from './../../../../../redux/redux-setting';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useOrderDetail(id: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.order.orderDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            dispatch(getOrderDetail(id, { loading: setLoading }));
        }
    }, [dispatch, id])

    return { detail, loading };
}

export default useOrderDetail