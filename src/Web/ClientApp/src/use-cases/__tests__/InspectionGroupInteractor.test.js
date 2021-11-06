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
    await target.fetchInspectionGroup();
    expect(setState).toHaveBeenCalledTimes(1);
  });

  test("delete inspection groups correctly", async () => {
    const repository = {
      delete: jest.fn(async (id) => {}),
    };
    const target = new InspectionGroupInteractor(repository);
    await target.delete(10);
    expect(repository.delete).toHaveBeenCalledWith(10);
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
