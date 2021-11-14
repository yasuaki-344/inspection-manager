import { useState, useReducer } from "react";
import { InspectionSheetInteractor } from "..";
import { SHEET_ACTION_TYPE } from "../../entities";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useReducer: jest.fn(),
}));

describe("InspectionSheetInteractor unit test", () => {
  const setState = jest.fn();
  const dispatch = jest.fn();
  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
    useReducer.mockImplementation((reducer, state) => [state, dispatch]);
  });

  test("Set sheet name correctly", () => {
    const repository = {};
    const target = new InspectionSheetInteractor(repository);
    const value = "target name";
    target.setSheetName(value);
    expect(dispatch).toHaveBeenCalledWith({
      type: SHEET_ACTION_TYPE.SET_STRING_FIELD,
      payload: {
        name: "sheetName",
        stringValue: value,
      },
    });
  });

  test("Set inspection group ID correctly", () => {
    const repository = {};
    const target = new InspectionSheetInteractor(repository);
    const value = 11;
    target.setGroupId(value);
    expect(dispatch).toHaveBeenCalledWith({
      type: SHEET_ACTION_TYPE.SET_NUMERIC_FIELD,
      payload: {
        name: "inspectionGroupId",
        numericValue: value,
      },
    });
  });

  test("Set inspection type ID correctly", () => {
    const repository = {};
    const target = new InspectionSheetInteractor(repository);
    const value = 11;
    target.setTypeId(value);
    expect(dispatch).toHaveBeenCalledWith({
      type: SHEET_ACTION_TYPE.SET_NUMERIC_FIELD,
      payload: {
        name: "inspectionTypeId",
        numericValue: value,
      },
    });
  });

  test("Add equipment correctly", () => {
    const repository = {};
    const target = new InspectionSheetInteractor(repository);
    target.addEquipment();
    expect(dispatch).toHaveBeenCalledWith({
      type: SHEET_ACTION_TYPE.ADD_EQUIPMENT,
      payload: {},
    });
  });

  test("Remove equipment correctly", () => {
    const repository = {};
    const target = new InspectionSheetInteractor(repository);
    target.removeEquipment(10);
    expect(dispatch).toHaveBeenCalledWith({
      type: SHEET_ACTION_TYPE.REMOVE_EQUIPMENT,
      payload: {
        numericValue: 10,
      },
    });
  });

  test("Swap equipments correctly", () => {
    const repository = {};
    const target = new InspectionSheetInteractor(repository);
    target.swapEquipments(10, 20);
    expect(dispatch).toHaveBeenCalledWith({
      type: SHEET_ACTION_TYPE.SWAP_EQUIPMENTS,
      payload: {
        srcOrderIndex: 10,
        dstOrderIndex: 20,
      },
    });
  });
});
