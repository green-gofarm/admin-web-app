import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../redux/redux-setting";

const Auth = () => {

  // const location = useLocation();
  // const user = useSelector((state: RootState) => state.auth.user);

  // if (!user) {
  //   return <Navigate to={`/authentication/sign-in?backUrl=${location.pathname + location.search}`} replace />
  // }

  return <Outlet />;
};

export default Auth;
