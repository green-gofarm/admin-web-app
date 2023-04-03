import { ROLES } from './../../../../../setting/setting';
import { getUserDetail } from './../../../../../redux/user/action';
import { RootState } from './../../../../../redux/redux-setting';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

function useUserDetail(id: any, role: any) {

    const dispatch = useDispatch();
    const detail = useSelector((state: RootState) => state.user.userDetail);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id && role && role in ROLES) {
            dispatch(getUserDetail(id, role, { loading: setLoading }));
        }
    }, [dispatch, id, role])

    return { detail, loading };
}

export default useUserDetail