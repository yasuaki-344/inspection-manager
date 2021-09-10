import React, { useReducer } from 'react';
import { InspectionItemContextType } from '../inspection/Types';
import { InspectionItem } from '../entities';
import InspectionItemReducer, {
  setItemAction, updateFieldAction, setChoiceAction,
  addChoiceAction, removeChoiceAction, updateChoiceAction
} from '../entities/InspectionItemReducer';
import { ChoiceTemplate } from '../typescript-fetch';

/**
 * Initial state of InspectionItem object.
 */
export const InspectionItemInitialState = () => {
  return {
    inspection_item_id: 0,
    inspection_content: '',
    input_type: 0,
    choices: [],
  };
};

export const InspectionItemOperator = (): InspectionItemContextType => {
  const [inspectionItem, dispatch] = useReducer(InspectionItemReducer, InspectionItemInitialState());
  return {
    inspectionItem: inspectionItem,
    setItem: (item: InspectionItem): void => dispatch(setItemAction(item)),
    updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
      dispatch(updateFieldAction(event)),
    setChoices: (choices: ChoiceTemplate): void =>
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

  if (item.input_type === 3) {
    if (!item.choices.length) {
      return false;
    } else {
      const descriptions = item.choices.map(x => x.description);
      return !descriptions.includes('');
    }
  }

  return true;
};