import { useReducer } from 'react';
import InspectionSheetReducer, { updateFieldAction } from './InspectionSheetReducer';

export const InspectionSheetOperator = () => {
  const [inspectionSheet, dispatch] = useReducer(InspectionSheetReducer, {});

  const updateField = (event: any) => {
    dispatch(updateFieldAction(event));
  }

  return [inspectionSheet, updateField];
}
