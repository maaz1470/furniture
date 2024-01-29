import React from "react";
import ReactDOM from 'react-dom/client'
import Example from './components/Example'
import Home from "./components/Page/Home";


console.log('something')

if(document.getElementById('root')){
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
        <React.StrictMode>
            <Home />
        </React.StrictMode>
    )
}