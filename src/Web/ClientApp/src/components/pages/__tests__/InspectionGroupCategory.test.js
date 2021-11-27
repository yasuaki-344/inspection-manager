import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { InspectionGroupCategory } from "../InspectionGroupCategory";

describe("InspectionGroupCategory compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IInspectionGroupController: {},
      IInspectionGroupPresenter: {
        state: [],
        editItem: { description: "initial" },
      },
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <MemoryRouter>
          <InspectionGroupCategory />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
