import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Edit } from "../Edit";

jest.mock("../form/InspectionSheetForm", () => {
  return {
    InspectionSheetForm: (props) => {
      return <></>;
    },
  };
});

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
        <Edit match={{ params: { id: "guid" } }} />
      </MemoryRouter>
    );
  });
});

it("submit", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Edit match={{ params: { id: "guid" } }} />
      </MemoryRouter>
    );
    fireEvent.submit(screen.getByTestId("form"));
  });
});
