import React, { useReducer } from 'react';
import { InspectionItem } from './Types';
import InspectionItemReducer, {
  setItemAction, updateFieldAction,
  addChoiceAction, removeChoiceAction, updateChoiceAction
} from './InspectionItemReducer';

export const InspectionItemOperator = () => {
  const [inspectionItem, dispatch] = useReducer(InspectionItemReducer, {
    inspection_item_id: Math.random().toString(36).substr(2, 9),
    inspection_content: "",
    input_type: 1,
    choices: [],
  });

  const setItem = (item: InspectionItem): void => dispatch(setItemAction(item));

  const updateField = (event: React.ChangeEvent<HTMLInputElement>): void =>
    dispatch(updateFieldAction(event));

  const addChoice = (): void => dispatch(addChoiceAction());

  const removeChoice = (index: number): void =>
    dispatch(removeChoiceAction(index));

  const updateChoice = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void =>
    dispatch(updateChoiceAction(event, index));

  return [
    inspectionItem, setItem, updateField,
    addChoice, removeChoice, updateChoice
  ];
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

  if (item.input_type === 3) {
    if (!item.choices.length) {
      return false;
    } else {
      return !item.choices.includes('');
    }
  }

  return true;
};