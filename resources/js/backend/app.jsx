import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminURL } from "./hook/useAdminUrl";
import Main from "./Layout/Main";
import Login from "./Pages/Auth/Login";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import AuthLayout from "./Layout/AuthLayout";
import Register from "./Pages/Auth/Register";
import routes from "./routes/routes";
import AuthProvider from "./Provider/AuthProvider";
import './assets/css/style.css'
axios.defaults.baseURL = "http://127.0.0.1:8000";

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("rh_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

if (document.getElementById("app")) {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
        <React.StrictMode>
            <HelmetProvider>
                <AuthProvider>
                    <RouterProvider router={routes}></RouterProvider>
                </AuthProvider>
            </HelmetProvider>
        </React.StrictMode>
    );
}
