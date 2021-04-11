import React, { createContext } from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetContextType } from '../Types';
import { initialState } from '../operator/InspectionSheetOperator';

export const InspectionSheetContext = createContext<InspectionSheetContextType>({
  inspectionSheet: initialState(),
  setSheet: (sheet: InspectionSheet): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => { },
  addEquipment: (): void => { },
  removeEquipment: (id: string): void => { },
  updateEquipment: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string): void => { },
  swapEquipment: (srdId: string, dstId: string): void => { },
  addInspectionItem: (id: string, item: InspectionItem): void => { },
  removeInspectionItem: (id: string, itemId: string): void => { },
  updateInspectionItem: (id: string, item: InspectionItem): void => { },
  orderUpInspectionItem: (id: string, itemId: string): void => { },
  orderDownInspectionItem: (id: string, itemId: string): void => { },
});
