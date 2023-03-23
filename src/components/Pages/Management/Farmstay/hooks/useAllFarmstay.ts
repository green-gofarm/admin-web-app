import { searchAllFarmstays } from './../../../../../redux/farmstay/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function useAllFarmstays() {
    const dispatch = useDispatch();
    const allFarmstays = useSelector((state: RootState) => state.farmstay.allFarmstays);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (allFarmstays.length < 1) {
            dispatch(searchAllFarmstays({
                loading: setLoading
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return { allFarmstays, loading };
}

export default useAllFarmstays