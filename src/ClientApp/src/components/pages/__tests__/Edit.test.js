import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { Edit } from "../Edit";

describe("Edit compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IInspectionSheetController: {},
      IInspectionSheetPresenter: {},
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <MemoryRouter>
          <Edit match={{ params: { id: 2 } }} />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
