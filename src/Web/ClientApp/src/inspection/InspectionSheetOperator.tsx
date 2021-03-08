import React, { useReducer } from 'react';
import InspectionSheetReducer, { updateFieldAction } from './InspectionSheetReducer';

export const InspectionSheetOperator = () => {
  const [inspectionSheet, dispatch] = useReducer(InspectionSheetReducer, {});

  const updateField = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFieldAction(event));
  }

  const addEquipment = () => {
    console.log("check point");
  }

  return [inspectionSheet, updateField, addEquipment];
}
