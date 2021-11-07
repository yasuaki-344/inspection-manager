import { InspectionSheet } from "../../entities";

export interface IHomePresenter {
  inspectionSheets: InspectionSheet[];

  getGroupName(id: number): string | undefined;
  getTypeName(id: number): string | undefined;
}
