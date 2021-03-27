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
  addEquipment: () => void,
  removeEquipment: (id: string) => void,
  updateEquipment: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void,
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
    addEquipment: (): void => dispatch(addEquipmentAction()),
    removeEquipment: (id: string): void => dispatch(removeEquipmentAction(id)),
    updateEquipment: (event: React.ChangeEvent<HTMLInputElement>, id: string): void =>
  };
}

export const InspectionSheetContext = createContext<InspectionSheetContextType>({
  inspectionSheet: initialState,
  setSheet: (sheet: InspectionSheet): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement>): void => { },
  addEquipment: (): void => { },
  removeEquipment: (id: string): void => { },
  updateEquipment: (event: React.ChangeEvent<HTMLInputElement>, id: string): void => { },
});
