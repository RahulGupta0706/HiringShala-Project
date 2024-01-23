import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css'

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>,
);
