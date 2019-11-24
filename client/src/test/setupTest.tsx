import React from "react";
import { render, cleanup } from "@testing-library/react";
import { RouterProvider } from "react-router5";

import router from "../router";

const customRender = (node: JSX.Element) => {
  // eslint-disable-next-line
  // @ts-ignore
  return render(<RouterProvider router={router}>{node}</RouterProvider>);
};

export * from "@testing-library/react";
export { customRender as render, cleanup };
