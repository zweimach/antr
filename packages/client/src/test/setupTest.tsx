import { render, cleanup } from "@testing-library/react";

const customRender = (node: JSX.Element) => {
  return render(node);
};

export * from "@testing-library/react";
export { customRender as render, cleanup };
