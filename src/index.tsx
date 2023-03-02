import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
const Dashboard = React.lazy(() =>
    import("./components/Dashboard/Dashboard-1/Dashboard")
);
const Dashboard2 = React.lazy(() =>
    import("./components/Dashboard/Dashboard-2/Dashboard2")
);
const Dashboard3 = React.lazy(() =>
    import("./components/Dashboard/Dashboard-3/Dashboard3")
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


//Error pages
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
                                <Route index element={<AuthSignIn />} />

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
                                    element={<Dashboard />}
                                />

                                <Route path="/dashboard">
                                    <Route
                                        index
                                        element={<Dashboard />}
                                    />

                                    <Route
                                        path="/dashboard/overview"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="dashboard/income"
                                        element={<Dashboard2 />}
                                    />
                                    <Route
                                        path="dashboard/farmstay"
                                        element={<Dashboard3 />}
                                    />
                                </Route>

                                <Route path="/management">
                                    <Route
                                        index
                                        element={<AdminManagement />}
                                    />

                                    <Route path="/management/account">
                                        <Route
                                            index
                                            element={<AdminManagement />}
                                        />
                                        <Route
                                            path="/management/account/admin"
                                            element={<AdminManagement />}
                                        />
                                        <Route
                                            path="/management/account/host"
                                            element={<HostManagement />}
                                        />
                                        <Route
                                            path="/management/account/customer"
                                            element={<CustomerManagement />}
                                        />
                                    </Route>

                                    <Route
                                        path="/management/farmstay"
                                        element={<FarmstayManagement />}
                                    />
                                    <Route
                                        path="/management/order"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/management/withdrawal-request"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/management/feedback"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/management/room-category"
                                        element={<RoomCategoryManagement />}
                                    />
                                    <Route
                                        path="/management/service-category"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/management/tags"
                                        element={<Dashboard />}
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
