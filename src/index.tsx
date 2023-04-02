import reportWebVitals from './reportWebVitals';
import React from 'react';
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
import { registerFcm } from './service-worker';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.Fragment>
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
    </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

registerFcm();