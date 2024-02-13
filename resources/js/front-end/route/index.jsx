import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home";
import MainLayout from "../layout";

const route = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <h1>About</h1> },
        ],
    },
]);
export default route;
