import { storeDistricts, storeWards } from './../../../../../redux/farmstay/action';
import { storeProvinces } from '../../../../../redux/farmstay/action';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { isAvailableArray } from '../../../../../helpers/arrayUtils';
import useDelayLoading from '../../../../../hooks/useDelayLoading';

const api = 'https://provinces.open-api.vn/api/';

async function fetchProvince() {
    try {
        const data = await fetch(api);
        return await data.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

function useProvinces() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading, 100);
    const provinces = useSelector((state: RootState) => state.farmstay.provinces);

    useEffect(() => {
        if (provinces.length < 1) {
            const getProvinces = async () => {
                setLoading(true);
                const data = await fetchProvince();
                setLoading(false);
                dispatch(storeProvinces(isAvailableArray(data) ? data : []));
            }

            dispatch(storeDistricts([]));
            dispatch(storeWards([]));
            getProvinces();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    return { provinces, loading: delay };
}

export default useProvinces;