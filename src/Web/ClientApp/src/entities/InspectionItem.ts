import { Choice } from ".";

export type InspectionItem = {
  inspection_item_id: number;
  inspection_content: string;
  input_type: number;
  choices: Choice[];
};
