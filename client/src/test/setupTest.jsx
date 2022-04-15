import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const customRender = (node) => {
  return render(<Router>{node}</Router>);
};

export { customRender as render };
