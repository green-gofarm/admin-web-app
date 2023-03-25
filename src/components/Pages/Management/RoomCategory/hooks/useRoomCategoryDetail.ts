import { getRoomCategoryDetail } from './../../../../../redux/room/action';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function useRoomCategoryDetail(id: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.room.roomCategoryDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            dispatch(getRoomCategoryDetail(id, { loading: setLoading }))
        }
    }, [dispatch, id]);


    return { detail, loading };
}

export default useRoomCategoryDetail