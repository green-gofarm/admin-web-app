import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/redux-setting";

const NoAuth = () => {

    const user = useSelector((state: RootState) => state.auth.user);

    console.log(user);

    if (user) {
        <Navigate to="/" replace />
    }

    return (
        <>
            <Navigate to="/authentication/sign-in" replace />
            <Outlet />
        </>
    );
};

export default NoAuth;
