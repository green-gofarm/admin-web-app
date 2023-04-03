import { storeWards } from './../../../../../redux/farmstay/action';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { isAvailableArray } from '../../../../../helpers/arrayUtils';
import useDelayLoading from '../../../../../hooks/useDelayLoading';

const api = 'https://provinces.open-api.vn/api';

async function fetchWards(districtId: any) {
    try {
        const data = await fetch(`${api}/d/${districtId}?depth=2`);
        return await data.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

function useWards(districtId: any) {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading, 100);
    const wards = useSelector((state: RootState) => state.farmstay.wards);

    useEffect(() => {
        dispatch(storeWards([]));
        if (districtId != null) {
            const getData = async () => {
                setLoading(true);
                const data = await fetchWards(districtId);
                setLoading(false);
                dispatch(storeWards(isAvailableArray(data.wards) ? data.wards : []));
            }
            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, districtId]);


    return { wards, loading: delay };
}

export default useWards;