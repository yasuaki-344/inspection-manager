export interface ICreateController {
  /**
   * Initializes inspection sheet to edit.
   */
  initializeInspectionSheet(): void;

  /**
   * Gets inspection master data from database.
   */
  fetchInspectionMasterData(): Promise<void>;
}
