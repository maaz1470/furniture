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

axios.defaults.baseURL = 'http://127.0.0.1:8000';

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('_rh_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})



const router = createBrowserRouter([
    {
        path: AdminURL,
        element: <Main />,
        children: [
            {
                path: "",
                element: <AuthLayout />,
                children: [
                    {
                        path: "",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <Register />
                    }
                ]
            }
        ],
    },
]);

if (document.getElementById("app")) {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
        <React.StrictMode>
            <HelmetProvider>
                <RouterProvider router={router}></RouterProvider>
            </HelmetProvider>
        </React.StrictMode>
    );
}
