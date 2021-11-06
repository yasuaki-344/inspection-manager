import { InspectionSheet } from "../../entities";

export interface IHomeController {
  exportExcelInspectionSheet(sheet: InspectionSheet): void;
  exportJsonInspectionSheet(sheet: InspectionSheet): void;
}
