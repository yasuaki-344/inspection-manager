import { Choice } from "../typescript-fetch";

export type InspectionItem = {
  inspectionItemId: number;
  orderIndex: number;
  inspectionContent: string;
  inputType: number;
  choices: Choice[];
};
