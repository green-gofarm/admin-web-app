import { getServiceCategoryDetail } from './../../../../../redux/service/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function useServiceCategoryDetail(id: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.service.serviceCategoryDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            dispatch(getServiceCategoryDetail(id, { loading: setLoading }))
        }
    }, [dispatch, id]);


    return { detail, loading };
}

export default useServiceCategoryDetail