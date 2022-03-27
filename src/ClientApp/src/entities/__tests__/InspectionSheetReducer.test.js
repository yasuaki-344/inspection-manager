import { InspectionSheetReducer } from "..";

describe("InspectionSheetReducer unit test", () => {
  test("Set sheet name correctly", () => {
    const value = "sheet name";
    const state = {
      sheetName: "base",
    };
    const action = {
      type: "SET_STRING_FIELD",
      payload: {
        name: "sheetName",
        stringValue: value,
      },
    };
    const actual = InspectionSheetReducer(state, action);
    expect(actual.sheetName).toBe(value);
  });

  test("Set group ID correctly", () => {
    const value = 10;
    const state = {
      inspectionGroupId: 0,
    };
    const action = {
      type: "SET_NUMERIC_FIELD",
      payload: {
        name: "inspectionGroupId",
        numericValue: value,
      },
    };
    const actual = InspectionSheetReducer(state, action);
    expect(actual.inspectionGroupId).toBe(value);
  });

  test("Set type ID  correctly", () => {
    const value = 10;
    const state = {
      inspectionTypeId: 0,
    };
    const action = {
      type: "SET_NUMERIC_FIELD",
      payload: {
        name: "inspectionTypeId",
        numericValue: value,
      },
    };
    const actual = InspectionSheetReducer(state, action);
    expect(actual.inspectionTypeId).toBe(value);
  });

  test("Add equipment correctly", () => {
    const action = {
      type: "ADD_EQUIPMENT",
      payload: {},
    };
    const state = {
      equipments: [],
    };
    const actual = InspectionSheetReducer(state, action);
    const actual2 = InspectionSheetReducer(actual, action);
    const actual3 = InspectionSheetReducer(actual2, action);
    actual3.equipments.forEach((o, index) => {
      expect(o.equipmentId).toBe(0);
      expect(o.orderIndex).toBe(index + 1);
      expect(o.equipmentName).toBe("");
      expect(o.inspectionItems.length).toBe(0);
    });
  });

  test("Remove equipment correctly", () => {
    const action = {
      type: "REMOVE_EQUIPMENT",
      payload: {
        numericValue: 10,
      },
    };
    const state = {
      equipments: [{ orderIndex: 10 }],
    };
    const actual = InspectionSheetReducer(state, action);
    expect(actual.equipments.length).toBe(0);
  });

  test("Swap equipments correctly", () => {
    const action = {
      type: "SWAP_EQUIPMENTS",
      payload: {
        srcOrderIndex: 10,
        dstOrderIndex: 30,
      },
    };
    const state = {
      equipments: [
        { orderIndex: 10, equipmentName: "first" },
        { orderIndex: 20, equipmentName: "second" },
        { orderIndex: 30, equipmentName: "third" },
      ],
    };
    const actual = InspectionSheetReducer(state, action);
    expect(actual.equipments[0].orderIndex).toBe(10);
    expect(actual.equipments[0].equipmentName).toBe("third");
    expect(actual.equipments[1].orderIndex).toBe(20);
    expect(actual.equipments[1].equipmentName).toBe("second");
    expect(actual.equipments[2].orderIndex).toBe(30);
    expect(actual.equipments[2].equipmentName).toBe("first");
  });

  test("Update equipment name correctly", () => {
    const action = {
      type: "SET_EQUIPMENT_STRING_FIELD",
      payload: {
        equipmentOrderIndex: 11,
        name: "equipmentName",
        stringValue: "test",
      },
    };
    const state = {
      equipments: [{ orderIndex: 11, equipmentName: "first" }],
    };
    const actual = InspectionSheetReducer(state, action);
    expect(actual.equipments[0].equipmentName).toBe("test");
  });

  test("Add inspection item correctly", () => {
    const action = {
      type: "ADD_INSPECTION_ITEM",
      payload: {
        equipmentOrderIndex: 11,
        inspectionItem: {
          inspectionItemId: 0,
          orderIndex: 0,
          inspectionContent: "test",
          inputType: 2,
          choices: [
            {
              choiceId: 3,
              orderIndex: 4,
              description: "choice",
            },
          ],
        },
      },
    };
    const state = {
      equipments: [{ orderIndex: 11, inspectionItems: [] }],
    };
    const actual = InspectionSheetReducer(state, action);
    actual.equipments[0].inspectionItems.forEach((x, index) => {
      expect(x.inspectionItemId).toBe(0);
      expect(x.orderIndex).toBe(index + 1);
      expect(x.inspectionContent).toBe("test");
      expect(x.inputType).toBe(2);
      expect(x.choices[0].choiceId).toBe(3);
      expect(x.choices[0].orderIndex).toBe(4);
      expect(x.choices[0].description).toBe("choice");
    });
  });

  test("Remove inspection item correctly", () => {
    const action = {
      type: "REMOVE_INSPECTION_ITEM",
      payload: {
        equipmentOrderIndex: 11,
        itemOrderIndex: 22,
      },
    };
    const state = {
      equipments: [
        {
          orderIndex: 11,
          inspectionItems: [{ orderIndex: 22, inspectionContent: "test" }],
        },
      ],
    };
    const actual = InspectionSheetReducer(state, action);
    expect(actual.equipments[0].inspectionItems.length).toBe(0);
  });

  test("Add inspection item correctly", () => {
    const action = {
      type: "UPDATE_INSPECTION_ITEM",
      payload: {
        equipmentOrderIndex: 11,
        itemOrderIndex: 22,
        inspectionItem: {
          inspectionItemId: 33,
          orderIndex: 22,
          inspectionContent: "test",
          inputType: 2,
          choices: [
            {
              choiceId: 3,
              orderIndex: 4,
              description: "choice",
            },
          ],
        },
      },
    };
    const state = {
      equipments: [
        {
          orderIndex: 11,
          inspectionItems: [
            {
              inspectionItemId: 0,
              orderIndex: 22,
              inspectionContent: "",
              inputType: 1,
              choices: [],
            },
          ],
        },
      ],
    };
    const actual = InspectionSheetReducer(state, action);
    const item = actual.equipments[0].inspectionItems[0];
    expect(item.inspectionItemId).toBe(33);
    expect(item.orderIndex).toBe(22);
    expect(item.inspectionContent).toBe("test");
    expect(item.inputType).toBe(2);
    expect(item.choices[0].choiceId).toBe(3);
    expect(item.choices[0].orderIndex).toBe(4);
    expect(item.choices[0].description).toBe("choice");
  });
});

// test("set sheet correctly", () => {
//   const sheet = {
//     sheet_id: "sheet_id",
//     sheet_name: "sheet_name",
//     inspection_group: "group",
//     inspection_type: "type",
//     equipments: [],
//   };
//   const action = setSheetAction(sheet);
//   expect(action.type).toBe(TYPES.SET_SHEET);
//   expect(action.payload.sheet).toBe(sheet);

//   const actual = InspectionSheetReducer({}, action);
//   expect(actual).toBe(sheet);
// });
