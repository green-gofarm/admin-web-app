import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {

  return (
    <>
      <Navigate to="/authentication/sign-in" replace />
      <Outlet />
    </>
  );
};

export default Auth;
