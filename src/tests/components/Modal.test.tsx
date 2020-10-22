import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Modal from "../../components/Modal";

const dummyUser = {
  id: 17,
  name: "Annie",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Female",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1"
  },
  location: {
    name: "Anatomy Park",
    url: "https://rickandmortyapi.com/api/location/5"
  },
  image: "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/3"],
  url: "https://rickandmortyapi.com/api/character/17"
};
afterEach(cleanup);
const handleClose = jest.fn();

test("renders character details modal", () => {
  const { getByText } = render(
    <Modal details={dummyUser} closeDetails={handleClose} />
  );
  const linkElement = getByText(/Annie/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(getByText(/x/i));
  expect(handleClose).toHaveBeenCalledTimes(1);
});
