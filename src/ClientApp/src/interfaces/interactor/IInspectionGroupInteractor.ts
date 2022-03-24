import { InspectionGroup } from "../../entities";

export interface IInspectionGroupInteractor {
  groups: Array<InspectionGroup>;

  /**
   * Fetches all inspection groups from database.
   */
  fetchInspectionGroups(): Promise<InspectionGroup[]>;

  getIds(keyword: string): number[];
  getName(id: number): string | undefined;
}
