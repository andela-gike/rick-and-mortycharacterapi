import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders label in nav header", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Rick and morty/i);
  expect(linkElement).toBeInTheDocument();
});
