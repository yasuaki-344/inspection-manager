import { useState } from "react";
import { InspectionGroupInteractor } from "..";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("InspectionGroupInteractor unit test", () => {
  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
  });

  test("fetch inspection group correctly", async () => {
    const repository = {
      get: jest.fn(async () => []),
    };
    const target = new InspectionGroupInteractor(repository);
    await target.fetchInspectionGroups();
    expect(setState).toHaveBeenCalled();
  });
});
