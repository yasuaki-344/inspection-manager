import React from "react";
import { Table, TableBody } from "@mui/material";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DIContainerContext,
  InspectionItemDialogStateContext,
} from "../../../container";
import { InspectionItemRow } from "../InspectionItemRow";

describe("InspectionItemRow component unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IInspectionSheetController: {},
    };
    const inspectionItem = {
      inputType: 1,
      choices: [],
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <InspectionItemDialogStateContext.Provider
          value={[{ isOpen: false }, jest.fn(() => {})]}
        >
          <DndProvider backend={HTML5Backend}>
            <Table>
              <TableBody>
                <InspectionItemRow
                  equipmentIndex={1}
                  inspectionItemIndex={1}
                  inspectionItem={inspectionItem}
                />
              </TableBody>
            </Table>
          </DndProvider>
        </InspectionItemDialogStateContext.Provider>
      </DIContainerContext.Provider>,
      div
    );
  });
});
