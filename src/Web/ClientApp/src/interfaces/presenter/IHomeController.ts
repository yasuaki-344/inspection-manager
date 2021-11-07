import { InspectionSheet } from "../../entities";

export interface IHomePresenter {
  inspectionSheets: InspectionSheet[];

  getGroupIds(keyword: string): number[];
  getGroupName(id: number): string | undefined;
}
