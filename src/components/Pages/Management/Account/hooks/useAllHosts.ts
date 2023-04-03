import { searchAllHosts } from './../../../../../redux/user/action';
import { useEffect, useState } from 'react';
import { RootState } from './../../../../../redux/redux-setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function useAllHosts() {
    const dispatch = useDispatch();
    const allHosts = useSelector((state: RootState) => state.user.allHosts);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (allHosts.length < 1) {
            dispatch(searchAllHosts({
                loading: setLoading
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return { allHosts, loading };
}

export default useAllHosts;