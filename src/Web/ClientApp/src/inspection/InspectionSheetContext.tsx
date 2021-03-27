import React, { createContext } from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetContextType } from './Types';
import { initialState } from './InspectionSheetOperator';

export const InspectionSheetContext = createContext<InspectionSheetContextType>({
  inspectionSheet: initialState,
  setSheet: (sheet: InspectionSheet): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement>): void => { },
  addEquipment: (): void => { },
  removeEquipment: (id: string): void => { },
  updateEquipment: (event: React.ChangeEvent<HTMLInputElement>, id: string): void => { },
  addInspectionItem: (id: string, item: InspectionItem): void => { },
  removeInspectionItem: (id: string, itemId: string): void => { },
  updateInspectionItem: (id: string, item: InspectionItem): void => { },
});
