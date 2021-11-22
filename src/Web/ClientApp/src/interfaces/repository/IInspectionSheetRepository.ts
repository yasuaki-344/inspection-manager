import { InspectionSheet } from "../../entities";

export interface IInspectionSheetRepository {
  /**
   * Gets all inspection sheets from database.
   */
  get(): Promise<InspectionSheet[]>;

  /**
   * Gets the specified inspection sheet detail from database
   * @param id Sheet ID to get
   */
  getById(id: number): Promise<InspectionSheet>;

  /**
   * Creates a new inspection sheet
   * @param inspectionSheet Inspection sheet data to create.
   */
  post(inspectionSheet: InspectionSheet): Promise<InspectionSheet>;

  /**
   * Updates the specified inspection sheet
   * @param inspectionSheet Inspection sheet data to update.
   */
  put(inspectionSheet: InspectionSheet): Promise<InspectionSheet>;

  /**
   * Deletes the specified inspection sheet.
   * @param id Inspection sheet ID to delete.
   */
  delete(id: number): Promise<void>;
}
