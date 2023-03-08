import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Authentication/auth";
import "./index.scss";
import Loader from "./shade/Loaders/Loaders"

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "./assets/theme/theme.js";

//Auth
const AuthSignIn = React.lazy(() => import("./Authentication/SignIn"));
const AuthSignUp = React.lazy(() => import("./Authentication/SignUp"))

//App pages
const App = React.lazy(() => import("../src/shade/layouts/App"));
const Overview = React.lazy(() =>
    import("./components/Pages/Dashboard/overview/Overview")
);

// Management
const AdminManagement = React.lazy(() =>
    import("./components/Pages/Management/Account/admin/AdminManagement")
);
const HostManagement = React.lazy(() =>
    import("./components/Pages/Management/Account/host/HostManagement")
);
const CustomerManagement = React.lazy(() =>
    import("./components/Pages/Management/Account/customer/CustomerManagement")
);
const FarmstayManagement = React.lazy(() =>
    import("./components/Pages/Management/Farmstay/FarmstayManagement")
);
const RoomCategoryManagement = React.lazy(() =>
    import("./components/Pages/Management/RoomCategory/RoomCategoryManagement")
);
const ServiceCategoryManagement = React.lazy(() =>
    import("./components/Pages/Management/ServiceCategory/ServiceCategoryManagement")
);
const TagManagement = React.lazy(() =>
    import("./components/Pages/Management/Tag/TagManagement")
);
const OrderManagement = React.lazy(() =>
    import("./components/Pages/Management/Order/OrderManagement")
);
const WithdrawalRequestManagement = React.lazy(() =>
    import("./components/Pages/Management/WithdrawalRequest/WithdrawalRequestManagement")
);
const FeedbackManagement = React.lazy(() =>
    import("./components/Pages/Management/Feedback/FeedbackManagement")
);

// Detail
const AdminDetail = React.lazy(() =>
    import("./components/Pages/Management/Account/admin/AdminDetail")
);
const CustomerDetail = React.lazy(() =>
    import("./components/Pages/Management/Account/customer/CustomerDetail")
);
const HostDetail = React.lazy(() =>
    import("./components/Pages/Management/Account/host/HostDetail")
);
const FarmstayDetail = React.lazy(() =>
    import("./components/Pages/Management/Farmstay/FarmstayDetail/FarmstayDetail")
);
const OrderDetail = React.lazy(() =>
    import("./components/Pages/Management/Order/OrderDetail")
);
const WithdrawalRequestDetail = React.lazy(() =>
    import("./components/Pages/Management/WithdrawalRequest/WithdrawalRequestDetail")
);

// Error pages
const Custompages = React.lazy(() => import("../src/shade/layouts/custompages"));

const Error404 = React.lazy(() =>
    import("./components/Pages/Authentication/404Error/404Error")
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.Fragment>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>

                <BrowserRouter>
                    <React.Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/authentication" element={<Auth />}>
                                <Route index element={<Auth />} />

                                <Route
                                    path="/authentication/sign-in"
                                    element={<AuthSignIn />}
                                />
                                <Route
                                    path="/authentication/sign-up"
                                    element={<AuthSignUp />}
                                />
                            </Route>

                            <Route path="/" element={<App />}>
                                <Route
                                    index
                                    element={<Navigate to="/dashboard/overview" />}
                                />

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
                                            element={<FarmstayManagement />}
                                        />

                                        <Route
                                            path="/management/farmstay/:id"
                                            element={<FarmstayDetail />}
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
                            <Route path="/" element={<Custompages />}>
                                <Route path="*" element={<Error404 />}></Route>
                            </Route>
                        </Routes>
                    </React.Suspense>
                </BrowserRouter>
            </ThemeProvider>
        </StyledEngineProvider>
    </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
