import React from 'react';
import { InspectionItemAction } from '../components/inspection/Types';
import { InspectionItem } from '.';
import { ChoiceTemplate } from '../typescript-fetch';

export const TYPES = {
  SET_ITEM: 'SET_ITEM',
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_CHOICE: 'SET_CHOICE',
  ADD_CHOICE: 'ADD_CHOICE',
  REMOVE_CHOICE: 'REMOVE_CHOICE',
  UPDATE_CHOICE: 'UPDATE_CHOICE',
};

export default function InspectionItemReducer(state: InspectionItem, action: InspectionItemAction): any {
  switch (action.type) {
    case TYPES.SET_ITEM:
      return action.payload?.item;
    case TYPES.UPDATE_FIELD:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.name != null && payload.value != null) {
          if (payload.name === 'input_type' && payload.value !== '2') {
            return {
              ...state,
              [payload.name]: payload.value,
              choices: [],
            }
          } else {
            return {
              ...state,
              [payload.name]: payload.value,
            };
          }
        }
      }
      return state;
    case TYPES.SET_CHOICE:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.choices != null){
          return {
            ...state,
            choices: payload.choices.choices.map(x => {
              return {
                choice_id: 0,
                description: x.description
              }
            })
          }
        }
      }
      return state;
    case TYPES.ADD_CHOICE:
      return {
        ...state,
        choices: state.choices.concat({
          choice_id: 0,
          description: '',
        })
      };
    case TYPES.REMOVE_CHOICE:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.choice_index != null) {
          state.choices.splice(payload.choice_index, 1);
          return { ...state };
        }
      }
      return state;
    case TYPES.UPDATE_CHOICE:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.choice_index != null && payload.value != null) {
          state.choices[payload.choice_index].description = payload.value;
          return { ...state };
        }
      }
      return state;
    default:
      console.warn(`unknown type ${action.type}`);
      return state;
  }
}

export const setItemAction = (inspectionItem: InspectionItem): InspectionItemAction => {
  return {
    type: TYPES.SET_ITEM,
    payload: {
      item: inspectionItem,
    },
  }
};

export const updateFieldAction = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): InspectionItemAction => {
  return {
    type: TYPES.UPDATE_FIELD,
    payload: {
      name: e.target.name,
      value: e.target.value,
    },
  }
};

export const setChoiceAction = (value: ChoiceTemplate): InspectionItemAction => {
  return {
    type: TYPES.SET_CHOICE,
    payload: {
      choices: value,
    },
  }
};

export const addChoiceAction = (): InspectionItemAction => {
  return {
    type: TYPES.ADD_CHOICE,
  }
};

export const removeChoiceAction = (index: number): InspectionItemAction => {
  return {
    type: TYPES.REMOVE_CHOICE,
    payload: {
      choice_index: index,
    }
  }
};

export const updateChoiceAction = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  index: number
): InspectionItemAction => {
  return {
    type: TYPES.UPDATE_CHOICE,
    payload: {
      value: event.target.value,
      choice_index: index,
    }
  }
};
