import { RootState } from './../redux/redux-setting';
import { useSelector } from 'react-redux';

function useCurrentUser() {
    const user = useSelector((state: RootState) => state.auth.user);

    return user;
}

export default useCurrentUser