import { InspectionSheet } from "../../entities";

export interface IInspectionSheetRepository {
  /**
   * Gets all inspection sheets from database.
   */
  get(): Promise<InspectionSheet[]>;
  getById(id: number): Promise<InspectionSheet>;
  post(inspectionSheet: InspectionSheet): Promise<InspectionSheet>;
  put(inspectionSheet: InspectionSheet): Promise<InspectionSheet>;

  /**
   * Deletes the specified inspection sheet.
   * @param id Inspection sheet ID to delete.
   */
  delete(id: number): Promise<void>;
}
