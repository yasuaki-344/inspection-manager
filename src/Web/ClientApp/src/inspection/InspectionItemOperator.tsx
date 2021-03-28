import React, { useReducer } from 'react';
import { InspectionItem, InspectionItemContextType } from './Types';
import InspectionItemReducer, {
  setItemAction, updateFieldAction, setChoiceAction,
  addChoiceAction, removeChoiceAction, updateChoiceAction
} from './InspectionItemReducer';

/**
 * Initial state of InspectionItem object.
 */
export const initialState = () => {
  return {
    inspection_item_id: Math.random().toString(36).substr(2, 9),
    inspection_content: '',
    input_type: 0,
    choices: [],
  };
};

export const InspectionItemOperator = (): InspectionItemContextType => {
  const [inspectionItem, dispatch] = useReducer(InspectionItemReducer, initialState());
  return {
    inspectionItem: inspectionItem,
    setItem: (item: InspectionItem): void => dispatch(setItemAction(item)),
    updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
      dispatch(updateFieldAction(event)),
    setChoices: (choices: string[]): void =>
      dispatch(setChoiceAction(choices)),
    addChoice: (): void => dispatch(addChoiceAction()),
    removeChoice: (index: number): void =>
      dispatch(removeChoiceAction(index)),
    updateChoice: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      index: number
    ): void =>
      dispatch(updateChoiceAction(event, index)),
  }
}

/**
 * Checks if the given InspectionItem object is valid or not.
 * @param item InspectionItem object to check.
 * @returns Return true if the item is valid, otherwise false.
 */
export const isValidInspectionItem = (item: InspectionItem): boolean => {
  if (item.inspection_content === '') {
    return false;
  }

  if (item.input_type === 2) {
    if (!item.choices.length) {
      return false;
    } else {
      return !item.choices.includes('');
    }
  }

  return true;
};