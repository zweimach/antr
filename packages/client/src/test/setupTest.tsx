import React from "react";
import { render, cleanup } from "@testing-library/react";
import { RouterProvider } from "react-router5";

import router from "../shared/router";

const customRender = (node: JSX.Element) => {
  return render(<RouterProvider router={router}>{node}</RouterProvider>);
};

export * from "@testing-library/react";
export { customRender as render, cleanup };
