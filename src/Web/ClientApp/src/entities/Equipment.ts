import { InspectionItem } from ".";

export type Equipment = {
  equipmentId: number;
  equipmentName: string;
  inspectionItems: InspectionItem[];
};
