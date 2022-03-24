import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import {
  DIContainerContext,
  InspectionItemDialogStateContext,
} from "../../../container";
import { InspectionSheetForm } from "../InspectionSheetForm";

describe("InspectionSheetForm compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IInspectionSheetController: {},
      IInspectionSheetPresenter: {
        groups: [{ inspectionGroupId: 1, description: "test" }],
        types: [{ inspectionTypeId: 1, description: "test" }],
        equipments: [],
        item: { inspectionContent: "content" },
        isValidInspectionItem: jest.fn(() => {}),
        typeId: 1,
        groupId: 1,
      },
      IChoiceTemplateController: {
        getAllChoiceTemplates: jest.fn(() => {}),
      },
      IChoiceTemplatePresenter: { state: [] },
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <InspectionItemDialogStateContext.Provider
          value={[{ isOpen: false }, jest.fn(() => {})]}
        >
          <MemoryRouter>
            <InspectionSheetForm isEdit />
          </MemoryRouter>
        </InspectionItemDialogStateContext.Provider>
      </DIContainerContext.Provider>,
      div
    );
  });
});
