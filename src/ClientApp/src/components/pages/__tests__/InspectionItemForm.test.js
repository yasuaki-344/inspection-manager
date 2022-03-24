import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DIContainerContext,
  InspectionItemDialogStateContext,
} from "../../../container";
import { InspectionItemForm } from "../InspectionItemForm";

describe("InspectionItemForm component unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IInspectionSheetController: {},
    };
    const inspectionItems = [];

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <InspectionItemDialogStateContext.Provider
          value={[{ isOpen: false }, jest.fn(() => {})]}
        >
          <DndProvider backend={HTML5Backend}>
            <InspectionItemForm
              equipmentIndex={1}
              inspectionItems={inspectionItems}
            />
          </DndProvider>
        </InspectionItemDialogStateContext.Provider>
      </DIContainerContext.Provider>,
      div
    );
  });
});
