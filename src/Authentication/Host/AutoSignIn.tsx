import { useCallback, useEffect, useState } from 'react'
import { auth, getFirebaseToken, getMessagingToken } from '../../Firebase/firebase';
import { useDispatch } from 'react-redux';
import { signInHost, signOutUser, subscribeMessageToken } from '../../redux/auth/action';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/redux-setting';
import Loader from '../../shade/Loaders/Loaders';

function AutoSignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const [loading, setLoading] = useState(true);

    // Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const signOut = useCallback(() => {
        dispatch(signOutUser());
        if (!location.pathname.startsWith("/authentication")) {
            const newPath = location.pathname !== "/"
                ? `/authentication/sign-in?backUrl=${location.pathname + location.search}`
                : "/authentication/sign-in";
            navigate(newPath);
        }
        auth.signOut();
    }, [dispatch, location.pathname, location.search, navigate]);

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                setLoading(false);
                signOut();
                return;
            }

            const token = await currentUser.getIdToken();
            setLoading(false);

            if (!token) {
                signOut();
                return;
            }
        });

        return () => unregisterAuthObserver();
    }, [dispatch, signOut, user]);

    useEffect(() => {
        async function signIn() {
            const token = await getFirebaseToken();

            const subscribe = async () => {
                const messageToken = await getMessagingToken();
                if (messageToken) {
                    dispatch(subscribeMessageToken(messageToken));
                }
            }

            if (token) {
                dispatch(signInHost({
                    loading: setLoading,
                    onSuccess: () => subscribe(),
                    onFailure: (error: any) => {
                        auth.signOut();
                        toast.error("Không thể lấy thông tin tài khoản. Vui lòng đăng nhập lại");
                    }
                }));
            }
        }

        signIn();
    }, [dispatch]);

    if (loading) {
        return <Loader />
    }

    return (
        <Outlet />
    )
}

export default AutoSignIn