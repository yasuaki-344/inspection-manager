import React, { createContext } from 'react';
import { InspectionItem, InspectionItemContextType } from './Types';
import { initialState } from './InspectionItemOperator';

export const InspectionItemContext = createContext<InspectionItemContextType>({
  inspectionItem: initialState,
  setItem: (item: InspectionItem): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => { },
  setChoices: (choices: string[]): void => { },
  addChoice: (): void => { },
  removeChoice: (index: number): void => { },
  updateChoice: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => { },
});
