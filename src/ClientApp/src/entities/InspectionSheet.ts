import { Equipment } from "../typescript-fetch";

export type InspectionSheet = {
  sheetId: number;
  sheetName: string;
  inspectionTypeId: number;
  inspectionGroupId: number;
  inspectionType: string;
  inspectionGroup: string;
  equipments: Equipment[];
};
