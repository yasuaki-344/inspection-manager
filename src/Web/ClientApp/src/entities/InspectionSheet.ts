import { Equipment } from ".";

export type InspectionSheet = {
  sheet_id: number;
  sheet_name: string;
  inspection_type_id: number;
  inspection_group_id: number;
  inspection_type: string;
  inspection_group: string;
  equipments: Equipment[];
};
