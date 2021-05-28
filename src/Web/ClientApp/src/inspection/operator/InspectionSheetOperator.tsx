import React, { useReducer } from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetContextType } from '../Types';
import InspectionSheetReducer, {
  setSheetAction, updateFieldAction,
  addEquipmentAction, removeEquipmentAction, updateEquipmentAction, swapEquipmentAction,
  addInspectionItemAction, removeInspectionItemAction, updateInspectionItemAction,
  swapInspectionItemAction,
} from '../reducer/InspectionSheetReducer';

/**
 * Initial state of InspectionSheet object.
 */
export const initialState = () => {
  return {
    sheet_id: 0,
    sheet_name: '',
    inspection_group_id: 0,
    inspection_type_id: 0,
    inspection_group: '',
    inspection_type: '',
    equipments: [],
  };
};

export const InspectionSheetOperator = (): InspectionSheetContextType => {
  const [inspectionSheet, dispatch] = useReducer(InspectionSheetReducer, initialState());
  return {
    inspectionSheet: inspectionSheet,
    setSheet: (sheet: InspectionSheet): void => dispatch(setSheetAction(sheet)),
    updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
      dispatch(updateFieldAction(event)),
    addEquipment: (): void => dispatch(addEquipmentAction()),
    removeEquipment: (index: number): void => dispatch(removeEquipmentAction(index)),
    updateEquipment: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void =>
      dispatch(updateEquipmentAction(event, index)),
    swapEquipment: (srcIndex: number, dstIndex: number): void => dispatch(swapEquipmentAction(srcIndex, dstIndex)),
    addInspectionItem: (index: number, item: InspectionItem): void =>
      dispatch(addInspectionItemAction(index, item)),
    removeInspectionItem: (equipmentIndex: number, itemIndex: number): void =>
      dispatch(removeInspectionItemAction(equipmentIndex, itemIndex)),
    updateInspectionItem: (
      equipmentIndex: number,
      itemIndex: number,
      item: InspectionItem
    ): void =>
      dispatch(updateInspectionItemAction(equipmentIndex, itemIndex, item)),
    swapInspectionItem: (equipmentIndex: number, srcIndex: number, dstIndex: number) =>
      dispatch(swapInspectionItemAction(equipmentIndex, srcIndex, dstIndex)),
  };
}