import React from "react";
import { InspectionItem, InspectionSheet } from "../entities";
import { IInspectionSheetInteractor } from "../interfaces";
import { IInspectionSheetController } from "../interfaces/controller";

export class InspectionSheetController implements IInspectionSheetController {
  private readonly useCase: IInspectionSheetInteractor;

  constructor(useCase: IInspectionSheetInteractor) {
    this.useCase = useCase;
  }

  async getInspectionSheetById(id: number): Promise<void> {
    await this.useCase.fetchInspectionSheetById(id);
  }

  async createInspectionSheet(): Promise<void> {
    await this.useCase.createInspectionSheet();
  }

  async updateInspectionSheet(): Promise<void> {
    await this.useCase.updateInspectionSheet();
  }

  async removeInspectionSheet(id: number): Promise<void> {
    await this.useCase.removeInspectionSheet(id);
  }

  setSheet(sheet: InspectionSheet): void {
    this.useCase.setSheet(sheet);
  }

  removeEquipment(index: number): void {
    this.useCase.removeEquipment(index);
  }

  updateEquipment(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void {
    this.useCase.updateEquipment(event, index);
  }

  swapEquipment(srcIndex: number, dstIndex: number): void {
    this.useCase.swapEquipment(srcIndex, dstIndex);
  }

  addInspectionItem(index: number, item: InspectionItem): void {
    this.useCase.addInspectionItem(index, item);
  }

  removeInspectionItem(equipmentIndex: number, itemIndex: number): void {
    this.useCase.removeInspectionItem(equipmentIndex, itemIndex);
  }

  updateInspectionItem(
    equipmentIndex: number,
    itemIndex: number,
    item: InspectionItem
  ): void {
    this.useCase.updateInspectionItem(equipmentIndex, itemIndex, item);
  }

  swapInspectionItem(
    equipmentIndex: number,
    srcIndex: number,
    dstIndex: number
  ) {
    this.useCase.swapInspectionItem(equipmentIndex, srcIndex, dstIndex);
  }
}
