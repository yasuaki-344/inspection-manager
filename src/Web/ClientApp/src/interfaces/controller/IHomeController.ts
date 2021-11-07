import { InspectionSheet } from "../../entities";

export interface IHomeController {
  /**
   * Gets all data to be needed for display from database.
   */
  fetchDisplayData(): Promise<void>;
  getGroupIds(keyword: string): number[];
  getTypeIds(keyword: string): number[];
  exportExcelInspectionSheet(sheet: InspectionSheet): void;
  exportJsonInspectionSheet(sheet: InspectionSheet): void;
}
