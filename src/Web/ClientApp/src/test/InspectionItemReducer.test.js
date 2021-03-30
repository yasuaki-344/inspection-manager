import InspectionItemReducer, {
  setItemAction, updateFieldAction, setChoiceAction,
  addChoiceAction, removeChoiceAction, updateChoiceAction,
  TYPES
} from '../inspection/reducer/InspectionItemReducer';

it('set inspection item correctly', () => {
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

it('update field correctly', () => {
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

it('update field correctly', () => {
  const event = {
    target: {
      name: 'input_type',
      value: '0',
    }
  };
  const action = updateFieldAction(event);
  expect(action.type).toBe(TYPES.UPDATE_FIELD);
  expect(action.payload.name).toBe(event.target.name);
  expect(action.payload.value).toBe(event.target.value);

  const item = {
    inspection_content: 'content',
    input_type: '2',
    choices: ['choice1', 'choice2']
  };
  const actual = InspectionItemReducer(item, action);
  expect(actual.input_type).toBe('0');
  expect(actual.choices.length).toBe(0);
});

it('do not update field if name is null', () => {
  const event = {
    target: {
      name: null,
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
  expect(actual.inspection_content).toBe('content');
});

it('set choice correctly', () => {
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

it('add choice correctly', () => {
  const action = addChoiceAction();
  expect(action.type).toBe(TYPES.ADD_CHOICE);

  const item = {
    choices: ['choice1'],
  };
  const actual = InspectionItemReducer(item, action);
  expect(actual.choices).toStrictEqual(['choice1', '']);
});

it('remove choice correctly', () => {
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

it('update choice correctly', () => {
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
