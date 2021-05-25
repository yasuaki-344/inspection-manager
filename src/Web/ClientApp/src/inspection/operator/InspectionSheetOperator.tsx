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
    removeEquipment: (id: number): void => dispatch(removeEquipmentAction(id)),
    updateEquipment: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void =>
      dispatch(updateEquipmentAction(event, index)),
    swapEquipment: (srcId: number, dstId: number): void => dispatch(swapEquipmentAction(srcId, dstId)),
    addInspectionItem: (id: number, item: InspectionItem): void =>
      dispatch(addInspectionItemAction(id, item)),
    removeInspectionItem: (id: number, itemId: number): void =>
      dispatch(removeInspectionItemAction(id, itemId)),
    updateInspectionItem: (
      id: number,
      item: InspectionItem
    ): void =>
      dispatch(updateInspectionItemAction(id, item)),
    swapInspectionItem: (equipmentId: number, srcId: number, dstId: number) =>
      dispatch(swapInspectionItemAction(equipmentId, srcId, dstId)),
  };
}