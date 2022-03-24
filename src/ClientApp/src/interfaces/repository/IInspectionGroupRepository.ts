import { InspectionGroup } from "../../entities";

export interface IInspectionGroupRepository {
  /**
   * Gets all inspection group from database.
   */
  get(): Promise<InspectionGroup[]>;

  /**
   * Registers new inspection group to database by using the specified inspection group.
   * @param inspectionGroup The inspection group to register.
   */
  post(inspectionGroup: InspectionGroup): Promise<InspectionGroup>;

  /**
   * Updates the specified inspection group of database.
   * @param inspectionGroup The inspection group to update.
   */
  put(inspectionGroup: InspectionGroup): Promise<InspectionGroup>;

  /**
   * Delete the specified inspection group in database.
   * @param id The inspection group ID to be deleted.
   */
  delete(id: number): Promise<void>;
}
