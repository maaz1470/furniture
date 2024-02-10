import React from "react";
import ReactDOM from 'react-dom/client'


if(document.getElementById('app')){
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(
        <React.StrictMode>
            <h1>Hello Something</h1>
        </React.StrictMode>
    )
}