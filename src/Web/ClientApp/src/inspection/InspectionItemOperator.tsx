import React, { useReducer } from 'react';
import { InspectionItem } from './Types';
import InspectionItemReducer, {
  setItemAction, updateFieldAction,
  addChoiceAction, removeChoiceAction, updateChoiceAction
} from './InspectionItemReducer';

export const InspectionSheetOperator = () => {
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
