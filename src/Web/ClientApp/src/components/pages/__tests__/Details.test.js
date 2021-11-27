import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { DIContainerContext } from "../../../container";
import { Details } from "../Details";

describe("Details compoenent unite test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const container = {
      IDetailController: {},
      IDetailPresenter: {
        getInspectionGroup: jest.fn(() => {}),
        getInspectionType: jest.fn(() => {}),
      },
    };

    ReactDOM.render(
      <DIContainerContext.Provider value={container}>
        <MemoryRouter>
          <Details match={{ params: { id: 1 } }} />
        </MemoryRouter>
      </DIContainerContext.Provider>,
      div
    );
  });
});
