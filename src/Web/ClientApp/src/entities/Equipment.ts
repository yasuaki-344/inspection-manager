import { InspectionItem } from ".";

export type Equipment = {
  // eslint-disable-next-line
  equipment_id: number;
  // eslint-disable-next-line
  equipment_name: string;
  // eslint-disable-next-line
  inspection_items: InspectionItem[];
};
