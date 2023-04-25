import { getOrderDetail } from './../../../../../redux/order/action';
import { RootState } from './../../../../../redux/redux-setting';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useOrderDetail(id: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.order.orderDetail);

    const [loading, setLoading] = useState<boolean>(false);

    const refresh = useCallback(() => {
        if (id) {
            dispatch(getOrderDetail(id, { loading: setLoading }));
        }
    }, [dispatch, id]);

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return { detail, loading, refresh };
}

export default useOrderDetail