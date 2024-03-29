import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Loader from "../shade/Loaders/Loaders";
import NoAuth from "../Authentication/Admin/NoAuth";
import Auth from "../Authentication/Admin/Auth";
import AutoSignIn from "../Authentication/Admin/AutoSignIn";

//Auth
const AuthSignIn = React.lazy(() => import("../Authentication/Admin/SignIn"));
const AuthSignUp = React.lazy(() => import("../Authentication/Admin/SignUp"));

// Profile
const AdminProfile = React.lazy(() => import("../components/Pages/Profile/Admin/Profile"));

//Notification
const AdminNotifications = React.lazy(() => import("../components/Pages/Notifications/AdminNotifications"));

//App pages
const App = React.lazy(() => import("../shade/layouts/App"));
const Overview = React.lazy(() =>
    import("../components/Pages/Dashboard/overview/Overview")
);

// Management
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
const ReportedFeedbackManagement = React.lazy(() =>
    import("../components/Pages/Management/Feedback/ReportedFeedback/ReportedFeedbackManagement")
);

// Detail
const CustomerDetail = React.lazy(() =>
    import("../components/Pages/Management/Account/customer/customer-detail/CustomerDetail")
);
const HostDetail = React.lazy(() =>
    import("../components/Pages/Management/Account/host/host-detail/HostDetail")
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
const RoomDetail = React.lazy(() =>
    import("../components/Pages/Management/Farmstay/Room/RoomDetail")
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
                            <Route path="/authentication" element={<NoAuth />}>
                                <Route
                                    path="/authentication/sign-in"
                                    element={<AuthSignIn />}
                                />
                                {/* TODO: remove */}
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

                                            <Route
                                                path="/management/farmstay/:id/activity/:activityId"
                                                element={<ActivityDetail />}
                                            />
                                            <Route
                                                path="/management/farmstay/:id/room/:roomId"
                                                element={<RoomDetail />}
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

                                        <Route path="/management/feedback">
                                            <Route
                                                index
                                                element={<Navigate to="/management/feedback/reported" />}
                                            />

                                            <Route
                                                path="/management/feedback/reported"
                                                element={<ReportedFeedbackManagement />}
                                            />

                                            <Route
                                                path="/management/feedback/all"
                                                element={<FeedbackManagement />}
                                            />
                                        </Route>
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

export default AdminRoutes;