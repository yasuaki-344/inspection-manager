import { InspectionType } from "../../typescript-fetch";

export interface IInspectionTypeInteractor {
  types: InspectionType[];

  /**
   * Gets all inspection types from database.
   */
  fetchInspectionTypes(): Promise<InspectionType[]>;
  getIds(keyword: string): number[];
  getName(id: number): string | undefined;
}
