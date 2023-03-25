import { getAllTagCategories } from './../../../../../redux/tag/action';
import { RootState } from '../../../../../redux/redux-setting';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'

function useAllTagCategories() {

    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.tag.allTagCategories);

    useEffect(() => {
        if (categories.length < 1) {
            dispatch(getAllTagCategories());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return categories;
}

export default useAllTagCategories;