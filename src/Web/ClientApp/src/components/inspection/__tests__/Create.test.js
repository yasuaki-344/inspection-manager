import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Create } from "../Create";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
});
afterEach(() => {
  jest.resetAllMocks();
});

it("renders without crashing", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
  });
});

it("submit", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
    fireEvent.submit(screen.getByTestId("form"));
  });
});
