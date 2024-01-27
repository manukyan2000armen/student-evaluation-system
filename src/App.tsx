import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { MyRouter } from "./router/MyRouter";

function App() {
    return (
        <div>
            <BrowserRouter>
                <MyRouter />
            </BrowserRouter>
        </div>
    );
}

export default App;
