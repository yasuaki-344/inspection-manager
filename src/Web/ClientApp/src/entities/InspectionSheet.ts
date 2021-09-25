import { Equipment } from ".";

export type InspectionSheet = {
  sheetId: number;
  sheetName: string;
  inspectionTypeId: number;
  inspectionGroupId: number;
  inspectionType: string;
  inspectionGroup: string;
  equipments: Equipment[];
};
