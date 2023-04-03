import { getTagDetail } from '../../../../../redux/tag/action';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function useTagDetail(id: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.tag.tagDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            dispatch(getTagDetail(id, { loading: setLoading }))
        }
    }, [dispatch, id]);


    return { detail, loading };
}

export default useTagDetail;