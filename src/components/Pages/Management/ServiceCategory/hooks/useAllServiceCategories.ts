import { getAllServiceCategories } from './../../../../../redux/service/action';
import { RootState } from '../../../../../redux/redux-setting';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'

function useAllServiceCategories() {

    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.service.allServiceCategories);

    useEffect(() => {
        if (categories.length < 1) {
            dispatch(getAllServiceCategories());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return categories;
}

export default useAllServiceCategories