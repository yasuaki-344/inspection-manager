import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { Home } from "../Home";

describe("Home compoenent unit test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IHomeController: {},
      IHomePresenter: {
        getGroupName: jest.fn(() => {}),
        getTypeName: jest.fn(() => {}),
        inspectionSheets: [],
      },
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
