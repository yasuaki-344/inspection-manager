import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { InspectionTypeCategory } from "../InspectionTypeCategory";

describe("InspectionTypeCategory compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IInspectionTypeController: {},
      IInspectionTypePresenter: {
        state: [],
        editItem: { description: "initial" },
      },
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <MemoryRouter>
          <InspectionTypeCategory />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
