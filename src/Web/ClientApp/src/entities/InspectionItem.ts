import { Choice } from ".";

export type InspectionItem = {
  inspectionItemId: number;
  inspectionContent: string;
  inputType: number;
  choices: Choice[];
};
