import { InspectionItem } from ".";

export type Equipment = {
  equipment_id: number,
  equipment_name: string,
  inspection_items: InspectionItem[],
};
