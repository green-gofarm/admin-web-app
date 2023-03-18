import React from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Toastify() {
    return (
        <ToastContainer
            limit={2}
            autoClose={2000}
            position="bottom-right"
        />
    )
}

export default Toastify;
