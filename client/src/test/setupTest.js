import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

const customRender = node => {
  return render(<Router>{node}</Router>);
};

export * from "@testing-library/react";
export { customRender as render, cleanup };
