import { InspectionItem } from ".";

export type Equipment = {
  equipmentId: number;
  orderIndex: number;
  equipmentName: string;
  inspectionItems: InspectionItem[];
};
