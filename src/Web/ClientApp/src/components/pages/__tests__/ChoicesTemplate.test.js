import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { ChoicesTemplateManager } from "../ChoicesTemplateManager";

describe("ChoicesTemplateManager compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IChoiceTemplateController: {},
      IChoiceTemplatePresenter: {
        state: [],
        target: {
          choices: [],
        },
      },
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <MemoryRouter>
          <ChoicesTemplateManager />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
