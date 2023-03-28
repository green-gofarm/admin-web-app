import { storeDistricts, storeWards } from './../../../../../redux/farmstay/action';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { isAvailableArray } from '../../../../../helpers/arrayUtils';
import useDelayLoading from '../../../../../hooks/useDelayLoading';

const api = 'https://provinces.open-api.vn/api';

async function fetchDistricts(provinceId: any) {
    try {
        const data = await fetch(`${api}/p/${provinceId}?depth=2`);
        return await data.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

function useDistricts(provinceId: any) {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading, 100);
    const districts = useSelector((state: RootState) => state.farmstay.districts);

    useEffect(() => {
        dispatch(storeDistricts([]));
        dispatch(storeWards([]));

        if (provinceId != null) {
            const getData = async () => {
                setLoading(true);
                const data = await fetchDistricts(provinceId);
                setLoading(false);
                dispatch(storeDistricts(isAvailableArray(data.districts) ? data.districts : []));
            }
            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, provinceId]);


    return { districts, loading: delay };
}

export default useDistricts;