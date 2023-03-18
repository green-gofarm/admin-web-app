import { useSelector } from "react-redux";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { RootState } from "../../redux/redux-setting";

const NoAuth = () => {
    const [searchParams] = useSearchParams();
    const user = useSelector((state: RootState) => state.auth.user);

    if (user) {
        return <Navigate to={searchParams.get("backUrl") ?? "/"} replace />
    }

    return (
        <Outlet />
    );
};

export default NoAuth;
