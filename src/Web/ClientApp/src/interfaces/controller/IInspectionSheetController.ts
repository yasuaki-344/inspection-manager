import { ChangeEvent } from "react";
import { ChoiceTemplate, InspectionItem } from "../../entities";

export interface IInspectionSheetController {
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
   * Adds new equipment to current inspection sheet.
   */
  addEquipment(): void;

  /**
   * Removes the specified equipment.
   * @param orderIndex Order index of equipment to be removed.
   */
  removeEquipment(orderIndex: number): void;
  swapEquipments(srcOrderIndex: number, dstOrderIndex: number): void;

  /**
   * Changes the specified equipment name.
   * @param e React change event.
   * @param orderIndex Order index of equipment whose name is changed.
   */
  changeEquipmentName(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    orderIndex: number
  ): void;

  setUp(): void;
  setUpItem(item: InspectionItem): void;
  addInspectionItem(orderIndex: number): void;
  removeInspectionItem(
    equipmentOrderIndex: number,
    itemOrderIndex: number
  ): void;
  swapInspectionItem(
    equipmentIndex: number,
    srcIndex: number,
    dstIndex: number
  ): void;
  updateInspectionItem(
    equipmentOrderIndex: number,
    itemOrderIndex: number
  ): void;
  setChoices(choices: ChoiceTemplate): void;

  /**
   * Create a new inspection sheet data in database
   */
  createInspectionSheet(): Promise<void>;
  updateInspectionSheet(): Promise<void>;
}
