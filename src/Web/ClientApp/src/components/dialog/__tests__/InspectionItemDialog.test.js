import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { InspectionItemDialog } from "../InspectionItemDialog";

describe("InspectionItemDialog compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IInspectionSheetController: {},
      IInspectionSheetPresenter: {
        item: {
          inspectionContent: "content",
          inputType: 1,
        },
        isValidInspectionItem: jest.fn(() => {}),
      },
      IChoiceTemplateController: {
        getAllChoiceTemplates: jest.fn(() => {}),
      },
      IChoiceTemplatePresenter: {
        state: [],
      },
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <MemoryRouter>
          <InspectionItemDialog
            open
            onCancelButtonClick={() => {}}
            onOkButtonClick={() => {}}
          />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
