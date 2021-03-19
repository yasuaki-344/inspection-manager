import React, { useReducer } from 'react';
import { InspectionSheet } from './Types';
import InspectionSheetReducer, {
  setSheetAction, updateFieldAction,
  addEquipmentAction, removeEquipmentAction, updateEquipmentAction,
  addInspectionItemAction, removeInspectionItemAction, updateInspectionItemAction,
  addChoiceAction, removeChoiceAction, updateChoiceAction
} from './InspectionSheetReducer';

/**
 * Initial state of InspectionSheet object.
 */
const initialState = {
  sheet_id: "",
  sheet_name: "",
  equipments: [],
};

export const InspectionSheetOperator = () => {
  const [inspectionSheet, dispatch] = useReducer(InspectionSheetReducer, initialState);

  const setSheet = (sheet: InspectionSheet): void => dispatch(setSheetAction(sheet));

  const updateField = (event: React.ChangeEvent<HTMLInputElement>): void =>
    dispatch(updateFieldAction(event));

  const addEquipment = (): void => dispatch(addEquipmentAction());

  const removeEquipment = (id: string): void => dispatch(removeEquipmentAction(id));

  const updateEquipment = (event: React.ChangeEvent<HTMLInputElement>, id: string): void =>
    dispatch(updateEquipmentAction(event, id));

  const addInspectionItem = (id: string): void => dispatch(addInspectionItemAction(id));

  const removeInspectionItem = (id: string, itemId: string): void =>
    dispatch(removeInspectionItemAction(id, itemId));

  const updateInspectionItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
    itemId: string
  ): void =>
    dispatch(updateInspectionItemAction(event, id, itemId));

  const addChoice = (id: string, itemId: string): void =>
    dispatch(addChoiceAction(id, itemId));

  const removeChoice = (id: string, itemId: string, index: number): void =>
    dispatch(removeChoiceAction(id, itemId, index));

  const updateChoice = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
    itemId: string,
    index: number
  ): void =>
    dispatch(updateChoiceAction(event, id, itemId, index));

  return [
    inspectionSheet, setSheet, updateField,
    addEquipment, removeEquipment, updateEquipment,
    addInspectionItem, removeInspectionItem, updateInspectionItem,
    addChoice, removeChoice, updateChoice
  ];
}
