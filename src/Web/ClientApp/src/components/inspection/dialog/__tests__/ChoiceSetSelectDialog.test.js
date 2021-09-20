import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen } from "@testing-library/react";
import { ChoiceSetSelectDialog } from "../ChoiceSetSelectDialog";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { choices: ["choice1-1", "choice1-2"] },
          { choices: ["choice2-1", "choice2-2"] },
          { choices: ["choice3-1", "choice3-2"] },
        ]),
    })
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
});
afterEach(() => {
  jest.resetAllMocks();
});

it("renders without crashing", async () => {
  await act(async () => {
    render(<ChoiceSetSelectDialog open={true} handleClose={() => {}} />);
  });
});

it("select template", async () => {
  await act(async () => {
    render(<ChoiceSetSelectDialog open={true} handleClose={() => {}} />);
  });
  fireEvent.click(screen.getByTestId("radio-0"));
  fireEvent.click(screen.getByTestId("radio-1"));
  fireEvent.click(screen.getByText(/ok/i));
});

it("click cancel button", async () => {
  await act(async () => {
    render(<ChoiceSetSelectDialog open={true} handleClose={() => {}} />);
  });
  fireEvent.click(screen.getByText(/キャンセル/i));
});
