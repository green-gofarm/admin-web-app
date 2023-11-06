import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/redux-setting';
import { getBankList } from '../redux/farmstay/action';

function useBanks() {
    const dispatch = useDispatch();
    const banks = useSelector((state: RootState) => state.farmstay.banks);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (banks.length < 1) {
            dispatch(getBankList({
                loading: setLoading
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return { banks, loading };
}

export default useBanks