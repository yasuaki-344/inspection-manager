import { InspectionSheet } from "../../entities";

export interface IHomeController {
  /**
   * Gets all data to be needed for display from database.
   */
  fetchDisplayData(): Promise<void>;

  /**
   * Filters inspection sheet by using the specified group, type, and sheet keyword.
   * @param groupKeyword Inspection group name to be filtered.
   * @param typeKeyword Inspection type name to be filtered.
   * @param sheetKeyword Inspection sheet name to be filtered.
   */
  searchInspectionSheet(
    groupKeyword: string,
    typeKeyword: string,
    sheetKeyword: string
  ): void;

  getGroupIds(keyword: string): number[];
  getTypeIds(keyword: string): number[];
  exportExcelInspectionSheet(sheet: InspectionSheet): void;
  exportJsonInspectionSheet(sheet: InspectionSheet): void;
}
