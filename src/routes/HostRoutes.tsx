import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Loader from "../shade/Loaders/Loaders";
import NoAuth from "../Authentication/Host/NoAuth";
import Auth from "../Authentication/Host/Auth";
import AutoSignIn from "../Authentication/Host/AutoSignIn";

//Auth
const AuthSignIn = React.lazy(() => import("../Authentication/Host/SignIn"));
const AuthSignUp = React.lazy(() => import("../Authentication/Host/SignUp"))

// Profile
const AdminProfile = React.lazy(() => import("../components/Pages/Profile/AdminProfile"));

//Notification
const AdminNotifications = React.lazy(() => import("../components/Pages/Notifications/AdminNotifications"));

//App pages
const App = React.lazy(() => import("../shade/layouts/App"));
const Overview = React.lazy(() =>
    import("../components/Pages/Dashboard/overview/Overview")
);

// Error pages
const Custompages = React.lazy(() => import("../shade/layouts/custompages"));

const Error404 = React.lazy(() =>
    import("../components/Pages/Authentication/404Error/404Error")
);

function HostRoutes() {
    return (
        <>
            <BrowserRouter>
                <React.Suspense fallback={<Loader />}>
                    <Routes>
                        <Route element={<AutoSignIn />}>
                            <Route path="/authentication" element={<NoAuth />}>
                                <Route
                                    path="/authentication/sign-in"
                                    element={<AuthSignIn />}
                                />
                                <Route
                                    path="/authentication/sign-up"
                                    element={<AuthSignUp />}
                                />
                            </Route>
                            <Route path="/" element={<Auth />}>
                                <Route path="/" element={<App />}>
                                    <Route
                                        index
                                        element={<Overview />}
                                    />

                                    <Route path="/profile" element={<AdminProfile />} />

                                    <Route path="/notification" element={<AdminNotifications />} />

                                    <Route path="/dashboard">
                                        <Route
                                            path="/dashboard"
                                            element={<Overview />}
                                        />

                                        <Route
                                            path="/dashboard/overview"
                                            element={<Overview />}
                                        />
                                    </Route>
                                </Route>
                            </Route>

                            <Route element={<Custompages />}>
                                <Route path="*" element={<Error404 />}></Route>
                            </Route>
                        </Route>
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
        </>
    )
}

export default HostRoutes;