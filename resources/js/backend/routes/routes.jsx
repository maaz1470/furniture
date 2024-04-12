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
import NotFound from "@/backend/Pages/errors/not-found.jsx";
import CategoryLayout from "../Pages/Category/CategoryLayout";
import AddCategory from "../Pages/Category/AddCategory";
import EditCategory from "../Pages/Category/EditCategory";
import SubCategory from "../Pages/SubCategory/SubCategory";
import AddSubCategory from "../Pages/SubCategory/AddSubCategory";
import EditSubCategory from "../Pages/SubCategory/EditSubCategory";
import SubSubCategory from "../Pages/SubSubCategory/SubSubCategory";
import AddSubSubCategory from "../Pages/SubSubCategory/AddSubSubCategory";
import EditSubSubCategory from "../Pages/SubSubCategory/EditSubSubCategory";

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
                        element: <CategoryLayout />,
                        children: [
                            {
                                path: '',
                                element: <Category />
                            },
                            {
                                path: 'add',
                                element: <AddCategory />
                            },
                            {
                                path: 'edit/:id',
                                element: <EditCategory />
                            }
                        ],
                    },
                    {
                        path: 'sub-category',
                        element: <CategoryLayout />,
                        children: [
                            {
                                path: '',
                                element: <SubCategory />
                            },
                            {
                                path: 'add',
                                element: <AddSubCategory />
                            },
                            {
                                path: 'edit/:id',
                                element: <EditSubCategory />
                            }
                        ]
                    },
                    {
                        path: 'sub-sub-category',
                        element: <CategoryLayout />,
                        children: [
                            {
                                path: '',
                                element: <SubSubCategory />
                            },
                            {
                                path:'add',
                                element: <AddSubSubCategory />
                            },
                            {
                                path: 'edit/:id',
                                element: <EditSubSubCategory />
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default routes;
