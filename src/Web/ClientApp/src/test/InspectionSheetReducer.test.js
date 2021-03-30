import InspectionSheetReducer, {
  setSheetAction, updateFieldAction, addEquipmentAction,
  removeEquipmentAction, updateEquipmentAction, addInspectionItemAction,
  removeInspectionItemAction, updateInspectionItemAction, TYPES,
} from '../inspection/InspectionSheetReducer';

it('set sheet correctly', () => {
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

it('update field correctly', () => {
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

it('do not update field if name is null', () => {
  const event = {
    target: {
      name: null,
      value: 'sample sheet name',
    }
  };
  const action = updateFieldAction(event);
  expect(action.type).toBe(TYPES.UPDATE_FIELD);
  expect(action.payload.name).toBe(event.target.name);
  expect(action.payload.value).toBe(event.target.value);

  const actual = InspectionSheetReducer({}, action);
  expect(actual).toStrictEqual({});
});

it('add equipment correctly', () => {
  const action = addEquipmentAction();
  expect(action.type).toBe(TYPES.ADD_EQUIPMENT);

  const actual = InspectionSheetReducer({
    equipments: []
  }, action);
  expect(actual.equipments[0].equipment_id).not.toBe('');
  expect(actual.equipments[0].equipment_name).toBe('');
  expect(actual.equipments[0].inspection_items.length).toBe(0);
});

it('remove equipmentAction correctly', () => {
  const id = 'equipment_id';
  const action = removeEquipmentAction(id);
  expect(action.type).toBe(TYPES.REMOVE_EQUIPMENT);
  expect(action.payload.equipment_id).toBe(id);

  const actual = InspectionSheetReducer({
    equipments: [{ equipment_id: id }]
  }, action);
  expect(actual.equipments.length).toBe(0);
});

it('update equipment correctly', () => {
  const event = {
    target: {
      name: 'equipment_name',
      value: 'updated equipment name',
    }
  };
  const id = 'equipment_id';
  const action = updateEquipmentAction(event, id);
  expect(action.type).toBe(TYPES.UPDATE_EQUIPMENT);
  expect(action.payload.name).toBe(event.target.name);
  expect(action.payload.value).toBe(event.target.value);
  expect(action.payload.equipment_id).toBe(id);

  const actual = InspectionSheetReducer({
    equipments: [
      { equipment_id: id + '1', equipment_name: 'before' },
      { equipment_id: id, equipment_name: 'before' }
    ]
  }, action);
  expect(actual.equipments[0].equipment_name).not.toBe(event.target.value);
  expect(actual.equipments[1].equipment_name).toBe(event.target.value);
});

it('add inspection item correctly', () => {
  const equipmentId = 'equipment_id';
  const inspectionItem = {
    inspection_item_id: 'id',
    inspection_content: 'content',
  };
  const action = addInspectionItemAction(equipmentId, inspectionItem);
  expect(action.type).toBe(TYPES.ADD_INSPECTION_ITEM);
  expect(action.payload.equipment_id).toBe(equipmentId);
  expect(action.payload.inspection_item).toBe(inspectionItem);

  const actual = InspectionSheetReducer({
    equipments: [
      { equipment_id: equipmentId + '1', inspection_items: [] },
      { equipment_id: equipmentId, inspection_items: [] }
    ]
  }, action);
  expect(actual.equipments[0].inspection_items.length).toBe(0);
  expect(actual.equipments[1].inspection_items.length).toBe(1);
  expect(actual.equipments[1].inspection_items[0]).toBe(inspectionItem);
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
