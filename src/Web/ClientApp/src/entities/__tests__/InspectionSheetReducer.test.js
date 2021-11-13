import { InspectionSheetReducer, SHEET_ACTION_TYPE } from "..";

describe("InspectionSheetReducer unit test", () => {
  test("Set sheet name correctly", () => {
    const value = "sheet name";
    const state = {
      sheetName: "base",
    };
    const action = {
      type: SHEET_ACTION_TYPE.SET_STRING_FIELD,
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
      type: SHEET_ACTION_TYPE.SET_NUMERIC_FIELD,
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
      type: SHEET_ACTION_TYPE.SET_NUMERIC_FIELD,
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
      type: SHEET_ACTION_TYPE.ADD_EQUIPMENT,
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
      type: SHEET_ACTION_TYPE.REMOVE_EQUIPMENT,
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
});

// import InspectionSheetReducer, {
//   setSheetAction,
//   updateFieldAction,
//   addEquipmentAction,
//   removeEquipmentAction,
//   updateEquipmentAction,
//   addInspectionItemAction,
//   removeInspectionItemAction,
//   updateInspectionItemAction,
//   TYPES,
// } from "../InspectionSheetReducer";

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

// test("do not update field if name is null", () => {
//   const event = {
//     target: {
//       name: null,
//       value: "sample sheet name",
//     },
//   };
//   const action = updateFieldAction(event);
//   expect(action.type).toBe(TYPES.UPDATE_FIELD);
//   expect(action.payload.name).toBe(event.target.name);
//   expect(action.payload.value).toBe(event.target.value);

//   const actual = InspectionSheetReducer({}, action);
//   expect(actual).toStrictEqual({});
// });

// test("update equipment correctly", () => {
//   const event = {
//     target: {
//       name: "equipment_name",
//       value: "updated equipment name",
//     },
//   };
//   const id = "equipment_id";
//   const action = updateEquipmentAction(event, id);
//   expect(action.type).toBe(TYPES.UPDATE_EQUIPMENT);
//   expect(action.payload.name).toBe(event.target.name);
//   expect(action.payload.value).toBe(event.target.value);
//   expect(action.payload.equipment_id).toBe(id);

//   const actual = InspectionSheetReducer(
//     {
//       equipments: [
//         { equipment_id: id + "1", equipment_name: "before" },
//         { equipment_id: id, equipment_name: "before" },
//       ],
//     },
//     action
//   );
//   expect(actual.equipments[0].equipment_name).not.toBe(event.target.value);
//   expect(actual.equipments[1].equipment_name).toBe(event.target.value);
// });

// test("add inspection item correctly", () => {
//   const equipmentId = "equipment_id";
//   const inspectionItem = {
//     inspection_item_id: "id",
//     inspection_content: "content",
//   };
//   const action = addInspectionItemAction(equipmentId, inspectionItem);
//   expect(action.type).toBe(TYPES.ADD_INSPECTION_ITEM);
//   expect(action.payload.equipment_id).toBe(equipmentId);
//   expect(action.payload.inspection_item).toBe(inspectionItem);

//   const actual = InspectionSheetReducer(
//     {
//       equipments: [
//         { equipment_id: equipmentId + "1", inspection_items: [] },
//         { equipment_id: equipmentId, inspection_items: [] },
//       ],
//     },
//     action
//   );
//   expect(actual.equipments[0].inspection_items.length).toBe(0);
//   expect(actual.equipments[1].inspection_items.length).toBe(1);
//   expect(actual.equipments[1].inspection_items[0]).toBe(inspectionItem);
// });

// test("remove inspection item correctly", () => {
//   const equipmentId = "equipment_id";
//   const itemId = "item_id";
//   const action = removeInspectionItemAction(equipmentId, itemId);
//   expect(action.type).toBe(TYPES.REMOVE_INSPECTION_ITEM);
//   expect(action.payload.equipment_id).toBe(equipmentId);
//   expect(action.payload.inspection_item_id).toBe(itemId);

//   const inspectionItem = {
//     inspection_item_id: itemId,
//     inspection_content: "content",
//   };
//   const actual = InspectionSheetReducer(
//     {
//       equipments: [
//         { equipment_id: equipmentId + "1", inspection_items: [inspectionItem] },
//         { equipment_id: equipmentId, inspection_items: [inspectionItem] },
//       ],
//     },
//     action
//   );
//   expect(actual.equipments[0].inspection_items.length).toBe(1);
//   expect(actual.equipments[1].inspection_items.length).toBe(0);
// });

// test("update inspection item correctly", () => {
//   const equipmentId = "equipment_id";
//   const inspectionItem = {
//     inspection_item_id: "item_id",
//     inspection_content: "content",
//   };
//   const action = updateInspectionItemAction(equipmentId, inspectionItem);
//   expect(action.type).toBe(TYPES.UPDATE_INSPECTION_ITEM);
//   expect(action.payload.equipment_id).toBe(equipmentId);
//   expect(action.payload.inspection_item).toBe(inspectionItem);

//   const actual = InspectionSheetReducer(
//     {
//       equipments: [
//         {
//           equipment_id: equipmentId + "1",
//           inspection_items: [
//             {
//               inspection_item_id: "item_id",
//               inspection_content: "before",
//             },
//           ],
//         },
//         {
//           equipment_id: equipmentId,
//           inspection_items: [
//             {
//               inspection_item_id: "item_id",
//               inspection_content: "before",
//             },
//             {
//               inspection_item_id: "item_id2",
//               inspection_content: "before",
//             },
//           ],
//         },
//       ],
//     },
//     action
//   );

//   expect(actual.equipments[0].inspection_items[0].inspection_content).toBe(
//     "before"
//   );
//   expect(actual.equipments[1].inspection_items[0].inspection_content).toBe(
//     "content"
//   );
//   expect(actual.equipments[1].inspection_items[1].inspection_content).toBe(
//     "before"
//   );
// });
