import React from "react";

import ReactDOM from 'react-dom/client'
import Home from "./front-end/Page/Home";


if (document.getElementById("root")) {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
        <React.StrictMode>
            <RouterProvider router={route} />
        </React.StrictMode>
    );
}
