import { InspectionSheet, InspectionItem } from "../entities";

export interface IInspectionSheetInteractor {
  setSheet(sheet: InspectionSheet): void
  updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  addEquipment(): void
  removeEquipment(index: number): void
  updateEquipment(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void
  swapEquipment(srcIndex: number, dstIndex: number): void
  addInspectionItem(index: number, item: InspectionItem): void
  removeInspectionItem(equipmentIndex: number, itemIndex: number): void
  updateInspectionItem(
    equipmentIndex: number,
    itemIndex: number,
    item: InspectionItem
  ): void
  swapInspectionItem(equipmentIndex: number, srcIndex: number, dstIndex: number): void;
}