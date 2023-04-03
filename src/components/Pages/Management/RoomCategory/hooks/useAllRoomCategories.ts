import { getAllRoomCategories } from './../../../../../redux/room/action';
import { RootState } from './../../../../../redux/redux-setting';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'

function useAllRoomCategories() {

    const dispatch = useDispatch();
    const allRoomCategories = useSelector((state: RootState) => state.room.allRoomCategories);

    useEffect(() => {
        if (allRoomCategories.length < 1) {
            dispatch(getAllRoomCategories());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return allRoomCategories;
}

export default useAllRoomCategories