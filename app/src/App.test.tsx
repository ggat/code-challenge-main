import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("./backend", () => {
  const original = jest.requireActual("./backend");

  return {
    ...original,
    fetchDocuments: jest
      .fn()
      .mockImplementation(async () => {
        throw new Error("Fetching of docs failed")
      })
  };
});

describe("App", () => {
  test("shows error message if API fails", async () => {
    const { getByText } = render(<App />);

    await waitFor(() => expect(getByText("Fetching of docs failed")).toBeInTheDocument());
  });
});
