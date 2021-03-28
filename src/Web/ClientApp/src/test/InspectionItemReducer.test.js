import React from 'react';
import InspectionItemReducer, {
  setItemAction, updateFieldAction, setChoiceAction,
  addChoiceAction, removeChoiceAction, updateChoiceAction,
  TYPES
} from '../inspection/InspectionItemReducer';

it('setItemAction correctly', () => {
  const item = {
    inspection_item_id: 'id',
    inspection_content: 'content',
    input_type: '2',
    choices: ['choice1', 'choice2'],
  };
  const action = setItemAction(item);
  expect(action.type).toBe(TYPES.SET_ITEM);
  expect(action.payload.item).toBe(item);

  const actual = InspectionItemReducer(item, action);
  expect(actual).toStrictEqual(item);
});

it('updateFieldAction correctly', () => {
  const event = {
    target: {
      name: 'inspection_content',
      value: 'update content',
    }
  };
  const action = updateFieldAction(event);
  expect(action.type).toBe(TYPES.UPDATE_FIELD);
  expect(action.payload.name).toBe(event.target.name);
  expect(action.payload.value).toBe(event.target.value);

  const item = {
    inspection_content: 'content',
  };
  const actual = InspectionItemReducer(item, action);
  expect(actual.inspection_content).toBe('update content');
});

it('setChoiceAction correctly', () => {
  const choices = [
    'choice1',
    'choice2',
  ];
  const action = setChoiceAction(choices);
  expect(action.type).toBe(TYPES.SET_CHOICE);
  expect(action.payload.choices).toBe(choices);

  const item = {
    choices: ['choice0'],
  };
  const actual = InspectionItemReducer(item, action);
  expect(actual.choices).toStrictEqual(['choice1', 'choice2']);
});

it('addChoiceAction correctly', () => {
  const action = addChoiceAction();
  expect(action.type).toBe(TYPES.ADD_CHOICE);

  const item = {
    choices: ['choice1'],
  };
  const actual = InspectionItemReducer(item, action);
  expect(actual.choices).toStrictEqual(['choice1', '']);
});

it('removeChoiceAction correctly', () => {
  const index = 1;
  const action = removeChoiceAction(index);
  expect(action.type).toBe(TYPES.REMOVE_CHOICE);
  expect(action.payload.choice_index).toBe(index);

  const item = {
    choices: ['choice1', 'choice2'],
  };
  const actual = InspectionItemReducer(item, action);
  expect(actual.choices).toStrictEqual(['choice1']);
});

it('updateChoiceAction correctly', () => {
  const event = {
    target: {
      value: 'field_value',
    }
  };
  const index = 1;
  const action = updateChoiceAction(event, index);
  expect(action.type).toBe(TYPES.UPDATE_CHOICE);
  expect(action.payload.value).toBe(event.target.value);
  expect(action.payload.choice_index).toBe(index);

  const item = {
    choices: ['choice1', 'choice2'],
  };
  const actual = InspectionItemReducer(item, action);
  expect(actual.choices).toStrictEqual(['choice1', 'field_value']);
});

it('unknown action', () => {
  const action = {
    type: '',
  };
  const item = {};
  InspectionItemReducer(item, action);
});
