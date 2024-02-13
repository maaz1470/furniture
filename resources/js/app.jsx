import React from "react";
import ReactDOM from 'react-dom/client'
import route from "./front-end/route";
import { RouterProvider } from "react-router-dom";




if (document.getElementById("root")) {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
        <React.StrictMode>
            <RouterProvider router={route} />
        </React.StrictMode>
    );
}
