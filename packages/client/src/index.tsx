import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router5";

import "./index.css";
import App from "./App";
import router from "./shared/router";

ReactDOM.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
  document.getElementById("root")
);
