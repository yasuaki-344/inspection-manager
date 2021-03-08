import React, { useReducer } from 'react';
import InspectionSheetReducer, { updateFieldAction, addEquipmentAction } from './InspectionSheetReducer';

export const InspectionSheetOperator = () => {
  const [inspectionSheet, dispatch] = useReducer(InspectionSheetReducer, {});

  const updateField = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFieldAction(event));
  }

  const addEquipment = () => {
    dispatch(addEquipmentAction());
  }

  return [inspectionSheet, updateField, addEquipment];
}
