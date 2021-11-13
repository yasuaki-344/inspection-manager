import { InspectionItem, InspectionSheet } from "../../entities";

export interface IInspectionSheetController {
  getInspectionSheetById(id: number): Promise<void>;
  createInspectionSheet(): Promise<void>;
  updateInspectionSheet(): Promise<void>;
  removeInspectionSheet(id: number): Promise<void>;

  setSheet(sheet: InspectionSheet): void;
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
