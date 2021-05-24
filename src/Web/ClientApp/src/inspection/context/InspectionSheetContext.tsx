import React, { createContext } from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetContextType } from '../Types';
import { initialState } from '../operator/InspectionSheetOperator';

export const InspectionSheetContext = createContext<InspectionSheetContextType>({
  inspectionSheet: initialState(),
  setSheet: (sheet: InspectionSheet): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => { },
  addEquipment: (): void => { },
  removeEquipment: (id: number): void => { },
  updateEquipment: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number): void => { },
  swapEquipment: (srdId: number, dstId: number): void => { },
  addInspectionItem: (id: number, item: InspectionItem): void => { },
  removeInspectionItem: (id: number, itemId: number): void => { },
  updateInspectionItem: (id: number, item: InspectionItem): void => { },
  swapInspectionItem: (equipmentId: number, srcId: number, dstId: number) => { },
});
