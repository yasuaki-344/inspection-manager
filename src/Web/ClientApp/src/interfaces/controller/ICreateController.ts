export interface ICreateController {
  /**
   * Initializes inspection sheet to edit.
   */
  initializeInspectionSheet(): void;

  /**
   * Gets all inspection sheets information from database.
   */
  fetchSelectionSheets(): Promise<void>;

  /**
   * Gets the specified inspection sheets from database.
   * @param id InspectionSheet ID to get.
   */
  fetchInspectionSheet(id: number): Promise<void>;

  /**
   * Gets inspection master data from database.
   */
  fetchInspectionMasterData(): Promise<void>;

  /**
   * Create a new inspection sheet data in database
   */
  createInspectionSheet(): Promise<void>;
}
