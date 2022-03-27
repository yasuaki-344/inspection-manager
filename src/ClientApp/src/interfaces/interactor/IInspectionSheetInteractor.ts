import { InspectionGroup, InspectionItem, InspectionSheet, InspectionType } from "../../typescript-fetch";

export interface IInspectionSheetInteractor {
  types: InspectionType[];
  groups: InspectionGroup[];
  sheets: InspectionSheet[];
  filteredSheets: InspectionSheet[];
  sheet: InspectionSheet;

  typeName(id: number): string | undefined;
  groupName(id: number): string | undefined;

  /**
   * Gets all inspection sheets from database.
   */
  fetchAllInspectionSheets(): Promise<void>;

  /**
   * Gets the specified inspection sheets from database.
   * @param id InspectionSheet ID to get.
   */
  fetchInspectionSheetById(id: number): Promise<void>;

  copyInspectionSheetFrom(id: number): Promise<void>;

  /**
   * Filters inspection sheet by using the specified group, type, and sheet name.
   * @param groupKeyword Inspection group name to be filtered.
   * @param typeKeyword Inspection type name to be filtered.
   * @param sheetKeyword Inspection sheet name to be filtered.
   */
  searchInspectionSheet(
    groupKeyword: string,
    typeKeyword: string,
    sheetKeyword: string
  ): void;

  /**
   * Resets filtered inspection sheets.
   */
  resetSearchedInspectionSheets(): void;

  createInspectionSheet(): Promise<void>;
  updateInspectionSheet(): Promise<void>;

  /**
   * Removes the specified inspection sheet.
   * @param id Inspection sheet ID to be removed.
   */
  removeInspectionSheet(id: number): Promise<void>;

  /**
   * Sets inspection sheet by using the specified data.
   * @param sheet Inspection sheet data to set.
   */
  setSheet(sheet: InspectionSheet): void;

  /**
   * Sets inspection sheet name.
   * @param sheetName sheet name to set.
   */
  setSheetName(sheetName: string): void;

  /**
   * Sets inspection group ID.
   * @param groupId Group ID to set.
   */
  setGroupId(groupId: number): void;

  /**
   * Sets inspection type ID.
   * @param typeId Group ID to set.
   */
  setTypeId(typeId: number): void;

  /**
   * Add a new equipment to inspection sheet.
   */
  addEquipment(): void;

  /**
   * Remove the specified equipment.
   * @param orderIndex Equipment order index to be removed.
   */
  removeEquipment(orderIndex: number): void;

  /**
   * Swaps the specified equipments in inspection sheet.
   * @param srcOrderIndex Order index of the equipments to be swapped.
   * @param dstOrderIndex Order index of the equipments to be swapped.
   */
  swapEquipments(srcOrderIndex: number, dstOrderIndex: number): void;

  /**
   * Sets inspection sheet name.
   * @param orderIndex Order index of equipment to be set.
   * @param name Equipment name to set.
   */
  setEquipmentName(orderIndex: number, name: string): void;

  addInspectionItem(index: number, item: InspectionItem): void;
  removeInspectionItem(equipmentIndex: number, itemIndex: number): void;
  updateInspectionItem(
    equipmentIndex: number,
    itemIndex: number,
    item: InspectionItem
  ): void;
  swapInspectionItem(
    equipmentIndex: number,
    srcIndex: number,
    dstIndex: number
  ): void;
}
