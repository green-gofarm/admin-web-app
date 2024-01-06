import reportWebVitals from './reportWebVitals';
import React, { useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "./assets/theme/theme.js";
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminRoutes from './routes/AdminRoutes';
import "./index.scss";
import { CURRENT_ROLE, ROLES } from './setting/setting';
import HostRoutes from './routes/HostRoutes';
import Toastify from './components/General/Toastify';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { toast } from 'react-toastify';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const App = () => {

    useEffect(() => {
        toast.info(
            "Our system undergoing maintenance. Website UI available, some features temporarily disabled. Apologies for the inconvenience. Thank you for your understanding.",
            {
                autoClose: false,
                position: 'top-center',
            }
        )
    })

    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Toastify />
                    {CURRENT_ROLE === ROLES.ADMIN
                        ? <AdminRoutes />
                        : null
                    }
                    {CURRENT_ROLE === ROLES.HOST
                        ? <HostRoutes />
                        : null
                    }
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    )
}

root.render(
    <React.Fragment>
        <App />
    </React.Fragment>
);

serviceWorkerRegistration.register();
serviceWorkerRegistration.registerFcm();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
