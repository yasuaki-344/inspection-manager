import { InspectionSheet } from "../../entities";

export interface IHomeController {
  fetchDisplayData(): Promise<void>;
  exportExcelInspectionSheet(sheet: InspectionSheet): void;
  exportJsonInspectionSheet(sheet: InspectionSheet): void;
}
