import { InspectionItem } from "../typescript-fetch";

export type Equipment = {
  equipmentId: number;
  orderIndex: number;
  equipmentName: string;
  inspectionItems: InspectionItem[];
};
