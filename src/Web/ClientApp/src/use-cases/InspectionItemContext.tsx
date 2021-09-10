import React, { createContext } from 'react';
import { InspectionItem } from '../entities';
import { InspectionItemContextType } from '../components/inspection/Types';
import { InspectionItemInitialState } from './InspectionItemOperator';
import { ChoiceTemplate } from '../typescript-fetch';

export const InspectionItemContext = createContext<InspectionItemContextType>({
  inspectionItem: InspectionItemInitialState(),
  setItem: (item: InspectionItem): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => { },
  setChoices: (choices: ChoiceTemplate): void => { },
  addChoice: (): void => { },
  removeChoice: (index: number): void => { },
  updateChoice: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => { },
});
