import React from "react";
import { cleanup, render } from "./test/setupTest";

import App from "./App";

afterEach(cleanup);

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
