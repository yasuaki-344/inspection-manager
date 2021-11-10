import { useState } from "react";
import { InspectionTypeInteractor } from "..";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("InspectionTypeInteractor unit test", () => {
  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
  });

  test("fetch inspection type correctly", async () => {
    const repository = {
      get: jest.fn(async () => []),
    };
    const target = new InspectionTypeInteractor(repository);
    await target.fetchInspectionTypes();
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
