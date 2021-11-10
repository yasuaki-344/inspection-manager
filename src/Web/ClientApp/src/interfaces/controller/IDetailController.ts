export interface IDetailController {
  /**
   * Gets the specified inspection sheet data from database.
   * @param sheetId Inspection sheet ID to get.
   */
  fetchDisplayData(sheetId: number): Promise<void>;
}
