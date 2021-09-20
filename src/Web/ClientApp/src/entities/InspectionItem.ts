import { Choice } from ".";

export type InspectionItem = {
  // eslint-disable-next-line
  inspection_item_id: number;
  // eslint-disable-next-line
  inspection_content: string;
  // eslint-disable-next-line
  input_type: number;
  choices: Choice[];
};
