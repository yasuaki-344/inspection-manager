import React, { createContext, useReducer } from 'react';
import { InspectionItem, InspectionSheet } from './Types';
import InspectionSheetReducer, {
  setSheetAction, updateFieldAction,
  addEquipmentAction, removeEquipmentAction, updateEquipmentAction,
  addInspectionItemAction, removeInspectionItemAction, updateInspectionItemAction,
} from './InspectionSheetReducer';

export interface InspectionSheetContextType {
  inspectionSheet: InspectionSheet;
  setSheet: (sheet: InspectionSheet) => void;
  updateField: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Initial state of InspectionSheet object.
 */
const initialState = {
  sheet_id: '',
  sheet_name: '',
  inspection_group: '',
  inspection_type: '',
  equipments: [],
};

export const InspectionSheetOperator = () => {
  const [inspectionSheet, dispatch] = useReducer(InspectionSheetReducer, initialState);
  return {
    inspectionSheet: inspectionSheet,
    setSheet: (sheet: InspectionSheet): void => dispatch(setSheetAction(sheet)),
    updateField: (event: React.ChangeEvent<HTMLInputElement>): void =>
      dispatch(updateFieldAction(event)),
  };
}

export const InspectionSheetContext = createContext<InspectionSheetContextType>({
  inspectionSheet: initialState,
  setSheet: (sheet: InspectionSheet): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement>): void => { },
});
