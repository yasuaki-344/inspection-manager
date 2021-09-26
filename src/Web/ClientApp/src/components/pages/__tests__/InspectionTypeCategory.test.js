import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { InspectionTypeCategory } from "../InspectionTypeCategory";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(["type1", "type2"]),
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
        <InspectionTypeCategory />
      </MemoryRouter>
    );
  });
});

it("click add type button", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionTypeCategory />
      </MemoryRouter>
    );
  });
  fireEvent.click(screen.getByTestId("add-type-button"));
});

it("update type", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionTypeCategory />
      </MemoryRouter>
    );
  });
  fireEvent.change(screen.getByDisplayValue("type1"), {
    target: { value: "new type" },
  });
});

it("click remove type button", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionTypeCategory />
      </MemoryRouter>
    );
  });
  fireEvent.click(screen.getByTestId("remove-type-button-0"));
});

it("click submit type button", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <InspectionTypeCategory />
      </MemoryRouter>
    );
    fireEvent.submit(screen.getByTestId("form"));
  });
});
