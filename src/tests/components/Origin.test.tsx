import React from "react";
import { render, cleanup } from "@testing-library/react";
import OriginInfo from "../../components/Origin";

const dummyOrigin = {
  name: "Earth (C-137)",
  url: "https://rickandmortyapi.com/api/location/1"
};
afterEach(cleanup);

test("renders character details origin title", () => {
  const { getByText } = render(
    <OriginInfo url={dummyOrigin.url} name={dummyOrigin.name} />
  );
  const linkElement = getByText(/Origin Information/i);
  expect(linkElement).toBeInTheDocument();
});
