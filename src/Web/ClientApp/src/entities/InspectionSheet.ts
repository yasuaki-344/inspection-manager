import { Equipment } from ".";

export type InspectionSheet = {
  // eslint-disable-next-line
  sheet_id: number;
  // eslint-disable-next-line
  sheet_name: string;
  // eslint-disable-next-line
  inspection_type_id: number;
  // eslint-disable-next-line
  inspection_group_id: number;
  // eslint-disable-next-line
  inspection_type: string;
  // eslint-disable-next-line
  inspection_group: string;
  equipments: Equipment[];
};
