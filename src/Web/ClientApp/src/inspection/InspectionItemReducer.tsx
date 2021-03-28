import React from 'react';
import { InspectionItem, InspectionItemAction } from './Types';

const TYPES = {
  SET_ITEM: 'SET_ITEM',
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_CHOICE: 'SET_CHOICE',
  ADD_CHOICE: 'ADD_CHOICE',
  REMOVE_CHOICE: 'REMOVE_CHOICE',
  UPDATE_CHOICE: 'UPDATE_CHOICE',
};

export default function InspectionItemReducer(state: InspectionItem, action: InspectionItemAction): any {
  console.log(action);
  switch (action.type) {
    case TYPES.SET_ITEM:
      return action.payload?.item;
    case TYPES.UPDATE_FIELD:
      if (action.payload?.name != null) {
        if (action.payload.name === 'input_type' && action.payload.value !== '3') {
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            choices: [],
          }
        } else {
          return {
            ...state,
            [action.payload.name]: action.payload.value,
          };
        }
      } else {
        return state;
      }
    case TYPES.SET_CHOICE:
      return {
        ...state,
        choices: action.payload?.choices
      };
    case TYPES.ADD_CHOICE:
      return {
        ...state,
        choices: state.choices.concat('')
      };
    case TYPES.REMOVE_CHOICE:
      return {
        ...state,
        choices: state.choices.filter((choice, index) =>
          index !== action.payload?.choice_index)
      };
    case TYPES.UPDATE_CHOICE:
      return {
        ...state,
        choices: state.choices.map((choice, index) => {
          if (index === action.payload?.choice_index) {
            return action.payload.value;
          } else {
            return choice;
          }
        })
      }
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

export const setChoiceAction = (value: string[]): InspectionItemAction => {
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
