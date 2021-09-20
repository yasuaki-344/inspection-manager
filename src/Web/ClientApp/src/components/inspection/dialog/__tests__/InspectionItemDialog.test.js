import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen } from "@testing-library/react";
import { InspectionItemDialog } from "../InspectionItemDialog";

it("renders without crashing", async () => {
  await act(async () => {
    render(
      <InspectionItemDialog
        open={true}
        handleClose={() => {}}
        handleInspectionItem={() => {}}
      />
    );
  });
});

it("edit button", async () => {
  await act(async () => {
    render(
      <InspectionItemDialog
        open={true}
        handleClose={() => {}}
        handleInspectionItem={() => {}}
      />
    );
  });
  fireEvent.change(screen.getByDisplayValue(""), {
    target: { value: "content" },
  });
});

it("click cancel button", async () => {
  await act(async () => {
    render(
      <InspectionItemDialog
        open={true}
        handleClose={() => {}}
        handleInspectionItem={() => {}}
      />
    );
  });
  fireEvent.click(screen.getByText(/キャンセル/i));
});
