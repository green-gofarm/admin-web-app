import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/redux-setting";
import useBackUrl from "../../hooks/useBackUrl";

const NoAuth = () => {
    // const user = useSelector((state: RootState) => state.auth.user);

    // const { getBackUrl } = useBackUrl();

    // if (user) {
    //     return <Navigate to={getBackUrl() ?? "/"} replace />
    // }

    return (
        <Outlet />
    );
};

export default NoAuth;
