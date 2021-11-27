import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { Create } from "../Create";

describe("Create compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IInspectionSheetController: {},
      IInspectionSheetPresenter: {
        selectionSheets: [],
      },
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
