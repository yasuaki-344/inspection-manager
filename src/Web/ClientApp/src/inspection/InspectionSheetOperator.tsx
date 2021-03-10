import React, { useReducer } from 'react';
import InspectionSheetReducer, {
  setSheetAction, updateFieldAction,
  addEquipmentAction, removeEquipmentAction, updateEquipmentAction
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

  const setSheet = (sheet: any): void => dispatch(setSheetAction(sheet));

  const updateField = (event: React.ChangeEvent<HTMLInputElement>): void =>
    dispatch(updateFieldAction(event));

  const addEquipment = (): void => dispatch(addEquipmentAction());

  const removeEquipment = (id: string): void => dispatch(removeEquipmentAction(id));

  const updateEquipment = (event: React.ChangeEvent<HTMLInputElement>, id: string): void =>
    dispatch(updateEquipmentAction(event, id));

  return [inspectionSheet, setSheet, updateField, addEquipment, removeEquipment, updateEquipment];
}
