import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Loader from "../shade/Loaders/Loaders";
import NoAuth from "../Authentication/Host/NoAuth";
import Auth from "../Authentication/Host/Auth";
import AutoSignIn from "../Authentication/Host/AutoSignIn";

// Auth
const AuthSignIn = React.lazy(() => import("../Authentication/Host/SignIn"));
const AuthSignUp = React.lazy(() => import("../Authentication/Host/SignUp"))

// Profile
const HostProfile = React.lazy(() => import("../components/Pages/Profile/Host/Profile"));

// Notification
const AdminNotifications = React.lazy(() => import("../components/Pages/Notifications/AdminNotifications"));

// App pages
const App = React.lazy(() => import("../shade/layouts/App"));
const BookingRequestManagement = React.lazy(() => import("../components/Pages/Host/BookingRequest/BookingRequestManagement"));
const FarmstayManagement = React.lazy(() => import("../components/Pages/Host/Farmstay/FarmstayManagement"));
const WithdrawalRequestManagement = React.lazy(() => import("../components/Pages/Host/WithdrawalRequest//WithdrawalRequestManagement"));
const OrderManagement = React.lazy(() => import("../components/Pages/Host/Order/OrderManagement"));
const OrderDetail = React.lazy(() =>
    import("../components/Pages/Host/Order/OrderDetail")
);

// Detail
const BookingRequestDetail = React.lazy(() => import("../components/Pages/Host/BookingRequest/BookingRequestDetail"));
const WithdrawalRequestDetail = React.lazy(() => import("../components/Pages/Host/WithdrawalRequest/WithdrawalRequestDetail"));
const FarmstayDetail = React.lazy(() => import("../components/Pages/Host/Farmstay/FarmstayDetail/FarmstayDetail"));
const ActivityDetail = React.lazy(() =>
    import("../components/Pages/Host/Farmstay/Activity/ActivityDetail")
);
const RoomDetail = React.lazy(() =>
    import("../components/Pages/Host/Farmstay/Room/RoomDetail")
);
// Error pages
const Custompages = React.lazy(() => import("../shade/layouts/custompages"));

const Error404 = React.lazy(() => import("../components/Pages/Authentication/404Error/404Error"));

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
                                        element={<Navigate to="/management/farmstay" />}
                                    />

                                    <Route
                                        path="/management"
                                        element={<Navigate to="/management/farmstay" />}
                                    />

                                    <Route path="/management/farmstay">
                                        <Route
                                            index
                                            element={<FarmstayManagement />}
                                        />

                                        <Route
                                            path="/management/farmstay/:id"
                                            element={<FarmstayDetail />}
                                        />

                                        <Route
                                            path="/management/farmstay/:id/activity/:activityId"
                                            element={<ActivityDetail />}
                                        />
                                        <Route
                                            path="/management/farmstay/:id/room/:roomId"
                                            element={<RoomDetail />}
                                        />
                                    </Route>

                                    <Route path="/management/order">
                                        <Route
                                            index
                                            element={<OrderManagement />}
                                        />

                                        <Route
                                            path="/management/order/:id"
                                            element={<OrderDetail />}
                                        />
                                    </Route>

                                    <Route path="/management/booking-request">
                                        <Route
                                            index
                                            element={<BookingRequestManagement />}
                                        />
                                        <Route
                                            path="/management/booking-request/:id"
                                            element={<BookingRequestDetail />}
                                        />
                                    </Route>

                                    <Route path="/management/withdrawal-request">
                                        <Route
                                            index
                                            element={<WithdrawalRequestManagement />}
                                        />
                                        <Route
                                            path="/management/withdrawal-request/:id"
                                            element={<WithdrawalRequestDetail />}
                                        />
                                    </Route>

                                    <Route path="/profile" element={<HostProfile />} />

                                    <Route path="/notification" element={<AdminNotifications />} />
                                </Route>
                            </Route>

                            <Route element={<Custompages />}>
                                <Route path="*" element={<Error404 />}></Route>
                                <Route path="/404" element={<Error404 />}></Route>
                            </Route>
                        </Route>
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
        </>
    )
}

export default HostRoutes;