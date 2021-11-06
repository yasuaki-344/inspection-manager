import { InspectionSheet } from "../../entities";

export interface IHomeController {
  fetchDisplayData(): Promise<void>;
  getGroupIds(keyword: string): number[];
  getTypeIds(keyword: string): number[];
  exportExcelInspectionSheet(sheet: InspectionSheet): void;
  exportJsonInspectionSheet(sheet: InspectionSheet): void;
}
