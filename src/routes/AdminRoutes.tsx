import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Loader from "../shade/Loaders/Loaders";
import NoAuth from "../Authentication/Admin/NoAuth";
import Auth from "../Authentication/Admin/Auth";
import AutoSignIn from "../Authentication/Admin/AutoSignIn";

//Auth
const AuthSignIn = React.lazy(() => import("../Authentication/Admin/SignIn"));
// const AuthSignUp = React.lazy(() => import("../Authentication/SignUp"))

// Profile
const AdminProfile = React.lazy(() => import("../components/Pages/Profile/AdminProfile"));

//Notification
const AdminNotifications = React.lazy(() => import("../components/Pages/Notifications/AdminNotifications"));

//App pages
const App = React.lazy(() => import("../shade/layouts/App"));
const Overview = React.lazy(() =>
    import("../components/Pages/Dashboard/overview/Overview")
);

// Management
const AdminManagement = React.lazy(() =>
    import("../components/Pages/Management/Account/admin/AdminManagement")
);
const HostManagement = React.lazy(() =>
    import("../components/Pages/Management/Account/host/HostManagement")
);
const CustomerManagement = React.lazy(() =>
    import("../components/Pages/Management/Account/customer/CustomerManagement")
);
const FarmstayManagement = React.lazy(() =>
    import("../components/Pages/Management/Farmstay/FarmstayManagement")
);
const FarmstayPreviewManagement = React.lazy(() =>
    import("../components/Pages/Management/Farmstay/Preview/FarmstayPreviewManagement")
);
const RoomCategoryManagement = React.lazy(() =>
    import("../components/Pages/Management/RoomCategory/RoomCategoryManagement")
);
const ServiceCategoryManagement = React.lazy(() =>
    import("../components/Pages/Management/ServiceCategory/ServiceCategoryManagement")
);
const TagManagement = React.lazy(() =>
    import("../components/Pages/Management/Tag/TagManagement")
);
const OrderManagement = React.lazy(() =>
    import("../components/Pages/Management/Order/OrderManagement")
);
const WithdrawalRequestManagement = React.lazy(() =>
    import("../components/Pages/Management/WithdrawalRequest/WithdrawalRequestManagement")
);
const FeedbackManagement = React.lazy(() =>
    import("../components/Pages/Management/Feedback/FeedbackManagement")
);

// Detail
const AdminDetail = React.lazy(() =>
    import("../components/Pages/Management/Account/admin/AdminDetail")
);
const CustomerDetail = React.lazy(() =>
    import("../components/Pages/Management/Account/customer/CustomerDetail")
);
const HostDetail = React.lazy(() =>
    import("../components/Pages/Management/Account/host/HostDetail")
);
const FarmstayDetail = React.lazy(() =>
    import("../components/Pages/Management/Farmstay/FarmstayDetail/FarmstayDetail")
);
const FarmstayPreviewDetail = React.lazy(() =>
    import("../components/Pages/Management/Farmstay/FarmstayDetail/FarmstayPreview")
);
const OrderDetail = React.lazy(() =>
    import("../components/Pages/Management/Order/OrderDetail")
);
const WithdrawalRequestDetail = React.lazy(() =>
    import("../components/Pages/Management/WithdrawalRequest/WithdrawalRequestDetail")
);
const ActivityDetail = React.lazy(() =>
    import("../components/Pages/Management/Farmstay/Activity/ActivityDetail")
);

// Error pages
const Custompages = React.lazy(() => import("../shade/layouts/custompages"));

const Error404 = React.lazy(() =>
    import("../components/Pages/Authentication/404Error/404Error")
);

function AdminRoutes() {
    return (
        <>
            <BrowserRouter>
                <React.Suspense fallback={<Loader />}>
                    <Routes>
                        <Route element={<AutoSignIn />}>
                            <Route path="/authentication">
                                <Route index element={<NoAuth />} />

                                <Route
                                    path="/authentication/sign-in"
                                    element={<AuthSignIn />}
                                />
                            </Route>

                            <Route element={<Auth />}>
                                <Route path="/" element={<App />}>
                                    <Route
                                        index
                                        element={<Navigate to="/dashboard/overview" />}
                                    />

                                    <Route path="/profile" element={<AdminProfile />} />

                                    <Route path="/notification" element={<AdminNotifications />} />

                                    <Route path="/dashboard">
                                        <Route
                                            index
                                            element={<Navigate to="/dashboard/overview" />}
                                        />

                                        <Route
                                            path="/dashboard/overview"
                                            element={<Overview />}
                                        />
                                    </Route>

                                    <Route path="/management"                                >
                                        <Route
                                            index
                                            element={<Navigate to="/management/account" />}
                                        />

                                        <Route path="/management/account">
                                            <Route
                                                index
                                                element={<Navigate to="/management/account/host" />}
                                            />

                                            <Route path="/management/account/admin"                                        >
                                                <Route
                                                    index
                                                    element={<AdminManagement />}
                                                />

                                                <Route
                                                    path="/management/account/admin/:id"
                                                    element={<AdminDetail />}
                                                />
                                            </Route>

                                            <Route path="/management/account/host"                                        >
                                                <Route
                                                    index
                                                    element={<HostManagement />}
                                                />

                                                <Route
                                                    path="/management/account/host/:id"
                                                    element={<HostDetail />}
                                                />
                                            </Route>

                                            <Route path="/management/account/customer"                                        >
                                                <Route
                                                    index
                                                    element={<CustomerManagement />}
                                                />

                                                <Route
                                                    path="/management/account/customer/:id"
                                                    element={<CustomerDetail />}
                                                />
                                            </Route>
                                        </Route>

                                        <Route path="/management/farmstay">
                                            <Route
                                                index
                                                element={<Navigate to="/management/farmstay/preview" />}
                                            />

                                            <Route path="/management/farmstay/preview">
                                                <Route
                                                    index
                                                    element={<FarmstayPreviewManagement />}
                                                />
                                                <Route
                                                    path="/management/farmstay/preview/:id"
                                                    element={<FarmstayPreviewDetail />}
                                                />
                                            </Route>

                                            <Route path="/management/farmstay/all">
                                                <Route
                                                    index
                                                    element={<FarmstayManagement />}
                                                />
                                                <Route
                                                    path="/management/farmstay/all/:id"
                                                    element={<FarmstayDetail />}
                                                />
                                                <Route
                                                    path="/management/farmstay/all/:id/activity/:activityId"
                                                    element={<ActivityDetail />}
                                                />
                                            </Route>

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

                                        <Route
                                            path="/management/feedback"
                                            element={<FeedbackManagement />}
                                        />
                                        <Route
                                            path="/management/room-category"
                                            element={<RoomCategoryManagement />}
                                        />
                                        <Route
                                            path="/management/service-category"
                                            element={<ServiceCategoryManagement />}
                                        />
                                        <Route
                                            path="/management/tags"
                                            element={<TagManagement />}
                                        />

                                    </Route>
                                </Route>
                            </Route>
                            <Route path="/" element={<Custompages />}>
                                <Route path="*" element={<Error404 />}></Route>
                            </Route>
                        </Route>
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
        </>
    )
}

export default AdminRoutes;