import React, { useReducer } from 'react';
import InspectionSheetReducer, { updateFieldAction, addEquipmentAction } from './InspectionSheetReducer';

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

  return [inspectionSheet, updateField, addEquipment];
}
