import React, { useReducer } from 'react';
import { InspectionItem, InspectionSheet } from './Types';
import InspectionSheetReducer, {
  setSheetAction, updateFieldAction,
  addEquipmentAction, removeEquipmentAction, updateEquipmentAction,
  addInspectionItemAction, removeInspectionItemAction, updateInspectionItemAction,
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

  const setSheet = (sheet: InspectionSheet): void => dispatch(setSheetAction(sheet));

  const updateField = (event: React.ChangeEvent<HTMLInputElement>): void =>
    dispatch(updateFieldAction(event));

  const addEquipment = (): void => dispatch(addEquipmentAction());

  const removeEquipment = (id: string): void => dispatch(removeEquipmentAction(id));

  const updateEquipment = (event: React.ChangeEvent<HTMLInputElement>, id: string): void =>
    dispatch(updateEquipmentAction(event, id));

  const addInspectionItem = (id: string, item: InspectionItem): void =>
    dispatch(addInspectionItemAction(id, item));

  const removeInspectionItem = (id: string, itemId: string): void =>
    dispatch(removeInspectionItemAction(id, itemId));

  const updateInspectionItem = (
    id: string,
    item: InspectionItem
  ): void =>
    dispatch(updateInspectionItemAction(id, item));

  return [
    inspectionSheet, setSheet, updateField,
    addEquipment, removeEquipment, updateEquipment,
    addInspectionItem, removeInspectionItem, updateInspectionItem,
  ];
}
