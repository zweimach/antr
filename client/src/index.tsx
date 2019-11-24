import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router5";

import "./index.css";
import App from "./App";
import router from "./router";

ReactDOM.render(
  // eslint-disable-next-line
  // @ts-ignore
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
  document.getElementById("root")
);
