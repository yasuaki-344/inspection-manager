import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { ChoiceSetSelectDialog } from "../ChoiceSetSelectDialog";

describe("ChoiceSetSelectDialog compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
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
          <ChoiceSetSelectDialog open onClose={() => {}} />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
