import { searchAllCustomers } from './../../../../../redux/user/action';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function useAllCustomers() {
    const dispatch = useDispatch();
    const allCustomers = useSelector((state: RootState) => state.user.allCustomers);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (allCustomers.length < 1) {
            dispatch(searchAllCustomers({
                loading: setLoading
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return { allCustomers, loading };
}

export default useAllCustomers