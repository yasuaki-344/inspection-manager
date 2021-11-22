import { InspectionItemReducer, ITEM_ACTION_TYPES } from "..";

describe("InspectionSheetReducer unit test", () => {
  it("Set inspection item correctly", () => {
    const state = {
      sheetName: "base",
    };
    const target = {
      inspectionItemId: 1,
      orderIndex: 2,
      inspectionContent: "content",
      inputType: "2",
      choices: [
        {
          choiceId: 3,
          orderIndex: 4,
          description: "choice1",
        },
        {
          choiceId: 4,
          orderIndex: 5,
          description: "choice2",
        },
      ],
    };
    const action = {
      type: ITEM_ACTION_TYPES.SET_ITEM,
      payload: {
        item: target,
      },
    };
    const actual = InspectionItemReducer(state, action);
    expect(actual).toStrictEqual(target);
  });

  it("Update content correctly", () => {
    const state = {};
    const action = {
      type: ITEM_ACTION_TYPES.UPDATE_FIELD,
      payload: {
        name: "inspectionContent",
        value: "update content",
      },
    };
    const actual = InspectionItemReducer(state, action);
    expect(actual.inspectionContent).toBe("update content");
  });

  it("Update input type correctly", () => {
    const state = {
      inputType: 2,
      choices: [
        { choiceId: 0, orderIndex: 1, description: "choice1" },
        { choiceId: 0, orderIndex: 2, description: "choice2" },
      ],
    };
    let action = {
      type: ITEM_ACTION_TYPES.UPDATE_FIELD,
      payload: {
        name: "inputType",
        value: "2",
      },
    };
    let actual = InspectionItemReducer(state, action);
    expect(actual.inputType).toBe("2");
    expect(actual.choices).toEqual([
      { choiceId: 0, orderIndex: 1, description: "choice1" },
      { choiceId: 0, orderIndex: 2, description: "choice2" },
    ]);

    action = {
      type: ITEM_ACTION_TYPES.UPDATE_FIELD,
      payload: {
        name: "inputType",
        value: "0",
      },
    };
    actual = InspectionItemReducer(state, action);
    expect(actual.inputType).toBe("0");
    expect(actual.choices).toEqual([]);
  });

  it("Set choices correctly", () => {
    const state = {
      choices: [
        { choiceId: 0, orderIndex: 1, description: "choice1" },
        { choiceId: 0, orderIndex: 2, description: "choice2" },
      ],
    };
    const action = {
      type: ITEM_ACTION_TYPES.SET_CHOICE,
      payload: {
        choices: {
          choiceTemplateId: 0,
          choices: [
            { optionId: 0, description: "new1" },
            { optionId: 1, description: "new2" },
          ],
        },
      },
    };
    const actual = InspectionItemReducer(state, action);
    expect(actual.choices).toStrictEqual([
      { choiceId: 0, orderIndex: 1, description: "new1" },
      { choiceId: 0, orderIndex: 2, description: "new2" },
    ]);
  });

  it("Add choice correctly", () => {
    const state = {
      choices: [{ choiceId: 0, orderIndex: 22, description: "new1" }],
    };
    const action = {
      type: ITEM_ACTION_TYPES.ADD_CHOICE,
      payload: {},
    };
    const actual = InspectionItemReducer(state, action);
    expect(actual.choices).toStrictEqual([
      { choiceId: 0, orderIndex: 22, description: "new1" },
      { choiceId: 0, orderIndex: 23, description: "" },
    ]);
  });

  it("Remove choice correctly", () => {
    const state = {
      choices: [{ choiceId: 0, orderIndex: 22, description: "new1" }],
    };
    const action = {
      type: ITEM_ACTION_TYPES.REMOVE_CHOICE,
      payload: { choiceIndex: 22 },
    };
    const actual = InspectionItemReducer(state, action);
    expect(actual.choices.length).toStrictEqual(0);
  });

  it("update choice correctly", () => {
    const state = {
      choices: [{ choiceId: 0, orderIndex: 22, description: "new1" }],
    };
    const action = {
      type: ITEM_ACTION_TYPES.UPDATE_CHOICE,
      payload: { choiceIndex: 22, value: "update choice" },
    };
    const actual = InspectionItemReducer(state, action);
    expect(actual.choices).toStrictEqual([
      { choiceId: 0, orderIndex: 22, description: "update choice" }
    ]);
  });

  it("Unknown action", () => {
    const action = {
      type: "",
      payload: {},
    };
    const state = {};
    const actual = InspectionItemReducer(state, action);
    expect(actual).toEqual({});
  });
});
