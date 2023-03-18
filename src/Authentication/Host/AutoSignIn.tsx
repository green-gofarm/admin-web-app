import React, { useCallback, useEffect, useState } from 'react'
import { auth, authObject } from '../../Firebase/firebase';
import { useDispatch } from 'react-redux';
import { signInAdmin, signOutUser } from '../../redux/auth/action';
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
            if (location.pathname !== "/") {
                navigate(`/authentication/sign-in?backUrl=${location.pathname + location.search}`);
            }

            navigate("/authentication/sign-in");
        }
        auth.signOut();
    }, [dispatch, location.pathname, location.search, navigate]);

    useEffect(() => {
        const unregisterAuthObserver = authObject().onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                signOut();
                return;
            }

            const token = await currentUser.getIdToken();

            if (!token) {
                signOut();
                return;
            }

            if (!user) {
                dispatch(signInAdmin({
                    loading: setLoading,
                    onFailure: (error: any) => {
                        signOut();
                        toast.error("Không thể lấy thông tin tài khoản. Vui lòng đăng nhập lại");
                    }
                }));
            }
        });

        return () => unregisterAuthObserver();
    }, [dispatch, signOut, user])

    if (loading) {
        return <Loader />
    }

    return (
        <Outlet />
    )
}

export default AutoSignIn