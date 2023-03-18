import React, { useCallback, useEffect } from 'react'
import { auth, authObject } from '../../Firebase/firebase';
import { useDispatch } from 'react-redux';
import { signInAdmin, signOutUser } from '../../redux/auth/action';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AutoSignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const signOut = useCallback(() => {
        dispatch(signOutUser());
        if (!location.pathname.startsWith("/authentication/sign-in")) {
            navigate(`/authentication/sign-in?backUrl=${location.pathname + location.search}`);
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

            dispatch(signInAdmin({
                onFailure: (error: any) => {
                    signOut();
                    toast.error("Không thể lấy thông tin tài khoản. Vui lòng đăng nhập lại");
                }
            }));
        });

        return () => unregisterAuthObserver();
    }, [dispatch, signOut])

    return (
        <Outlet />
    )
}

export default AutoSignIn