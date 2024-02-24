import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import { AdminURL } from "../hook/useAdminUrl";
import DashboardLayout from "../Layout/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ResetPassword from "../Pages/Auth/Reset/ResetPassword";
import PasswordReset from "../Pages/Auth/Reset/PasswordReset";
import Category from "@/backend/Pages/Category/Category.jsx";

const routes = createBrowserRouter([
    {
        path: AdminURL,
        element: <Main />,
        children: [
            {
                path: "auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <Register />
                    },
                    {
                        path: "reset-password",
                        element: <ResetPassword />
                    },
                    {
                        path: "reset-password/:token",
                        element: <PasswordReset />
                    }
                ]
            },
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />
                    },
                    {
                        path: 'category',
                        element: <Category />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <h1>404 not found.</h1>
    }
]);

export default routes;
