import React, { createContext } from 'react';
import { ChoiceTemplate, InspectionItem, InspectionItemContextType } from '../Types';
import { initialState } from '../operator/InspectionItemOperator';

export const InspectionItemContext = createContext<InspectionItemContextType>({
  inspectionItem: initialState(),
  setItem: (item: InspectionItem): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => { },
  setChoices: (choices: ChoiceTemplate): void => { },
  addChoice: (): void => { },
  removeChoice: (index: number): void => { },
  updateChoice: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => { },
});
