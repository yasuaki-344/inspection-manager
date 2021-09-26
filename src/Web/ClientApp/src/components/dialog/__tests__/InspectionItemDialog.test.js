import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen } from "@testing-library/react";
import { InspectionItemDialog } from "../InspectionItemDialog";

it("renders without crashing", async () => {
  await act(async () => {
    render(
      <InspectionItemDialog
        open={true}
        onCancelButtonClick={() => {}}
        onOkButtonClick={() => {}}
      />
    );
  });
});

it("edit button", async () => {
  await act(async () => {
    render(
      <InspectionItemDialog
        open={true}
        onCancelButtonClick={() => {}}
        onOkButtonClick={() => {}}
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
        onCancelButtonClick={() => {}}
        onOkButtonClick={() => {}}
      />
    );
  });
  fireEvent.click(screen.getByText(/キャンセル/i));
});
