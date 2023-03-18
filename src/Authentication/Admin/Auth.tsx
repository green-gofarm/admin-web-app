import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/redux-setting";

const Auth = () => {

  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    <Navigate to="/authentication/sign-in" replace />
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default Auth;
