import { ChangeEvent } from "react";

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
   * Change the inspection sheet name of current inspection sheet.
   * @param e React change event
   */
  changeSheetName(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;

  /**
   * Change the inspection group ID of current inspection sheet.
   * @param e React change event
   */
  changeGroupId(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;

  /**
   * Change the inspection type ID of current inspection sheet.
   * @param e React change event
   */
  changeTypeId(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;

  /**
   * Add new equipment to current inspection sheet.
   */
  addEquipment(): void;
  removeEquipment(orderIndex: number): void;
  swapEquipments(srcOrderIndex: number, dstOrderIndex: number): void;
  changeEquipmentName(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    orderIndex: number
  ): void;

  /**
   * Create a new inspection sheet data in database
   */
  createInspectionSheet(): Promise<void>;
}
