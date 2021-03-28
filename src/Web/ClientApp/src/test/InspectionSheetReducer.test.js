import React from 'react';

import InspectionSheetReducer, {
  setSheetAction, updateFieldAction, addEquipmentAction,
  removeEquipmentAction, updateEquipmentAction, addInspectionItemAction,
  removeInspectionItemAction, updateInspectionItemAction, TYPES,
} from '../inspection/InspectionSheetReducer';

it('setSheetAction correctly', () => {
  const sheet = {
    sheet_id: 'sheet_id',
    sheet_name: 'sheet_name',
    inspection_group: 'group',
    inspection_type: 'type',
    equipments: [],
  };
  const action = setSheetAction(sheet);
  expect(action.type).toBe(TYPES.SET_SHEET);
  expect(action.payload.sheet).toBe(sheet);

  const actual = InspectionSheetReducer({}, action);
  expect(actual).toBe(sheet);
});

it('updateFieldAction correctly', () => {
  const event = {
    target: {
      name: 'sheet_name',
      value: 'sample sheet name',
    }
  };
  const action = updateFieldAction(event);
  expect(action.type).toBe(TYPES.UPDATE_FIELD);
  expect(action.payload.name).toBe(event.target.name);
  expect(action.payload.value).toBe(event.target.value);

  const actual = InspectionSheetReducer({}, action);
  expect(actual.sheet_name).toBe(event.target.value);
});

it('addEquipmentAction correctly', () => {
  const action = addEquipmentAction();
  expect(action.type).toBe(TYPES.ADD_EQUIPMENT);

  const actual = InspectionSheetReducer({
    equipments: []
  }, action);
  expect(actual.equipments[0].equipment_id).not.toBe('');
  expect(actual.equipments[0].equipment_name).toBe('');
  expect(actual.equipments[0].inspection_items.length).toBe(0);
});

it('removeEquipmentAction correctly', () => {
  const id = 'equipment_id';
  const action = removeEquipmentAction(id);
  expect(action.type).toBe(TYPES.REMOVE_EQUIPMENT);
  expect(action.payload.equipment_id).toBe(id);

  const actual = InspectionSheetReducer({
    equipments: [{}]
  }, action);
  // expect(actual.equipments.length).toBe(0);
});

it('updateEquipmentAction correctly', () => {
  const event = {
    target: {
      name: 'sample',
      value: 'value',
    }
  };
  const id = 'equipment_id';
  const action = updateEquipmentAction(event, id);
  expect(action.type).toBe(TYPES.UPDATE_EQUIPMENT);
  expect(action.payload.name).toBe(event.target.name);
  expect(action.payload.value).toBe(event.target.value);
  expect(action.payload.equipment_id).toBe(id);
});

it('addInspectionItemAction correctly', () => {
  const equipmentId = 'equipment_id';
  const inspectionItem = {};
  const action = addInspectionItemAction(equipmentId, inspectionItem);
  expect(action.type).toBe(TYPES.ADD_INSPECTION_ITEM);
  expect(action.payload.equipment_id).toBe(equipmentId);
  expect(action.payload.inspection_item).toBe(inspectionItem);
});

it('removeInspectionItemAction correctly', () => {
  const equipmentId = 'equipment_id';
  const itemId = 'equipment_id';
  const action = removeInspectionItemAction(equipmentId, itemId);
  expect(action.type).toBe(TYPES.REMOVE_INSPECTION_ITEM);
  expect(action.payload.equipment_id).toBe(equipmentId);
  expect(action.payload.inspection_item_id).toBe(itemId);
});

it('updateInspectionItemAction correctly', () => {
  const equipmentId = 'equipment_id';
  const inspectionItem = {};
  const action = updateInspectionItemAction(equipmentId, inspectionItem);
  expect(action.type).toBe(TYPES.UPDATE_INSPECTION_ITEM);
  expect(action.payload.equipment_id).toBe(equipmentId);
  expect(action.payload.inspection_item).toBe(inspectionItem);
});
