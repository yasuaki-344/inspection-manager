import React from 'react';
import {
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
});

it('updateFieldAction correctly', () => {
  const event = {
    target: {
      name: 'field_name',
      value: 'field_value',
    }
  };
  const action = updateFieldAction(event);
  expect(action.type).toBe(TYPES.UPDATE_FIELD);
  expect(action.payload.name).toBe(event.target.name);
  expect(action.payload.value).toBe(event.target.value);
});

it('setChoiceAction correctly', () => {
  const choices = [
    'choice1',
    'choice2',
  ];
  const action = setChoiceAction(choices);
  expect(action.type).toBe(TYPES.SET_CHOICE);
  expect(action.payload.choices).toBe(choices);
});

it('addChoiceAction correctly', () => {
  const action = addChoiceAction();
  expect(action.type).toBe(TYPES.ADD_CHOICE);
});

it('removeChoiceAction correctly', () => {
  const index = 1;
  const action = removeChoiceAction(index);
  expect(action.type).toBe(TYPES.REMOVE_CHOICE);
  expect(action.payload.choice_index).toBe(index);
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
});
