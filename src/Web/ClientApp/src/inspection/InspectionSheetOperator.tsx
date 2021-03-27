import React, { useReducer } from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetContextType } from './Types';
import InspectionSheetReducer, {
  setSheetAction, updateFieldAction,
  addEquipmentAction, removeEquipmentAction, updateEquipmentAction,
  addInspectionItemAction, removeInspectionItemAction, updateInspectionItemAction,
} from './InspectionSheetReducer';

/**
 * Initial state of InspectionSheet object.
 */
export const initialState = {
  sheet_id: '',
  sheet_name: '',
  inspection_group: '',
  inspection_type: '',
  equipments: [],
};

export const InspectionSheetOperator = (): InspectionSheetContextType => {
  const [inspectionSheet, dispatch] = useReducer(InspectionSheetReducer, initialState);
  return {
    inspectionSheet: inspectionSheet,
    setSheet: (sheet: InspectionSheet): void => dispatch(setSheetAction(sheet)),
    updateField: (event: React.ChangeEvent<HTMLInputElement>): void =>
      dispatch(updateFieldAction(event)),
    addEquipment: (): void => dispatch(addEquipmentAction()),
    removeEquipment: (id: string): void => dispatch(removeEquipmentAction(id)),
    updateEquipment: (event: React.ChangeEvent<HTMLInputElement>, id: string): void =>
      dispatch(updateEquipmentAction(event, id)),
    addInspectionItem: (id: string, item: InspectionItem): void =>
      dispatch(addInspectionItemAction(id, item)),
    removeInspectionItem: (id: string, itemId: string): void =>
      dispatch(removeInspectionItemAction(id, itemId)),
    updateInspectionItem: (
      id: string,
      item: InspectionItem
    ): void =>
      dispatch(updateInspectionItemAction(id, item)),
  };
}