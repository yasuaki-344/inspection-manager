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

  test("Create edit item correctly", () => {
    const target = new InspectionGroupInteractor({});
    target.createEditItem();
    expect(setState).toHaveBeenCalledWith({
      id: 0,
      description: "グループ",
    });
  });

  test("Create inspection groups correctly", async () => {
    const repository = {
      post: jest.fn(async () => {
        return { id: 1, description: "group" };
      }),
    };
    const target = new InspectionGroupInteractor(repository);
    await target.create({ id: 0, description: "group" });
    expect(repository.post).toHaveBeenCalledWith({
      id: 0,
      description: "group",
    });
    expect(setState).toHaveBeenCalled();
  });

  test("Update inspection groups correctly", async () => {
    const repository = {
      put: jest.fn(async () => {
        return { id: 1, description: "group" };
      }),
    };
    const target = new InspectionGroupInteractor(repository);
    await target.update({ id: 1, description: "group" });
    expect(repository.put).toHaveBeenCalledWith({
      id: 1,
      description: "group",
    });
    expect(setState).toHaveBeenCalled();
  });

  test("Delete inspection groups correctly", async () => {
    const repository = {
      delete: jest.fn(async () => {}),
    };
    const target = new InspectionGroupInteractor(repository);
    await target.delete(10);
    expect(repository.delete).toHaveBeenCalledWith(10);
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
