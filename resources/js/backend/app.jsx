import React from "react";
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminURL } from "./hook/useAdminUrl";
import Main from "./Layout/Main";
import Login from "./Pages/Auth/Login";


const router = createBrowserRouter([
    {
        path: AdminURL,
        element: <Main />,
        children: [
            {
                path: '',
                element: <Login />
            }
        ]
    }
])





if(document.getElementById('app')){
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(
        <React.StrictMode>
            <RouterProvider router={router}></RouterProvider>
        </React.StrictMode>
    )
}