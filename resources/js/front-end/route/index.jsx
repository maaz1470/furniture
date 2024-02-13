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
            { path: "/shop", element: <h1>Shop</h1> },
            { path: "/blog", element: <h1>Blog</h1> },
            { path: "/contact", element: <h1>contact</h1> },
        ],
    },
]);
export default route;
