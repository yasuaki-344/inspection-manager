import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

jest.mock("../components/pages/Home", () => () => <div />);
jest.mock("../components/pages/Create", () => () => <div />);
jest.mock("../components/pages/Details", () => () => <div />);
jest.mock("../components/pages/Edit", () => () => <div />);
jest.mock("../components/pages/InspectionGroupCategory", () => () => <div />);
jest.mock("../components/pages/InspectionTypeCategory", () => () => <div />);
jest.mock("../components/pages/ChoicesTemplateManager", () => () => <div />);

it("renders without crashing", async () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
    div
  );
});
