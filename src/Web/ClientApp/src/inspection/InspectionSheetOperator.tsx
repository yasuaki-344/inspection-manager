import React, { useReducer } from 'react';
import InspectionSheetReducer, {
  updateFieldAction, addEquipmentAction, removeEquipmentAction
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

  const updateField = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateFieldAction(event));
  }

  const addEquipment = () => {
    dispatch(addEquipmentAction());
  }

  const removeEquipment = (id: string) => {
    dispatch(removeEquipmentAction(id));
  }

  return [inspectionSheet, updateField, addEquipment, removeEquipment];
}
