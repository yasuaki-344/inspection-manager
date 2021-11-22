import { Choice } from ".";

export type InspectionItem = {
  inspectionItemId: number;
  orderIndex: number;
  inspectionContent: string;
  inputType: number;
  choices: Choice[];
};
