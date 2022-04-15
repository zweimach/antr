import { cleanup } from "@testing-library/react";
import React from "react";
import App from "./App";
import { render } from "./test/setupTest";

afterEach(cleanup);

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
